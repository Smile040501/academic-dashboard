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

    input CurriculumInputEntry {
        requiredCredits: Int!
        courses: [String!]!
    }

    input CurriculumInput {
        department: String!
        ctype: String!
        totalCredits: Int!
        pm: CurriculumInputEntry      # Course-code
        pme: CurriculumInputEntry
        hse: CurriculumInputEntry
        sme: CurriculumInputEntry
        pmt: CurriculumInputEntry
        oe: CurriculumInputEntry
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
        curriculum: String!
        courses: [StudentCourseInput!]!
    }

    input RecommendationInput {
        email: String!
        semesterType: String!
        year: Int!
    }
`;

export default inputTypes;
