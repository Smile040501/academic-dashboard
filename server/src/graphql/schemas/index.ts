import { buildSchema } from "graphql";

import enums from "./enums";
import types from "./types";
import inputTypes from "./inputTypes";

export default buildSchema(`
    ${enums}
    ${types}
    ${inputTypes}

    type RootQuery {
        getCourse(code: String!): Course!
        showAllEligibleCourses(email: String): EligibleCourses!
        login(email: String!, tokenId: String!): LoginResponse!

        getCurriculum(department: String!, ctype: CurriculumType!): Curriculum!
    }

    type RootMutation {
        addCourse(courseInput: CourseInput): Course!
        addCourses(coursesInput: [CourseInput]): [Course!]!
        updateCourses(coursesInput: [CourseInput]): [Course!]!
        addOrUpdateCourses(coursesInput: [CourseInput]): [Course!]!
        deleteCourses(codes: [String]): [Course!]!

        addCurriculum(curriculumInput: CurriculumInput): Curriculum!
        addCurricula(curriculaInput: [CurriculumInput]): [Curriculum!]!
        updateCurricula(curriculaInput: [CurriculumInput]): [Curriculum!]!
        addOrUpdateCurricula(curriculaInput: [CurriculumInput]): [Curriculum!]!
        deleteCurricula(departments: [String]): [Curriculum!]!

        addSemester(semesterInput: SemesterInput): Semester!
        updateSemester(semesterInput: SemesterInput): Semester!
        deleteSemester(semesterType: String, year: Int): Semester!

        addStudent(studentInput: StudentInput): Student!
        addStudents(studentsInput: [StudentInput]): [Student!]!
        updateStudents(studentsInput: [StudentInput]): [Student!]!
        # updateStudentsGrades
        addOrUpdateStudents(studentsInput: [StudentInput]): [Student!]!
        deleteStudents(studentIds: [String]): [Student!]!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
