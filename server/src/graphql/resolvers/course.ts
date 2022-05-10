import mongoose, { Types } from "mongoose";

import { transformCourse, transformEligibleCourses } from "./common";
import { Course, EligibleCourses } from "../../interfaces/Course";
import { Curriculum } from "./../../interfaces/Curriculum";
import { StudentCourse } from "../../interfaces/Student";
import { CourseModel, StudentModel } from "../../models";
import { isSubset } from "../../utils/helper";
import { HttpError } from "../../interfaces/HttpError";
import { httpStatusNames, httpStatusTypes } from "../../utils/httpStatus";

export const findCourseByCode = async (code: string) => {
    try {
        const course = await CourseModel.findOne({ code: code.toUpperCase() });
        return course;
    } catch (error) {
        throw error;
    }
};

export const getCourses = async (coursesCodes: string[]) => {
    try {
        const courses = [];
        for (let code in coursesCodes) {
            const course = await findCourseByCode(code);
            if (!course) {
                const nf = httpStatusTypes[httpStatusNames.NOT_FOUND];
                const error = new HttpError(nf.message, nf.status);
                throw error;
            }
            courses.push(course);
        }
        return courses;
    } catch (error) {
        throw error;
    }
};

export const isCompleteGrade = (grade: string) => {
    return ["A", "B", "C", "D", "E", "U"].includes(grade.toUpperCase());
};

export const isPassGrade = (grade: string) => {
    return ["A", "B", "C", "D", "E"].includes(grade.toUpperCase());
};

export const getPendingCourses = (
    completedCourses: Types.ObjectId[],
    allCourses: Types.ObjectId[]
) => {
    return allCourses.filter((courseId) => {
        return !completedCourses.some(
            (cid) => cid.toString() === courseId.toString()
        );
    });
};

export const isEligibleCourse = (
    course: Course<Types.ObjectId>,
    completedCourses: Types.ObjectId[]
) => {
    // NOTE: Currently assuming that a course and its co-requisites will have the same pre-requisites and co-requisites
    return isSubset<Types.ObjectId>(course.prerequisites, completedCourses);
};

export const getEligibleCourses = async (
    completedCourses: Types.ObjectId[],
    allCourses: Types.ObjectId[]
) => {
    try {
        const courses = [];
        for (let courseId of allCourses) {
            const course = await CourseModel.findById(courseId);
            if (!course) {
                const nf = httpStatusTypes[httpStatusNames.NOT_FOUND];
                const error = new HttpError(nf.message, nf.status);
                throw error;
            }
            const isEligible = isEligibleCourse(course, completedCourses);
            if (isEligible) {
                courses.push(course);
            }
        }
        return courses;
    } catch (error) {
        throw error;
    }
};

export const createCourse = async (
    courseInput: Course<string>,
    session: any
) => {
    try {
        // Checking if course with this course-code already exists
        const existingCourse = await findCourseByCode(courseInput.code);
        if (existingCourse) {
            const conflict = httpStatusTypes[httpStatusNames.CONFLICT];
            const error = new HttpError(conflict.message, conflict.status);
            throw error;
        }

        // Extracting out the pre-requisites and co-requisites IDs from the course-code
        const prereqsCourses = await getCourses(courseInput.prerequisites);
        const coreqsCourses = await getCourses(courseInput.corequisites);

        const prereqsIds = prereqsCourses.map((course) => course._id);
        const coreqsIds = coreqsCourses.map((course) => course._id);

        // Creating a new course
        const newCourse = new CourseModel({
            ...courseInput,
            prerequisites: prereqsIds,
            corequisites: coreqsIds,
        });

        const createdCourse = await newCourse.save({ session });

        return createdCourse;
    } catch (error) {
        throw error;
    }
};

