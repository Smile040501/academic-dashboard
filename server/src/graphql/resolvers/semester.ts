import mongoose from "mongoose";

import { transformSemester } from "./common";
import { Semester } from "../../interfaces/Semester";
import SemesterModel from "../../models/semester";
import { findCourseByCode } from "./course";

export const findSemester = async (args: {
    semesterType: string;
    year: number;
}) => {
    try {
        const semester = await SemesterModel.findOne({
            semesterType: args.semesterType.toUpperCase(),
            year: args.year,
        });
        return semester;
    } catch (error) {
        throw error;
    }
};

const createSemester = async (
    semesterInput: Semester<string>,
    session: any
) => {
    try {
        // Extracting out the courseID's from the course offered -code
        const sc = semesterInput.coursesOffered;
        const scIds = [];

        const upCoursesOffered = [];

        for (let i = 0; i < sc.length; ++i) {
            const course = await findCourseByCode(sc[i].course);

            if (!course) {
                throw new Error(
                    `Course with course-code ${sc[i].course} not found`
                );
            }

            upCoursesOffered.push({
                ...sc[i],
                course: course._id,
            });

            scIds.push(course._id);
        }

        // for (let item in sc) {
        //     const course = await findCourseByCode(`${item['course']}`);
        //     if (!course) {
        //         throw new Error(`Course with course-code ${code} not found`);
        //     }
        //     scIds.push(course._id);
        // }

        // Creating a new curriculum
        const newSemester = new SemesterModel({
            ...semesterInput,
            coursesOffered: upCoursesOffered,
        });

        const createdSemester = await newSemester.save({ session });

        return createdSemester;
    } catch (error) {
        throw error;
    }
};

const addSemester = async (
    args: { semesterInput: Semester<string> },
    _: Request
) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
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

export default { addSemester };
