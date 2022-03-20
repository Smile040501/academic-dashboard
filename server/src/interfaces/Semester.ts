import DocumentType from "./DocumentType";
import { Types } from "mongoose";

enum SemesterName {
    FALL,
    SPRING,
    SUMMER,
}

export interface Semester extends DocumentType<Semester> {
    semesterName: SemesterName;
    year: number;
    coursesOffered: {
        course: Types.ObjectId; // course id
        slots: string[];
        faculty: string;
    }[];
}
