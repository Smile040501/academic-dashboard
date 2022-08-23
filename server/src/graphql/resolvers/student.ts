import mongoose from "mongoose";

import { StudentModel } from "../../models";
import { Student } from "../../interfaces/Student";
import { transformStudent } from "./common";
import { findCourseByCode } from "./course";
import { findSemester } from "./semester";
import { findCurriculum } from "./curriculum";
import { HttpError } from "../../interfaces/HttpError";
import { httpStatusNames, httpStatusTypes } from "../../utils/httpStatus";

export const findStudentByEmail = async (email: string) => {
    try {
        const student = await StudentModel.findOne({ email });
        return student;
    } catch (error) {
        throw error;
    }
};

export const getStudent = async (args: { email: string }, _: Request) => {
    try {
        const student = await findStudentByEmail(args.email.toString());

        if (!student) {
            const nf = httpStatusTypes[httpStatusNames.NOT_FOUND];
            const error = new HttpError(nf.message, nf.status);
            throw error;
        }

        return transformStudent(student);
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
                const nf = httpStatusTypes[httpStatusNames.NOT_FOUND];
                const error = new HttpError(nf.message, nf.status);
                throw error;
                // throw new Error(
                //     `Course with course-code ${sc[i].course} not found`
                // );
            }

            const semester = await findSemester(
                sc[i].semester.semesterType,
                sc[i].semester.year
            );
            if (!semester) {
                const nf = httpStatusTypes[httpStatusNames.NOT_FOUND];
                const error = new HttpError(nf.message, nf.status);
                throw error;
                // throw new Error(
                //     `Semester with semester-type ${sc[i].semester.semesterType} and semester-year ${sc[i].semester.year} not found`
                // );
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

        const ctype = studentInput.curriculum;
        const department = studentInput.department;

        const newCurriculum = await findCurriculum(department, ctype);

        if (newCurriculum) {
            newStudent.curriculum = newCurriculum._id;
        } else {
            const nf = httpStatusTypes[httpStatusNames.NOT_FOUND];
            const error = new HttpError(nf.message, nf.status);
            throw error;
            // throw new Error(
            //     `Curriculum with type ${ctype} and department ${department} not found`
            // );
        }

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
            const createdStudent = await createStudent(studentInput, session);
            createStudents.push(createdStudent);
        }
        await session.commitTransaction();

        return createStudents.map(transformStudent);
    } catch (error) {
        throw error;
    }
};

export const updateStudent = async (
    args: {
        studentInput: Student<string, { semesterType: string; year: number }>;
    },
    _: Request
) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const { studentInput } = args;

        const existingStudent = await findStudentByEmail(studentInput.email);
        if (!existingStudent) {
            const nf = httpStatusTypes[httpStatusNames.NOT_FOUND];
            const error = new HttpError(nf.message, nf.status);
            throw error;
            // throw new Error(
            //     `Student with Student-email ${studentInput.email} doesn't exists`
            // );
        }

        existingStudent.name = studentInput.name;
        existingStudent.joiningYear = studentInput.joiningYear;
        existingStudent.department = studentInput.department;

        const ctype = studentInput.curriculum;
        const department = studentInput.department;

        const newCurriculum = await findCurriculum(department, ctype);

        if (!newCurriculum) {
            const nf = httpStatusTypes[httpStatusNames.NOT_FOUND];
            const error = new HttpError(nf.message, nf.status);
            throw error;
            // throw new Error(
            //     `Curriculum with type ${ctype} and department ${department} not found`
            // );
        }

        existingStudent.curriculum = newCurriculum._id;

        // Extracting out the courseID's from the student courses

        const sc = studentInput.courses;
        const upStudentCourses = [];

        for (let i = 0; i < sc.length; ++i) {
            const course = await findCourseByCode(sc[i].course);
            if (!course) {
                const nf = httpStatusTypes[httpStatusNames.NOT_FOUND];
                const error = new HttpError(nf.message, nf.status);
                throw error;
                // throw new Error(
                //     `Course with course-code ${sc[i].course} not found`
                // );
            }

            const semester = await findSemester(
                sc[i].semester.semesterType,
                sc[i].semester.year
            );
            if (!semester) {
                const nf = httpStatusTypes[httpStatusNames.NOT_FOUND];
                const error = new HttpError(nf.message, nf.status);
                throw error;
                // throw new Error(
                //     `Semester with semester-type ${sc[i].semester.semesterType} and semester-year ${sc[i].semester.year} not found`
                // );
            }

            upStudentCourses.push({
                ...sc[i],
                course: course._id,
                semester: semester._id,
            });
        }

        existingStudent.courses = upStudentCourses;

        const updatedStudent = await existingStudent.save({ session });

        await session.commitTransaction();

        return transformStudent(updatedStudent);
    } catch (error) {
        throw error;
    }
};

export const deleteStudents = async (
    args: { studentIds: string[] },
    _: Request
) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const { studentIds } = args;
        const deletedStudents = [];

        // Deleting all the courses
        for (let email of studentIds) {
            const existingStudent = await findStudentByEmail(email);
            if (!existingStudent) {
                const nf = httpStatusTypes[httpStatusNames.NOT_FOUND];
                const error = new HttpError(nf.message, nf.status);
                throw error;
                // throw new Error(
                //     `Student with Student-email ${email} doesn't exists`
                // );
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
    getStudent,
    addStudent,
    addStudents,
    updateStudent,
    deleteStudents,
};
