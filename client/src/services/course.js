import axios from "axios";
import {
    addCoursesQuery,
    updateCoursesQuery,
    getCourseQuery,
    getAllCoursesQuery,
    getAllStudentCoursesQuery,
    getAllStudentEligibleCoursesQuery,
} from "../graphql/course";

export const addCourses = async (courses) => {
    try {
        let response = await axios.post("", addCoursesQuery(courses), {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (e) {
        throw e;
    }
};

export const updateCourses = async (courses) => {
    try {
        let response = await axios.post("", updateCoursesQuery(courses), {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (e) {
        throw e;
    }
};

export const fetchCourse = async (id) => {
    try {
        let response = await axios.post("", getCourseQuery(id));
        const course = response.data.data.getCourse;
        return course;
    } catch (e) {
        throw e;
    }
};

export const getAllCourses = async () => {
    try {
        let response = await axios.post("", getAllCoursesQuery());
        const courses = response.data.data.getCourses;
        return courses;
    } catch (e) {
        throw e;
    }
};

export const getAllStudentCourses = async (email) => {
    try {
        if (email === "") {
            return [];
        }
        let response = await axios.post("", getAllStudentCoursesQuery(email));
        const curriculum = response.data.data.getStudent.curriculum;
        const courses = [];
        for (const t of Object.values(curriculum)) {
            for (const c of t.courses) {
                courses.push(c);
            }
        }
        return courses;
    } catch (e) {
        throw e;
    }
};

export const getAllStudentEligibleCourses = async (email) => {
    try {
        if (email === "") {
            return [];
        }
        let response = await axios.post(
            "",
            getAllStudentEligibleCoursesQuery(email)
        );
        const eligibleCourses = response.data.data.showAllEligibleCourses;
        return eligibleCourses;
    } catch (e) {
        throw e;
    }
};
