import { Types } from "mongoose";

import DocumentType from "./DocumentType";

export enum SemesterType {
    FALL = "FALL",
    SPRING = "SPRING",
    SUMMER = "SUMMER",
}

export interface Semester<T> extends DocumentType<Semester<T>> {
    id: Types.ObjectId;
    semesterType: SemesterType;
    year: number;
    coursesOffered: {
        course: T; // course id
        slots: string[];
        faculty: string;
    }[];
    createdAt: string;
    updatedAt: string;
}
