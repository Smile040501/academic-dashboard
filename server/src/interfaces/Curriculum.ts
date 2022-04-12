import DocumentType from "./DocumentType";

export interface Curriculum<T> extends DocumentType<Curriculum<T>> {
    department: string;
    pm: T[]; // course id
    pme: T[];
    hse: T[];
    sme: T[];
    pmt: T[];
    oe: T[];
    createdAt: string;
    updatedAt: string;
}