export const updateCourse = async (
    courseInput: Course<string>,
    session: any
) => {
    try {
        // Getting the course with this course-code
        const existingCourse = await findCourseByCode(courseInput.code);
        if (!existingCourse) {
            const nf = httpStatusTypes[httpStatusNames.NOT_FOUND];
            const error = new HttpError(nf.message, nf.status);
            throw error;
        }

        // Extracting out the pre-requisites and corequisites IDs from the course-code
        const prereqsCourses = await getCourses(courseInput.prerequisites);
        const coreqsCourses = await getCourses(courseInput.corequisites);

        const prereqsIds = prereqsCourses.map((course) => course._id);
        const coreqsIds = coreqsCourses.map((course) => course._id);

        // Updating the course
        existingCourse.name = courseInput.name;
        existingCourse.code = courseInput.code;
        existingCourse.credits = courseInput.credits;
        existingCourse.prerequisites = prereqsIds;
        existingCourse.corequisites = coreqsIds;
        existingCourse.description = courseInput.description || "";
        existingCourse.ctype = courseInput.ctype;
        existingCourse.syllabus = courseInput.syllabus;

        const updatedCourse = await existingCourse.save({ session });

        return updatedCourse;
    } catch (error) {
        throw error;
    }
};

export const deleteCourse = async (code: string, session: any) => {
    try {
        // Getting the course with this course-code
        const existingCourse = await findCourseByCode(code);
        if (!existingCourse) {
            const nf = httpStatusTypes[httpStatusNames.NOT_FOUND];
            const error = new HttpError(nf.message, nf.status);
            throw error;
        }

        // Deleting the course
        await CourseModel.deleteOne({ _id: existingCourse._id }, { session });

        return existingCourse;
    } catch (error) {
        throw error;
    }
};

const getCourse = async (args: { code: string }, _: Request) => {
    try {
        const course = await findCourseByCode(args.code);
        if (!course) {
            const nf = httpStatusTypes[httpStatusNames.NOT_FOUND];
            const error = new HttpError(nf.message, nf.status);
            throw error;
        }
        return transformCourse(course);
    } catch (error) {
        throw error;
    }
};

