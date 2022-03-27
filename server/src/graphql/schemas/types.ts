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

    type Curriculum {
        _id: ID!
        department: String!
        pm: [Course!]!
        pme: [Course!]!
        hse: [Course!]!
        sme: [Course!]!
        pmt: [Course!]!
        oe: [Course!]!
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
        completed: Boolean!
        semester: Semester!
    }

    type Student {
        _id: ID!
        name: String!
        email: String!
        joiningYear: Int!
        department: String!
        courses: [StudentCourse!]!
        createdAt: String!
        updatedAt: String!
    }
`;

export default types;
