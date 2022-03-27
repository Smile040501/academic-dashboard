import courseResolver from "./course";
import curriculumResolver from "./curriculum";
import semesterResolver from "./semester";
import studentResolver from "./student";

export default {
    ...courseResolver,
    ...curriculumResolver,
    ...semesterResolver,
    ...studentResolver,
};
