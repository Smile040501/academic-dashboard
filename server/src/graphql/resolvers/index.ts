import authResolver from "./auth";
import courseResolver from "./course";
import curriculumResolver from "./curriculum";
import semesterResolver from "./semester";
import studentResolver from "./student";

export default {
    ...authResolver,
    ...courseResolver,
    ...curriculumResolver,
    ...semesterResolver,
    ...studentResolver,
};
