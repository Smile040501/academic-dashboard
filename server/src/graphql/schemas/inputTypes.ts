const inputTypes = `
    input CourseInput {
        name: String!
        code: String!
        credits: [Int!]!
        description: String
        prerequisites: [String!]!   # Course-code
        corequisites: [String!]!    # Course-code
        ctype: String!
        syllabus: String!
    }

    input CurriculumInput {
        department: String!
        pm: [String!]!      # Course-code
        pme: [String!]!
        hse: [String!]!
        sme: [String!]!
        pmt: [String!]!
        oe: [String!]!
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
        course: String!     # Course-code
        grade: String
        semester: ID!
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
