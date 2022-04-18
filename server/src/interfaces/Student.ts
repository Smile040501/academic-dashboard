import { Types } from "mongoose";

import DocumentType from "./DocumentType";

export interface StudentCourse<T, U> {
    course: T; // course id
    grade: string;
    semester: U; // semester id
}

export interface Student<T, U> extends DocumentType<Student<T, U>> {
    id: Types.ObjectId;
    name: string;
    email: string;
    // googleId: string;
    joiningYear: number;
    department: string;
    curriculum: T;
    courses: StudentCourse<T, U>[];
    createdAt: string;
    updatedAt: string;
}
