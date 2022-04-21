import mongoose from "mongoose";

import { StudentModel } from "../../models";
import { Student } from "../../interfaces/Student";
import { transformStudent } from "./common";
import { findCourseByCode } from "./course";
import { findSemester } from "./semester";
import curriculum from "./curriculum";

export const findStudentByEmail = async (email: string) => {
    try {
        const Student = await StudentModel.findOne({
            email: email.toUpperCase(),
        });
        return Student;
    } catch (error) {
        throw error;
    }
};

export const createStudent = async (
    studentInput: Student<string, { semesterType: string; year: number }>,
    session: any
) => {
    try {
        // Extracting out the courseID's from the student courses
        const sc = studentInput.courses;
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
                    `Semester with semester-type ${sc[i].semester.semesterType} and semester-year ${sc[i].semester.year} not found`
                );
            }

            upStudentCourses.push({
                ...sc[i],
                course: course._id,
                semester: semester._id,
            });
        }

        const newStudent = new StudentModel({
            ...studentInput,
            department: studentInput.department.toUpperCase(),
            courses: upStudentCourses,
        });

        const createdStudent = await newStudent.save({ session });

        return createdStudent;
    } catch (error) {
        throw error;
    }
};

export const addStudent = async (
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

export const addStudents = async (
    args: {
        studentsInput: Student<
            string,
            { semesterType: string; year: number }
        >[];
    },
    _: Request
) => {
    try {
        const session = await mongoose.startSession();
        const createStudents = [];
        session.startTransaction();
        const { studentsInput } = args;
        for (let studentInput of studentsInput) {
            const createdStudent = addStudent({ studentInput }, _);
            createStudents.push(createdStudent);
        }
        await session.commitTransaction();

        return createStudents;
    } catch (error) {
        throw error;
    }
};

export const updateStudent = async (
    studentInput: Student<string, { semesterType: string; year: number }>,
    session: any
) => {
    try {
        const existingStudent = await findStudentByEmail(studentInput.email);
        if (!existingStudent) {
            throw new Error(
                `Student with Student-email ${studentInput.email} doesn't exists`
            );
        }

        existingStudent.name = studentInput.name;
        existingStudent.joiningYear = studentInput.joiningYear;
        existingStudent.department = studentInput.department;
        // NOTE: not handled the curriculum yet (in create student also)
        // existingStudent.curriculum = studentInput.curriculum;

        // Extracting out the courseID's from the student courses

        const sc = studentInput.courses;
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
                    `Semester with semester-type ${sc[i].semester.semesterType} and semester-year ${sc[i].semester.year} not found`
                );
            }

            upStudentCourses.push({
                ...sc[i],
                course: course._id,
                semester: semester._id,
            });
        }

        const newStudent = new StudentModel({
            ...existingStudent,
            department: studentInput.department.toUpperCase(),
            courses: upStudentCourses,
        });

        const updatedStudent = await newStudent.save({ session });

        return updatedStudent;
    } catch (error) {
        throw error;
    }
};

export const deleteStudents = async (
    args: { emails: string[] },
    _: Request
) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const { emails } = args;
        const deletedStudents = [];

        // Deleting all the courses
        for (let email of emails) {
            const existingStudent = await findStudentByEmail(email);
            if (!existingStudent) {
                throw new Error(
                    `Student with Student-email ${email} doesn't exists`
                );
            }

            await StudentModel.deleteOne(
                { _id: existingStudent._id },
                { session }
            );

            deletedStudents.push(existingStudent);
        }

        await session.commitTransaction();

        return deletedStudents.map(transformStudent);
    } catch (error) {
        throw error;
    }
};

export default {
    addStudent,
    addStudents,
    updateStudent,
    deleteStudents,
};
