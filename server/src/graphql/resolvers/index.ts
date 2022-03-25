import courseResolver from "./course";
import curriculumResolver from "./curriculum";
import studentResolver from "./student";

export default {
    ...courseResolver,
    ...curriculumResolver,
    ...studentResolver,
};
