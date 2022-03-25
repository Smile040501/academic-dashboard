import { Types } from "mongoose";

import DocumentType from "./DocumentType";

export enum SemesterType {
    FALL = "FALL",
    SPRING = "SPRING",
    SUMMER = "SUMMER",
}

export interface Semester extends DocumentType<Semester> {
    semesterType: SemesterType;
    year: number;
    coursesOffered: {
        course: Types.ObjectId; // course id
        slots: string[];
        faculty: string;
    }[];
    createdAt: string;
    updatedAt: string;
}
