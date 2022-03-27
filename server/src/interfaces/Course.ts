import DocumentType from "./DocumentType";

export enum CourseType {
    COMMON = "COMMON",
    PM = "PM",
    PME = "PME",
    HSE = "HSE",
    SME = "SME",
    PMT = "PMT",
    OE = "OE",
    PROJECT = "PROJECT",
}

export interface Course<T> extends DocumentType<Course<T>> {
    name: string;
    code: string;
    credits: [number, number, number, number]; // L-T-P-C format
    description?: string;
    prerequisites: T[]; // could be subjective terms, not exact course
    corequisites: T[];
    // department?: string;
    ctype: CourseType;
    syllabus: string; // link
    createdAt: string;
    updatedAt: string;
}
