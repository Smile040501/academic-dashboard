import mongoose from "mongoose";

import { CurriculumModel } from "../../models";
import { Curriculum } from "../../interfaces/Curriculum";
import { transformCurriculum } from "./common";
import { getCourses } from "./course";

const createCurriculum = async (
    curriculumInput: Curriculum<string>,
    session: any
) => {
    try {
        // Extracting out the pm, pme, oe, pmt, hse and smeIDs from the course-code
        const pmCourses = await getCourses(curriculumInput.pm);
        const pmIds = pmCourses.map((course) => course._id);

        const pmeCourses = await getCourses(curriculumInput.pme);
        const pmeIds = pmeCourses.map((course) => course._id);

        const hseCourses = await getCourses(curriculumInput.hse);
        const hseIds = hseCourses.map((course) => course._id);

        const smeCourses = await getCourses(curriculumInput.sme);
        const smeIds = smeCourses.map((course) => course._id);

        const pmtCourses = await getCourses(curriculumInput.pmt);
        const pmtIds = pmtCourses.map((course) => course._id);

        const oeCourses = await getCourses(curriculumInput.oe);
        const oeIds = oeCourses.map((course) => course._id);

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
