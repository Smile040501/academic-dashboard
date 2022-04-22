import mongoose from "mongoose";

import { CurriculumModel } from "../../models";
import { Curriculum } from "../../interfaces/Curriculum";
import { transformCurriculum } from "./common";
import { getCourses } from "./course";

export const findCurriculum = async (args: {
    department: string;
    ctype: string;
}) => {
    try {
        const curriculum = await CurriculumModel.findOne({
            department: args.department.toUpperCase(),
            ctype: args.ctype,
        });
        return curriculum;
    } catch (error) {
        throw error;
    }
};

const createCurriculum = async (
    curriculumInput: Curriculum<string>,
    session: any
) => {
    try {
        // Extracting out the pm, pme, oe, pmt, hse and smeIDs from the course-code
        const pmCourses = await getCourses(curriculumInput.pm.courses);
        const pmIds = pmCourses.map((course) => course._id);

        const pmeCourses = await getCourses(curriculumInput.pme.courses);
        const pmeIds = pmeCourses.map((course) => course._id);

        const hseCourses = await getCourses(curriculumInput.hse.courses);
        const hseIds = hseCourses.map((course) => course._id);

        const smeCourses = await getCourses(curriculumInput.sme.courses);
        const smeIds = smeCourses.map((course) => course._id);

        const pmtCourses = await getCourses(curriculumInput.pmt.courses);
        const pmtIds = pmtCourses.map((course) => course._id);

        const oeCourses = await getCourses(curriculumInput.oe.courses);
        const oeIds = oeCourses.map((course) => course._id);

        // why this is not able to defined in newCurriculum
        const pmR = curriculumInput.pm.requiredCredits;
        const pmeR = curriculumInput.pme.requiredCredits;
        const hseR = curriculumInput.hse.requiredCredits;
        const smeR = curriculumInput.sme.requiredCredits;
        const pmtR = curriculumInput.pmt.requiredCredits;
        const oeR = curriculumInput.oe.requiredCredits;

        // Creating a new curriculum
        const newCurriculum = new CurriculumModel({
            ...curriculumInput,
            department: curriculumInput.department.toUpperCase(),
            pm: { pmR, pmIds },
            // pme:{ curriculumInput.pme.requiredCredits, pmeIds},
            pme: { pmeR, pmeIds },
            oe: { oeR, oeIds },
            hse: { hseR, hseIds },
            pmt: { pmtR, pmtIds },
            sme: { smeR, smeIds },
        });

        const createdCurriculum = await newCurriculum.save({ session });

        return createdCurriculum;
    } catch (error) {
        throw error;
    }
};

const addCurriculum = async (
    args: { curriculumInput: Curriculum<string> },
    _: Request
) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const createdCurriculum = await createCurriculum(
            args.curriculumInput,
            session
        );
        await session.commitTransaction();

        return transformCurriculum(createdCurriculum);
    } catch (error) {
        throw error;
    }
};

export const UpdateCurriculum = async (curriculumInput: Curriculum<string>) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const ctype = curriculumInput.ctype;
        const department = curriculumInput.department;
        const existingCurriculum = await findCurriculum({
            ctype,
            department,
        });

        if (existingCurriculum) {
            const pmCourses = await getCourses(curriculumInput.pm.courses);
            const pmIds = pmCourses.map((course) => course._id);

            const pmeCourses = await getCourses(curriculumInput.pme.courses);
            const pmeIds = pmeCourses.map((course) => course._id);

            const hseCourses = await getCourses(curriculumInput.hse.courses);
            const hseIds = hseCourses.map((course) => course._id);

            const smeCourses = await getCourses(curriculumInput.sme.courses);
            const smeIds = smeCourses.map((course) => course._id);

            const pmtCourses = await getCourses(curriculumInput.pmt.courses);
            const pmtIds = pmtCourses.map((course) => course._id);

            const oeCourses = await getCourses(curriculumInput.oe.courses);
            const oeIds = oeCourses.map((course) => course._id);

            // why this is not able to defined in newCurriculum
            const pmR = curriculumInput.pm.requiredCredits;
            const pmeR = curriculumInput.pme.requiredCredits;
            const hseR = curriculumInput.hse.requiredCredits;
            const smeR = curriculumInput.sme.requiredCredits;
            const pmtR = curriculumInput.pmt.requiredCredits;
            const oeR = curriculumInput.oe.requiredCredits;

            existingCurriculum.pm.requiredCredits = pmR;
            existingCurriculum.pm.courses = pmIds;

            existingCurriculum.pme.requiredCredits = pmeR;
            existingCurriculum.pme.courses = pmeIds;

            existingCurriculum.oe.requiredCredits = oeR;
            existingCurriculum.oe.courses = oeIds;

            existingCurriculum.hse.requiredCredits = hseR;
            existingCurriculum.hse.courses = hseIds;

            existingCurriculum.sme.requiredCredits = smeR;
            existingCurriculum.sme.courses = smeIds;

            existingCurriculum.pmt.requiredCredits = pmtR;
            existingCurriculum.pmt.courses = pmtIds;
            const updatedCurriculum = await existingCurriculum.save({
                session,
            });

            await session.commitTransaction();
            return transformCurriculum(updatedCurriculum);
        } else {
            throw new Error(
                `Curriculum with type ${ctype} and department ${department} not found`
            );
        }
    } catch (error) {
        throw error;
    }
};

export const deleteCurriculum = async (
    args: { curriculumInput: Curriculum<string> },
    _: Request
) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const { curriculumInput } = args;
        const ctype = curriculumInput.ctype;
        const department = curriculumInput.department;
        const existingCurriculum = await findCurriculum({
            ctype,
            department,
        });

        if (existingCurriculum) {
            await CurriculumModel.deleteOne(
                { _id: existingCurriculum._id },
                { session }
            );

            await session.commitTransaction();
            return existingCurriculum;
        } else {
            throw new Error(
                `Curriculum with type ${ctype} and department ${department} not found`
            );
        }
    } catch (error) {
        throw error;
    }
};
export default {
    findCurriculum,
    addCurriculum,
    UpdateCurriculum,
    deleteCurriculum,
};
