import mongoose from "mongoose";

import { transformCurriculum } from "./common";
import { Curriculum } from "../../interfaces/Curriculum";
import CurriculumModel from "../../models/curriculum";
import { findCourseByCode } from "./course";

const createCurriculum = async (
    curriculumInput: Curriculum<string>,
    session: any
) => {
    try {
        // Extracting out the pm,pme,oe,pmt,hse and smeIDs from the course-code
        const pm = curriculumInput.pm;
        const pmIds = [];
        for (let code in pm) {
            const course = await findCourseByCode(code);
            if (!course) {
                throw new Error(`Course with course-code ${code} not found`);
            }
            pmIds.push(course._id);
        }

        const pme = curriculumInput.pme;
        const pmeIds = [];
        for (let code in pme) {
            const course = await findCourseByCode(code);
            if (!course) {
                throw new Error(`Course with course-code ${code} not found`);
            }
            pmeIds.push(course._id);
        }

        const hse = curriculumInput.hse;
        const hseIds = [];
        for (let code in hse) {
            const course = await findCourseByCode(code);
            if (!course) {
                throw new Error(`Course with course-code ${code} not found`);
            }
            hseIds.push(course._id);
        }

        const sme = curriculumInput.sme;
        const smeIds = [];
        for (let code in sme) {
            const course = await findCourseByCode(code);
            if (!course) {
                throw new Error(`Course with course-code ${code} not found`);
            }
            smeIds.push(course._id);
        }

        const pmt = curriculumInput.pmt;
        const pmtIds = [];
        for (let code in pmt) {
            const course = await findCourseByCode(code);
            if (!course) {
                throw new Error(`Course with course-code ${code} not found`);
            }
            pmtIds.push(course._id);
        }

        const oe = curriculumInput.oe;
        const oeIds = [];
        for (let code in oe) {
            const course = await findCourseByCode(code);
            if (!course) {
                throw new Error(`Course with course-code ${code} not found`);
            }
            oeIds.push(course._id);
        }

        // Creating a new curriculum
        const newCurriculum = new CurriculumModel({
            ...curriculumInput,
            department: curriculumInput.department.toUpperCase(),
            pm: pmIds,
            pme: pmeIds,
            oe: oeIds,
            hse: hseIds,
            pmt: pmtIds,
            sme: smeIds,
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

export default { addCurriculum };
