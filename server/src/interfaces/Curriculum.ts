import { Types } from "mongoose";
import DocumentType from "./DocumentType";

export interface Curriculum extends DocumentType<Curriculum> {
    department: string;
    semester: Types.ObjectId;
    pm: Types.ObjectId[]; // course id
    pme: Types.ObjectId[];
    hse: Types.ObjectId[];
    sme: Types.ObjectId[];
    pmt: Types.ObjectId[];
    oe: Types.ObjectId[];
}
