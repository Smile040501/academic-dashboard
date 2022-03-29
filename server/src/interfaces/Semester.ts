import DocumentType from "./DocumentType";

export enum SemesterType {
    FALL = "FALL",
    SPRING = "SPRING",
    SUMMER = "SUMMER",
}

export interface Semester<T> extends DocumentType<Semester<T>> {
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
