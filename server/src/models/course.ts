import { Schema, Types, model } from "mongoose";

import { Course, CourseType } from "../interfaces/Course";

const courseSchema = new Schema<Course<Types.ObjectId>>(
    {
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
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
            uppercase: true,
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

export default model<Course<Types.ObjectId>>("Course", courseSchema);
