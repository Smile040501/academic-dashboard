import { Types } from "mongoose";

import DocumentType from "./DocumentType";

export enum CurriculumType {
    MAJOR = "MAJOR",
}

export interface Curriculum<T> extends DocumentType<Curriculum<T>> {
    id: Types.ObjectId;
    department: string;
    ctype: CurriculumType;
    totalCredits: number;
    pm: { requiredCredits: number; courses: T[] };
    pme: { requiredCredits: number; courses: T[] };
    hse: { requiredCredits: number; courses: T[] };
    sme: { requiredCredits: number; courses: T[] };
    pmt: { requiredCredits: number; courses: T[] };
    oe: { requiredCredits: number; courses: T[] };
    createdAt: string;
    updatedAt: string;
}
