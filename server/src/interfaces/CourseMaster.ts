import { Types } from "mongoose";

import DocumentType from "./DocumentType";

// List of all approved courses
export interface CourseMaster extends DocumentType<CourseMaster> {
    courses: Types.ObjectId[];
    createdAt: string;
    updatedAt: string;
}
