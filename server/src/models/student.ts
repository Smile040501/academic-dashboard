import { Types, Schema, model } from "mongoose";

import { Student } from "../interfaces/Student";

const studentSchema = new Schema<Student<Types.ObjectId, Types.ObjectId>>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        joiningYear: {
            type: Number,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        curriculum: {
            type: Schema.Types.ObjectId,
            ref: "Curriculum",
            required: true,
        },
        courses: [
            {
                course: {
                    type: Schema.Types.ObjectId, // course id
                    ref: "Course",
                },
                grade: {
                    type: String,
                    default: "",
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

export default model<Student<Types.ObjectId, Types.ObjectId>>(
    "Student",
    studentSchema
);
