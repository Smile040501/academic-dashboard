import { Types, Schema, model } from "mongoose";

import { Semester, SemesterType } from "./../interfaces/Semester";

const semesterSchema = new Schema<Semester<Types.ObjectId>>(
    {
        semesterType: {
            type: String,
            enum: Object.values(SemesterType),
            required: true,
            uppercase: true,
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

semesterSchema.index({ semesterType: 1, year: 1 }, { unique: true });

export default model<Semester<Types.ObjectId>>("Semester", semesterSchema);