const showAllEligibleCourses = async (args: { email: string }, _: Request) => {
    try {
        const { email } = args;

        const student = await StudentModel.findOne({ email })
            .populate<{
                courses: StudentCourse<
                    Course<Types.ObjectId>,
                    Types.ObjectId
                >[];
            }>("courses.course")
            .populate<{ curriculum: Curriculum<Types.ObjectId> }>("curriculum");

        if (!student) {
            const nf = httpStatusTypes[httpStatusNames.NOT_FOUND];
            const error = new HttpError(nf.message, nf.status);
            throw error;
        }

        const scurriculum = student.curriculum;

        // Get the completed courses of the student
        let completedPMCredits = 0;
        let completedPMECredits = 0;
        let completedHSECredits = 0;
        let completedSMECredits = 0;
        let completedPMTCredits = 0;
        let completedOECredits = 0;
        const completedPMCourses: Types.ObjectId[] = [];
        const completedPMECourses: Types.ObjectId[] = [];
        const completedHSECourses: Types.ObjectId[] = [];
        const completedSMECourses: Types.ObjectId[] = [];
        const completedPMTCourses: Types.ObjectId[] = [];
        const completedOECourses: Types.ObjectId[] = [];
        const completedCourses: Types.ObjectId[] = [];

        for (let scourse of student.courses) {
            const course = scourse.course;
            if (isCompleteGrade(scourse.grade)) {
                completedCourses.push(course.id);
                switch (course.ctype) {
                    case "PM": {
                        completedPMCourses.push(course.id);
                        if (isPassGrade(scourse.grade)) {
                            completedPMCredits += course.credits.slice(-1)[0];
                        }
                        break;
                    }
                    case "PME": {
                        completedPMECourses.push(course.id);
                        if (isPassGrade(scourse.grade)) {
                            completedPMECredits += course.credits.slice(-1)[0];
                        }
                        break;
                    }
                    case "HSE": {
                        completedHSECourses.push(course.id);
                        if (isPassGrade(scourse.grade)) {
                            completedHSECredits += course.credits.slice(-1)[0];
                        }
                        break;
                    }
                    case "SME": {
                        completedSMECourses.push(course.id);
                        if (isPassGrade(scourse.grade)) {
                            completedSMECredits += course.credits.slice(-1)[0];
                        }
                        break;
                    }
                    case "PMT": {
                        completedPMTCourses.push(course.id);
                        if (isPassGrade(scourse.grade)) {
                            completedPMTCredits += course.credits.slice(-1)[0];
                        }
                        break;
                    }
                    case "OE": {
                        completedOECourses.push(course.id);
                        if (isPassGrade(scourse.grade)) {
                            completedOECredits += course.credits.slice(-1)[0];
                        }
                        break;
                    }
                    default:
                        break;
                }
            }
        }

        // Total credits completed
        const completedCredits =
            completedPMCredits +
            completedPMECredits +
            completedHSECredits +
            completedSMECredits +
            completedPMTCredits +
            completedOECredits;

        // Get the pending courses of the student
        const pendingPMCourses = getPendingCourses(
            completedPMCourses,
            scurriculum.pm.courses
        );
        const pendingPMECourses = getPendingCourses(
            completedPMECourses,
            scurriculum.pme.courses
        );
        const pendingHSECourses = getPendingCourses(
            completedHSECourses,
            scurriculum.hse.courses
        );
        const pendingSMECourses = getPendingCourses(
            completedSMECourses,
            scurriculum.sme.courses
        );
        const pendingPMTCourses = getPendingCourses(
            completedPMTCourses,
            scurriculum.pmt.courses
        );
        const pendingOECourses = getPendingCourses(
            completedOECourses,
            scurriculum.oe.courses
        );

        // Get the eligible courses of the student
        // TODO: Have it filtered based on a particular semester
        const eligiblePMCourses = await getEligibleCourses(
            completedCourses,
            pendingPMCourses
        );
        const eligiblePMECourses = await getEligibleCourses(
            completedCourses,
            pendingPMECourses
        );
        const eligibleHSECourses = await getEligibleCourses(
            completedCourses,
            pendingHSECourses
        );
        const eligibleSMECourses = await getEligibleCourses(
            completedCourses,
            pendingSMECourses
        );
        const eligiblePMTCourses = await getEligibleCourses(
            completedCourses,
            pendingPMTCourses
        );
        const eligibleOECourses = await getEligibleCourses(
            completedCourses,
            pendingOECourses
        );

        const eligibleCourses: EligibleCourses = {
            totalCredits: scurriculum.totalCredits,
            completedCredits,
            pm: {
                requiredCredits: scurriculum.pm.requiredCredits,
                completedCredits: completedPMCredits,
                completedCourses: completedPMCourses,
                pendingCourses: pendingPMCourses,
                eligibleCourses: eligiblePMCourses.map((c) => c.id),
            },
            pme: {
                requiredCredits: scurriculum.pme.requiredCredits,
                completedCredits: completedPMECredits,
                completedCourses: completedPMECourses,
                pendingCourses: pendingPMECourses,
                eligibleCourses: eligiblePMECourses.map((c) => c.id),
            },
            hse: {
                requiredCredits: scurriculum.hse.requiredCredits,
                completedCredits: completedHSECredits,
                completedCourses: completedHSECourses,
                pendingCourses: pendingHSECourses,
                eligibleCourses: eligibleHSECourses.map((c) => c.id),
            },
            sme: {
                requiredCredits: scurriculum.sme.requiredCredits,
                completedCredits: completedSMECredits,
                completedCourses: completedSMECourses,
                pendingCourses: pendingSMECourses,
                eligibleCourses: eligibleSMECourses.map((c) => c.id),
            },
            pmt: {
                requiredCredits: scurriculum.pmt.requiredCredits,
                completedCredits: completedPMTCredits,
                completedCourses: completedPMTCourses,
                pendingCourses: pendingPMTCourses,
                eligibleCourses: eligiblePMTCourses.map((c) => c.id),
            },
            oe: {
                requiredCredits: scurriculum.oe.requiredCredits,
                completedCredits: completedOECredits,
                completedCourses: completedOECourses,
                pendingCourses: pendingOECourses,
                eligibleCourses: eligibleOECourses.map((c) => c.id),
            },
        };

        return transformEligibleCourses(eligibleCourses);
    } catch (error) {
        throw error;
    }
};

const addCourse = async (args: { courseInput: Course<string> }, _: Request) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const createdCourse = await createCourse(args.courseInput, session);
        await session.commitTransaction();

        return transformCourse(createdCourse);
    } catch (error) {
        throw error;
    }
};

