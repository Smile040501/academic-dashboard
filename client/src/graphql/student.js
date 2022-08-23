import { courseInfo } from "./course";

export const addStudentsQuery = (students) => ({
    query: `mutation addStudents($studentsInput: [StudentInput]) {
        addStudents(studentsInput: $studentsInput) {
            _id
        }
    }`,
    variables: {
        studentsInput: students,
    },
});

export const updateStudentQuery = (student) => ({
    query: `mutation updateStudent($studentInput: StudentInput) {
        updateStudent(studentInput: $studentInput) {
            _id
        }
    }`,
    variables: {
        studentInput: student,
    },
});

export const getStudentQuery = (email) => ({
    query: `{
        getStudent(email: "${email}") {
            name
            email
            joiningYear
            department
            curriculum {
                ctype
                pm { courses { ${courseInfo} } }
                pme { courses { ${courseInfo} } }
                hse { courses { ${courseInfo} } }
                sme { courses { ${courseInfo} } }
                pmt { courses { ${courseInfo} } }
                oe { courses { ${courseInfo} } }
            }
            courses { course { ${courseInfo} } }
        }
    }`,
});
