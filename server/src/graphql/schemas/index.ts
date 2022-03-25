import { buildSchema } from "graphql";

import enums from "./enums";
import types from "./types";
import inputTypes from "./inputTypes";

export default buildSchema(`
    ${enums}
    ${types}
    ${inputTypes}

    type RootQuery {
        showEligibleCourses(inp: RecommendationInput): [Course!]!
        # showAvailableCourses(inp)
    }

    type RootMutation {
        addCourse(courseInput: CourseInput): Course!
        addCurriculum(curriculumInput: CurriculumInput): Curriculum!
        addSemester(semesterInput: SemesterInput): Semester!
        addStudent(studentInput: StudentInput): Student!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
