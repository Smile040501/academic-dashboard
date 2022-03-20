import { Schema, model } from "mongoose";

import { Student } from "../interfaces/Student";

const studentSchema = new Schema<Student>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        joiningYear: {
            type: Number,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        courses: [
            {
                course: {
                    type: Schema.Types.ObjectId, // course id
                    ref: "Course",
                },
                completed: {
                    type: Boolean,
                    default: false,
                },
                semester: {
                    type: Schema.Types.ObjectId, // semester id
                    ref: "Semester",
                },
            },
        ],
    },
    { timestamps: true }
);

export default model<Student>("Student", studentSchema);