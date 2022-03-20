import { Schema, model } from "mongoose";
import { CourseMaster } from "../interfaces/CourseMaster";

const coursemasterSchema = new Schema<CourseMaster>(
    {
        course: {
            type: Schema.Types.ObjectId, // course id
            ref: "Course",
        },
    },
    {
        timestamps: true,
    }
);

export default model<CourseMaster>("CourseMaster", coursemasterSchema);
