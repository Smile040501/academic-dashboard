import mongoose, { Types } from "mongoose";

import { transformCourse } from "./common";
import { Course } from "../../interfaces/Course";
import CourseModel from "../../models/course";

const findCourseByCode = async (code: string) => {
    try {
        const course = await CourseModel.findOne({ code: code.toUpperCase() });
        return course;
    } catch (error) {
        throw error;
    }
};

const createCourse = async (courseInput: Course<String>, session: any) => {
    try {
        // Checking if course with this course-code already exists
        const existingCourse = await findCourseByCode(courseInput.code);
        if (existingCourse) {
            throw new Error(
                `Course with course-code ${courseInput.code} already exists`
            );
        }

        // Extracting out the pre-requisites and corequisites IDs from the course-code
        const prereqs = courseInput.prerequisites;
        const prereqsIds = [];
        for (let code in prereqs) {
            const course = await findCourseByCode(code);
            if (!course) {
                throw new Error(`Course with course-code ${code} not found`);
            }
            prereqsIds.push(course._id);
        }

        const coreqs = courseInput.corequisites;
        const coreqsIds = [];
        for (let code in coreqs) {
            const course = await findCourseByCode(code);
            if (!course) {
                throw new Error(`Course with course-code ${code} not found`);
            }
            coreqsIds.push(course._id);
        }

        // Creating a new course
        const newCourse = new CourseModel({
            ...courseInput,
            code: courseInput.code.toUpperCase(),
            prerequisites: prereqsIds,
            corequisites: coreqsIds,
        });

        const createdCourse = await newCourse.save({ session });

        return createdCourse;
    } catch (error) {
        throw error;
    }
};

const addCourse = async (args: { courseInput: Course<String> }, _: Request) => {
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
    args: { coursesInput: Course<String>[] },
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

export default { addCourse, addCourses };
