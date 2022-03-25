import { Course } from "../../interfaces/Course";
import CourseModel from "../../models/course";

const addCourse = async (args: { courseInput: Course }, _: Request) => {
    // TODO: Add this course to course master as well
    try {
        const {
            name,
            code,
            credits,
            description,
            prerequisites,
            corequisites,
            ctype,
            syllabus,
        } = args.courseInput;

        const course = new CourseModel({
            name,
            code,
            credits,
            description,
            prerequisites,
            corequisites,
            ctype,
            syllabus,
        });

        const createdCourse = await course.save();

        return {
            ...createdCourse._doc,
            _id: createdCourse._id.toString(),
            createdAt: createdCourse.createdAt.toISOString(),
            updatedAt: createdCourse.updatedAt.toISOString(),
        };
    } catch (error) {
        throw error;
    }
};

export default { addCourse };