// It first initially adds all the courses and then update each course with their pre-requisites
const addCourses = async (
    args: { coursesInput: Course<string>[] },
    _: Request
) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const { coursesInput } = args;
        const createdCourses = [];
        const codeToCourseId: { [prop: string]: Types.ObjectId } = {};

        // Creating all the courses with initial empty pre-requisites and corequisites
        for (let course of coursesInput) {
            const createdCourse = await createCourse(
                {
                    ...course,
                    prerequisites: [],
                    corequisites: [],
                },
                session
            );
            createdCourses.push(createdCourse);
            codeToCourseId[course.code] = createdCourse._id;
        }

        // Updating the pre-requisites and corequisites of each course
        for (let i = 0; i < coursesInput.length; ++i) {
            const course = coursesInput[i];
            const createdCourse = createdCourses[i];
            const prereqsIds = course.prerequisites.map(
                (code) => codeToCourseId[`${code}`]
            );
            const coreqsIds = course.corequisites.map(
                (code) => codeToCourseId[`${code}`]
            );
            createdCourse.prerequisites = prereqsIds;
            createdCourse.corequisites = coreqsIds;
            await createdCourse.save({ session });
        }

        await session.commitTransaction();

        return createdCourses.map(transformCourse);
    } catch (error) {
        throw error;
    }
};

const updateCourses = async (
    args: { coursesInput: Course<string>[] },
    _: Request
) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const { coursesInput } = args;
        const updatedCourses = [];

        // Updating all the courses
        for (let course of coursesInput) {
            const updatedCourse = await updateCourse(course, session);
            updatedCourses.push(updatedCourse);
        }

        await session.commitTransaction();

        return updatedCourses.map(transformCourse);
    } catch (error) {
        throw error;
    }
};

const addOrUpdateCourses = async (
    args: { coursesInput: Course<string>[] },
    _: Request
) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const { coursesInput } = args;
        const coursesToAdd = [];
        const coursesToUpdate = [];

        // Filtering the courses to add and update
        for (let course of coursesInput) {
            const existingCourse = await findCourseByCode(course.code);
            if (existingCourse) {
                coursesToUpdate.push(course);
            } else {
                coursesToAdd.push(course);
            }
        }

        const createdCourses = [];
        const codeToCourseId: { [prop: string]: Types.ObjectId } = {};

        // Creating all the courses with initial empty pre-requisites and corequisites
        for (let course of coursesToAdd) {
            const createdCourse = await createCourse(
                {
                    ...course,
                    prerequisites: [],
                    corequisites: [],
                },
                session
            );
            createdCourses.push(createdCourse);
            codeToCourseId[course.code] = createdCourse._id;
        }

        // Updating the pre-requisites and corequisites of each created course
        for (let i = 0; i < coursesToAdd.length; ++i) {
            const course = coursesToAdd[i];
            const createdCourse = createdCourses[i];
            const prereqsIds = course.prerequisites.map(
                (code) => codeToCourseId[`${code}`]
            );
            const coreqsIds = course.corequisites.map(
                (code) => codeToCourseId[`${code}`]
            );
            createdCourse.prerequisites = prereqsIds;
            createdCourse.corequisites = coreqsIds;
            await createdCourse.save({ session });
        }

        const updatedCourses = [];

        // Updating all the courses to be updated
        for (let course of coursesToUpdate) {
            const updatedCourse = await updateCourse(course, session);
            updatedCourses.push(updatedCourse);
        }

        await session.commitTransaction();

        return createdCourses.concat(updatedCourses).map(transformCourse);
    } catch (error) {
        throw error;
    }
};

const deleteCourses = async (args: { codes: string[] }, _: Request) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const { codes } = args;
        const deletedCourses = [];

        // Deleting all the courses
        for (let code of codes) {
            const deletedCourse = await deleteCourse(code, session);
            deletedCourses.push(deletedCourse);
        }

        await session.commitTransaction();

        return deletedCourses.map(transformCourse);
    } catch (error) {
        throw error;
    }
};

export default {
    getCourse,
    showAllEligibleCourses,
    addCourse,
    addCourses,
    updateCourses,
    addOrUpdateCourses,
    deleteCourses,
};
