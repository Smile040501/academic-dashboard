import { Types } from "mongoose";

import { CourseModel, SemesterModel, CurriculumModel } from "../../models";
import {
    Course,
    EligibleCourseEntry,
    EligibleCourses,
} from "../../interfaces/Course";
import { Curriculum } from "../../interfaces/Curriculum";
import { Semester } from "./../../interfaces/Semester";
import { Student } from "../../interfaces/Student";
import { HttpError } from "../../interfaces/HttpError";
import { dateToString } from "../../utils/date";
import { httpStatusNames, httpStatusTypes } from "../../utils/httpStatus";

export const getCourses = async (cids: Types.ObjectId[]): Promise<any> => {
    try {
        const courses = await CourseModel.find({ _id: { $in: cids } });
        return courses.map(transformCourse);
    } catch (error) {
        throw error;
    }
};

export const getSemester = async (sid: Types.ObjectId): Promise<any> => {
    try {
        const semester = await SemesterModel.findById(sid);
        if (!semester) {
            const nf = httpStatusTypes[httpStatusNames.NOT_FOUND];
            const error = new HttpError(nf.message, nf.status);
            throw error;
        }
        return transformSemester(semester);
    } catch (error) {
        throw error;
    }
};

export const getCourse = async (cid: Types.ObjectId): Promise<any> => {
    try {
        const course = await CourseModel.findById(cid);
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

export const getCurriculum = async (cid: Types.ObjectId): Promise<any> => {
    try {
        const curriculum = await CurriculumModel.findById(cid);
        if (!curriculum) {
            const nf = httpStatusTypes[httpStatusNames.NOT_FOUND];
            const error = new HttpError(nf.message, nf.status);
            throw error;
        }
        return transformCurriculum(curriculum);
    } catch (error) {
        throw error;
    }
};

export const transformCourse = (course: Course<Types.ObjectId>) => {
    try {
        return {
            ...course._doc,
            prerequisites: getCourses.bind(this, course.prerequisites),
            corequisites: getCourses.bind(this, course.corequisites),
            createdAt: dateToString(course.createdAt),
            updatedAt: dateToString(course.updatedAt),
        };
    } catch (error) {
        throw error;
    }
};

export const transformEligibleCourseEntry = (
    courseEntry: EligibleCourseEntry
) => {
    try {
        return {
            ...courseEntry,
            completedCourses: getCourses.bind(
                this,
                courseEntry.completedCourses
            ),
            pendingCourses: getCourses.bind(this, courseEntry.pendingCourses),
            eligibleCourses: getCourses.bind(this, courseEntry.eligibleCourses),
        };
    } catch (error) {
        throw error;
    }
};

export const transformEligibleCourses = (courses: EligibleCourses) => {
    try {
        return {
            ...courses,
            pm: transformEligibleCourseEntry(courses.pm),
            pme: transformEligibleCourseEntry(courses.pme),
            hse: transformEligibleCourseEntry(courses.hse),
            sme: transformEligibleCourseEntry(courses.sme),
            pmt: transformEligibleCourseEntry(courses.pmt),
            oe: transformEligibleCourseEntry(courses.oe),
        };
    } catch (error) {
        throw error;
    }
};

export const transformCurriculum = (curriculum: Curriculum<Types.ObjectId>) => {
    try {
        return {
            ...curriculum._doc,
            pm: {
                ...curriculum.pm,
                courses: getCourses.bind(this, curriculum.pm.courses),
            },
            pme: {
                ...curriculum.pme,
                courses: getCourses.bind(this, curriculum.pme.courses),
            },
            hse: {
                ...curriculum.hse,
                courses: getCourses.bind(this, curriculum.hse.courses),
            },
            sme: {
                ...curriculum.sme,
                courses: getCourses.bind(this, curriculum.sme.courses),
            },
            pmt: {
                ...curriculum.pmt,
                courses: getCourses.bind(this, curriculum.pmt.courses),
            },
            oe: {
                ...curriculum.oe,
                courses: getCourses.bind(this, curriculum.oe.courses),
            },
            createdAt: dateToString(curriculum.createdAt),
            updatedAt: dateToString(curriculum.updatedAt),
        };
    } catch (error) {
        throw error;
    }
};

export const transformSemester = (semester: Semester<Types.ObjectId>) => {
    try {
        return {
            ...semester._doc,
            coursesOffered: semester.coursesOffered.map((crs) => ({
                ...crs,
                course: getCourse.bind(this, crs.course),
            })),
            createdAt: dateToString(semester.createdAt),
            updatedAt: dateToString(semester.updatedAt),
        };
    } catch (error) {
        throw error;
    }
};

export const transformStudent = (
    student: Student<Types.ObjectId, Types.ObjectId>
) => {
    try {
        return {
            ...student._doc,
            curriculum: getCurriculum.bind(this, student.curriculum),
            courses: student.courses.map((crs) => ({
                ...crs,
                course: getCourse.bind(this, crs.course),
                semester: getSemester.bind(this, crs.semester),
            })),
            createdAt: dateToString(student.createdAt),
            updatedAt: dateToString(student.updatedAt),
        };
    } catch (error) {
        throw error;
    }
};
