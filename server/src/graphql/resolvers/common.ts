import { Types } from "mongoose";

import { Course } from "../../interfaces/Course";
import CourseModel from "../../models/course";
import { dateToString } from "../../utils/date";

export const getCourses = async (cids: Types.ObjectId[]) => {
    try {
        const courses = await CourseModel.find({ _id: { $in: cids } });
        return courses.map(transformCourse);
    } catch (error) {
        throw error;
    }
};

export const getCourse = async (cid: Types.ObjectId) => {
    try {
        const course = await CourseModel.findById(cid);

        if (!course) {
            throw new Error("Course not found");
        }

        return transformCourse(course);
    } catch (error) {
        throw error;
    }
};

export const transformCourse = async (course: Course): Promise<any> => {
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
