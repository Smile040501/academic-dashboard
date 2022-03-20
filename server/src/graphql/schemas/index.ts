import { buildSchema } from "graphql";

export default buildSchema(`
    enum CourseType {
        COMMON
        PM
        PME
        HSE
        SME
        PMT
        OE
        PROJECT
    }

    enum SemesterName {
        FALL
        SPRING
        SUMMER
    }

    type Course {
        _id: ID!
        name: String!
        code: String!
        credits: [Int]!
        description: String
        prerequisites: [Course]
        corequisites: [Course]
        ctype: CourseType!
        syllabus: String!
        createdAt: String!
        updatedAt: String!
    }

    input RecommendationInput {
        email: String!
        semesterName: SemesterName!
        year: Int!
    }

    type RootQuery {
        showRecommendedCourses(inp: RecommendationInput): [Course!]!
    }

    schema {
        query: RootQuery
    }
`);
