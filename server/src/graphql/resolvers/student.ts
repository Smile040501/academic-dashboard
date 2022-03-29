import mongoose from "mongoose";

import { Student } from "../../interfaces/Student";
import StudentModel from "../../models/student";
import { transformStudent } from "./common";
import { findCourseByCode } from "./course";
import { findSemester } from "./semester";

const createStudent = async (
    studentInput: Student<string, { semesterType: string; year: number }>,
    session: any
) => {
    try {
        // Extracting out the courseID's from the student courses
        const sc = studentInput.courses;
        const scIds = [];

        const upStudentCourses = [];

        for (let i = 0; i < sc.length; ++i) {
            const course = await findCourseByCode(sc[i].course);

            if (!course) {
                throw new Error(
                    `Course with course-code ${sc[i].course} not found`
                );
            }

            const semester = await findSemester(sc[i].semester);

            if (!semester) {
                throw new Error(
                    `Semester with semester-code ${sc[i].semester} not found`
                );
            }

            upStudentCourses.push({
                ...sc[i],
                course: course._id,
                semester: semester._id,
            });

            scIds.push(course._id);
        }

        const newStudent = new StudentModel({
            ...studentInput,
            courses: upStudentCourses,
        });

        const createdStudent = await newStudent.save({ session });

        return createdStudent;
    } catch (error) {
        throw error;
    }
};

const addStudent = async (
    args: {
        studentInput: Student<string, { semesterType: string; year: number }>;
    },
    _: Request
) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const createdStudent = await createStudent(args.studentInput, session);
        await session.commitTransaction();

        return transformStudent(createdStudent);
    } catch (error) {
        throw error;
    }
};

export default { addStudent };
