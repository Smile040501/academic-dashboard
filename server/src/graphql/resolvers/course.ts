import { transformCourse } from "./common";
import { Course } from "../../interfaces/Course";
import CourseModel from "../../models/course";

const addCourse = async (args: { courseInput: Course }, _: Request) => {
    // TODO: Add this course to course master as well
    try {
        const course = new CourseModel(args.courseInput);

        const createdCourse = await course.save();

        return transformCourse(createdCourse);
    } catch (error) {
        throw error;
    }
};

export default { addCourse };
