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

export interface Course<T> extends DocumentType<Course<T>> {
    id: Types.ObjectId;
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

export interface EligibleCourseEntry {
    requiredCredits: number;
    completedCredits: number;
    completedCourses: Types.ObjectId[];
    pendingCourses: Types.ObjectId[];
    eligibleCourses: Types.ObjectId[];
}

export interface EligibleCourses {
    totalCredits: number;
    completedCredits: number;
    pm: EligibleCourseEntry;
    pme: EligibleCourseEntry;
    hse: EligibleCourseEntry;
    sme: EligibleCourseEntry;
    pmt: EligibleCourseEntry;
    oe: EligibleCourseEntry;
}
