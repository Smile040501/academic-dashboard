import { Types } from "mongoose";

import DocumentType from "./DocumentType";
export interface Curriculum extends DocumentType<Curriculum> {
    department: string;
    pm: Types.ObjectId[]; // course id
    pme: Types.ObjectId[];
    hse: Types.ObjectId[];
    sme: Types.ObjectId[];
    pmt: Types.ObjectId[];
    oe: Types.ObjectId[];
    createdAt: string;
    updatedAt: string;
}
