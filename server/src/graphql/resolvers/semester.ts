import mongoose from "mongoose";

import { SemesterModel } from "../../models";
import { Semester } from "../../interfaces/Semester";
import { transformSemester } from "./common";
import { findCourseByCode } from "./course";
import { HttpError } from "../../interfaces/HttpError";
import { httpStatusNames, httpStatusTypes } from "../../utils/httpStatus";

export const findSemester = async (semesterType: string, year: number) => {
    try {
        const semester = await SemesterModel.findOne({
            semesterType: semesterType.toUpperCase(),
            year,
        });
        return semester;
    } catch (error) {
        throw error;
    }
};

const getSemester = async (
    args: {
        semesterType: string;
        year: number;
    },
    _: Request
) => {
    try {
        const { semesterType, year } = args;
        const semester = await findSemester(semesterType, year);
        if (!semester) {
            const nf = httpStatusTypes[httpStatusNames.NOT_FOUND];
            const error = new HttpError(nf.message, nf.status);
            throw error;
            // throw new Error(
            //     `Semester with type ${semesterType} and year ${year} not found`
            // );
        }

        return transformSemester(semester);
    } catch (error) {
        throw error;
    }
};

export const createSemester = async (
    semesterInput: Semester<string>,
    session: any
) => {
    try {
        // Extracting out the courseID's from the course offered -code
        const sc = semesterInput.coursesOffered;
        const upCoursesOffered = [];

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

            upCoursesOffered.push({
                ...sc[i],
                course: course._id,
            });
        }

        // Creating a new semester
        const newSemester = new SemesterModel({
            ...semesterInput,
            semesterType: semesterInput.semesterType.toUpperCase(),
            coursesOffered: upCoursesOffered,
        });

        const createdSemester = await newSemester.save({ session });
        return createdSemester;
    } catch (error) {
        throw error;
    }
};

export const addSemester = async (
    args: { semesterInput: Semester<string> },
    _: Request
) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const { semesterInput } = args;
        const semesterType = semesterInput.semesterType;
        const year = semesterInput.year;

        const existingSemester = await findSemester(semesterType, year);

        if (existingSemester) {
            const conflict = httpStatusTypes[httpStatusNames.CONFLICT];
            const error = new HttpError(conflict.message, conflict.status);
            throw error;
        }

        const createdSemester = await createSemester(
            args.semesterInput,
            session
        );

        await session.commitTransaction();

        return transformSemester(createdSemester);
    } catch (error) {
        throw error;
    }
};

export const updateSemester = async (
    args: { semesterInput: Semester<string> },
    _: Request
) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const { semesterInput } = args;
        const semesterType = semesterInput.semesterType;
        const year = semesterInput.year;

        const existingSemester = await findSemester(semesterType, year);

        if (!existingSemester) {
            const nf = httpStatusTypes[httpStatusNames.NOT_FOUND];
            const error = new HttpError(nf.message, nf.status);
            throw error;
            // throw new Error(
            //     `Semester with type ${semesterType} and year ${year} not found`
            // );
        }

        const sc = semesterInput.coursesOffered;
        const upCoursesOffered = [];

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

            upCoursesOffered.push({
                ...sc[i],
                course: course._id,
            });
        }

        existingSemester.coursesOffered = upCoursesOffered;
        existingSemester.semesterType = semesterInput.semesterType;
        existingSemester.year = semesterInput.year;
        const updatedSemester = await existingSemester.save({ session });

        await session.commitTransaction();
        return transformSemester(updatedSemester);
    } catch (error) {
        throw error;
    }
};

export const deleteSemester = async (
    args: {
        semesterType: string;
        year: number;
    },
    _: Request
) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const semesterType = args.semesterType;
        const year = args.year;

        const existingSemester = await findSemester(semesterType, year);

        if (!existingSemester) {
            const nf = httpStatusTypes[httpStatusNames.NOT_FOUND];
            const error = new HttpError(nf.message, nf.status);
            throw error;
            // throw new Error(
            //     `Semester with type ${semesterType} and year ${year} not found`
            // );
        }

        await SemesterModel.deleteOne(
            { _id: existingSemester._id },
            { session }
        );

        await session.commitTransaction();
        return existingSemester;
    } catch (error) {
        throw error;
    }
};

export default { getSemester, addSemester, updateSemester, deleteSemester };
