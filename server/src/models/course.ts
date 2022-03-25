import { Schema, model } from "mongoose";

import { Course } from "../interfaces/Course";
import { CourseType } from "../interfaces/Course";

const courseSchema = new Schema<Course>(
    {
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        prerequisites: [
            {
                type: Schema.Types.ObjectId, // course id
                ref: "Course",
            },
        ],
        corequisites: [
            {
                type: Schema.Types.ObjectId, // course id
                ref: "Course",
            },
        ],
        ctype: {
            type: String,
            enum: Object.values(CourseType),
            required: true,
        },

        syllabus: {
            type: String,
            required: true,
        },

        credits: [
            {
                type: Number,
                required: true,
            },
        ],
    },
    { timestamps: true }
);

export default model<Course>("Course", courseSchema);
