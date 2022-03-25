const inputTypes = `
    input CourseInput {
        name: String!
        code: String!
        credits: [Int!]!
        description: String
        prerequisites: [ID!]!
        corequisites: [ID!]!
        ctype: String!
        syllabus: String!
    }

    input CourseMasterInput {
        courses: [ID!]!
    }

    input CurriculumInput {
        department: String!
        pm: [ID!]!
        pme: [ID!]!
        hse: [ID!]!
        sme: [ID!]!
        pmt: [ID!]!
        oe: [ID!]!
    }

    input SemesterCourseInput {
        course: ID!
        slots: [String!]!
        faculty: String!
    }

    input SemesterInput {
        semesterType: String!
        year: Int!
        coursesOffered: [SemesterCourseInput!]!
    }

    input StudentCourseInput {
        course: ID!
        completed: Boolean!
        semester: String!
    }

    input StudentInput {
        name: String!
        email: String!
        joiningYear: Int!
        department: String!
        courses: [StudentCourseInput!]!
    }

    input RecommendationInput {
        email: String!
        semesterType: String!
        year: Int!
    }
`;

export default inputTypes;
