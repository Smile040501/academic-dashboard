export const courseInfo = `
    _id
    name
    code
    credits
    description
    prerequisites {
        _id
        name
        code
        credits
    }
    corequisites {
        _id
        name
        code
        credits
    }
    ctype
    syllabus
`;

export const eligibleCourseEntry = `
    requiredCredits
    completedCredits
    completedCourses { ${courseInfo} }
    pendingCourses { ${courseInfo} }
    eligibleCourses { ${courseInfo} }
`;

export const addCoursesQuery = (courses) => ({
    query: `mutation addCourses($coursesInput: [CourseInput]) {
        addCourses(coursesInput: $coursesInput) {
            _id
        }
    }`,
    variables: {
        coursesInput: courses,
    },
});

export const updateCoursesQuery = (courses) => ({
    query: `mutation updateCourses($coursesInput: [CourseInput]) {
        updateCourses(coursesInput: $coursesInput) {
            _id
        }
    }`,
    variables: {
        coursesInput: courses,
    },
});

export const getCourseQuery = (code) => ({
    query: `{
        getCourse(code: "${code}") { ${courseInfo} }
    }`,
});

export const getAllCoursesQuery = () => ({
    query: `{
        getCourses { ${courseInfo} }
    }`,
});

export const getAllStudentCoursesQuery = (email) => ({
    query: `{
        getStudent(email: "${email}",) {
            curriculum {
                pm { courses { ${courseInfo} } }
                pme { courses { ${courseInfo} } }
                hse { courses { ${courseInfo} } }
                sme { courses { ${courseInfo} } }
                pmt { courses { ${courseInfo} } }
                oe { courses { ${courseInfo} } }
            }
        }
    }`,
});

export const getAllStudentEligibleCoursesQuery = (email) => ({
    query: `{
        showAllEligibleCourses(email: "${email}",) {
            totalCredits
            completedCredits
            pm { ${eligibleCourseEntry} }
            pme { ${eligibleCourseEntry} }
            hse { ${eligibleCourseEntry} }
            sme { ${eligibleCourseEntry} }
            pmt { ${eligibleCourseEntry} }
            oe { ${eligibleCourseEntry} }
        }
    }`,
});
