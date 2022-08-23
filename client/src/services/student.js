import axios from "axios";
import {
    getStudentQuery,
    addStudentsQuery,
    updateStudentQuery,
} from "../graphql/student";

export const addStudents = async (students) => {
    try {
        let response = await axios.post("", addStudentsQuery(students), {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (e) {
        throw e;
    }
};

export const updateStudent = async (student) => {
    try {
        let response = await axios.post("", updateStudentQuery(student), {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (e) {
        throw e;
    }
};

export const fetchStudent = async (email) => {
    try {
        let response = await axios.post("", getStudentQuery(email));
        const data = response.data.data.getStudent;
        return data;
    } catch (e) {
        throw e;
    }
};
