import { Schema, model } from "mongoose";

import { CourseMaster } from "../interfaces/CourseMaster";

const courseMasterSchema = new Schema<CourseMaster>(
    {
        courses: [
            {
                type: Schema.Types.ObjectId, // course id
                ref: "Course",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default model<CourseMaster>("CourseMaster", courseMasterSchema);
