import mongoose from "mongoose";

import { CurriculumModel } from "../../models";
import { Curriculum } from "../../interfaces/Curriculum";
import { transformCurriculum } from "./common";
import { getCourses } from "./course";

export const findCurriculum = async (department: string, ctype: string) => {
    try {
        const curriculum = await CurriculumModel.findOne({
            department: department.toUpperCase(),
            ctype: ctype,
        });
        return curriculum;
    } catch (error) {
        throw error;
    }
};

const getCurriculum = async (
    args: {
        department: string;
        ctype: string;
    },
    _: Request
) => {
    try {
        const { department, ctype } = args;
        const curriculum = await findCurriculum(department, ctype);
        if (!curriculum) {
            throw new Error(
                `Curriculum with type ${ctype} and department ${department} not found`
            );
        }

        return transformCurriculum(curriculum);
    } catch (error) {
        throw error;
    }
};

const getCurriculums = async (_: {}, _2: Request) => {
    try {
        const curriculums = await CurriculumModel.find();

        return curriculums.map(transformCurriculum);
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

        // Creating a new curriculum
        const newCurriculum = new CurriculumModel({
            ...curriculumInput,
            department: curriculumInput.department.toUpperCase(),
            pm: {
                ...curriculumInput.pm,
                courses: pmIds,
            },
            // pme:{ curriculumInput.pme.requiredCredits, pmeIds},
            pme: {
                ...curriculumInput.pme,
                courses: pmeIds,
            },
            oe: {
                ...curriculumInput.oe,
                courses: oeIds,
            },
            hse: {
                ...curriculumInput.hse,
                courses: hseIds,
            },
            pmt: {
                ...curriculumInput.pmt,
                courses: pmtIds,
            },
            sme: {
                ...curriculumInput.sme,
                courses: smeIds,
            },
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

export const updateCurriculum = async (
    curriculumInput: Curriculum<string>,
    _: Request
) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const ctype = curriculumInput.ctype;
        const department = curriculumInput.department;
        const existingCurriculum = await findCurriculum(ctype, department);

        if (!existingCurriculum) {
            throw new Error(
                `Curriculum with type ${ctype} and department ${department} not found`
            );
        }

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

        existingCurriculum.totalCredits = curriculumInput.totalCredits;

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

        const updatedCurriculum = await existingCurriculum.save({ session });

        await session.commitTransaction();

        return transformCurriculum(updatedCurriculum);
    } catch (error) {
        throw error;
    }
};

export const deleteCurriculum = async (
    args: {
        department: string;
        ctype: string;
    },
    _: Request
) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const ctype = args.ctype;
        const department = args.department;
        const existingCurriculum = await findCurriculum(ctype, department);

        if (!existingCurriculum) {
            throw new Error(
                `Curriculum with type ${ctype} and department ${department} not found`
            );
        }

        await CurriculumModel.deleteOne(
            { _id: existingCurriculum._id },
            { session }
        );

        await session.commitTransaction();
        return existingCurriculum;
    } catch (error) {
        throw error;
    }
};
export default {
    getCurriculum,
    getCurriculums,
    addCurriculum,
    updateCurriculum,
    deleteCurriculum,
};
