const types = `
    type Course {
        _id: ID!
        name: String!
        code: String!
        credits: [Int!]!
        description: String
        prerequisites: [Course!]!
        corequisites: [Course!]!
        ctype: CourseType!
        syllabus: String!
        createdAt: String!
        updatedAt: String!
    }

    type CurriculumEntry {
        requiredCredits: Int!
        courses: [Course!]!
    }

    type Curriculum {
        _id: ID!
        department: String!
        ctype: CurriculumType!
        totalCredits: Int!
        pm: CurriculumEntry!
        pme: CurriculumEntry!
        hse: CurriculumEntry!
        sme: CurriculumEntry!
        pmt: CurriculumEntry!
        oe: CurriculumEntry!
        createdAt: String!
        updatedAt: String!
    }


    type SemesterCourse {
        course: Course!
        slots: [String!]!
        faculty: String!
    }

    type Semester {
        _id: ID!
        semesterType: SemesterType!
        year: Int!
        coursesOffered: [SemesterCourse!]!
        createdAt: String!
        updatedAt: String!
    }

    type StudentCourse {
        course: Course!
        grade: String
        semester: Semester!
    }

    type Student {
        _id: ID!
        name: String!
        email: String!
        joiningYear: Int!
        department: String!
        curriculum: Curriculum!
        courses: [StudentCourse!]!
        createdAt: String!
        updatedAt: String!
    }

    type EligibleCourseEntry {
        requiredCredits: Int!
        completedCredits: Int!
        completedCourses: [Course!]!
        pendingCourses: [Course!]!
        eligibleCourses: [Course!]!
    }

    type EligibleCourses {
        totalCredits: Int!
        completedCredits: Int!
        pm: EligibleCourseEntry!
        pme: EligibleCourseEntry!
        hse: EligibleCourseEntry!
        sme: EligibleCourseEntry!
        pmt: EligibleCourseEntry!
        oe: EligibleCourseEntry!
    }

    type LoginResponse {
        token: String!
        tokenExpiration: Int!
    }
`;

export default types;
