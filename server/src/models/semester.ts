import { Types, Schema, model } from "mongoose";

import { Semester } from "./../interfaces/Semester";
import { SemesterType } from "./../interfaces/Semester";

const semesterSchema = new Schema<Semester<Types.ObjectId>>(
    {
        semesterType: {
            type: String,
            enum: Object.values(SemesterType),
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        coursesOffered: [
            {
                course: {
                    type: Schema.Types.ObjectId, // course id
                    ref: "Course",
                },
                slots: [String],
                faculty: String,
            },
        ],
    },
    { timestamps: true }
);

export default model<Semester<Types.ObjectId>>("Semester", semesterSchema);
