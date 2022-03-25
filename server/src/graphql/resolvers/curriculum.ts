import { Curriculum } from "../../interfaces/Curriculum";
import CurriculumModel from "../../models/curriculum";

const addCurriculum = async (
    args: { curriculumInput: Curriculum },
    _: Request
) => {
    try {
        const { department, pm, pme, hse, sme, pmt, oe } = args.curriculumInput;

        // TODO: Input validation

        const curriculum = new CurriculumModel({
            department,
            pm,
            pme,
            hse,
            sme,
            pmt,
            oe,
        });
        const createdCurriculum = await curriculum.save();

        return createdCurriculum;
    } catch (error) {
        throw error;
    }
};

export default { addCurriculum };
