import { Types } from "mongoose";

import DocumentType from "./DocumentType";

export interface Student extends DocumentType<Student> {
    name: string;
    email: string;
    // googleId: string;
    joiningYear: number;
    department: string;
    courses: {
        // course, semester will be unique
        course: Types.ObjectId; // course id
        completed: boolean;
        // enrolled: boolean;
        semester: Types.ObjectId; // semester id
    }[];
    createdAt: string;
    updatedAt: string;
}
