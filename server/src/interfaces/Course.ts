import { Types } from "mongoose";

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

export interface Course extends DocumentType<Course> {
    name: string;
    code: string;
    credits: [number, number, number, number]; // L-T-P-C format
    description?: string;
    prerequisites: Types.ObjectId[]; // could be subjective terms, not exact course
    corequisites: Types.ObjectId[];
    // department?: string;
    ctype: CourseType;
    syllabus: string; // link
    createdAt: string;
    updatedAt: string;
}
