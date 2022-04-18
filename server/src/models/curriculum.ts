import { Schema, Types, model } from "mongoose";

import { Curriculum, CurriculumType } from "../interfaces/Curriculum";

const curriculumSchema = new Schema<Curriculum<Types.ObjectId>>(
    {
        department: {
            type: String,
            required: true,
        },
        ctype: {
            type: String,
            enum: Object.values(CurriculumType),
            required: true,
            uppercase: true,
        },
        totalCredits: {
            type: Number,
            required: true,
        },
        pm: {
            requiredCredits: {
                type: Number,
                required: true,
            },
            courses: [
                {
                    type: Schema.Types.ObjectId, // course id
                    ref: "Course",
                },
            ],
        },
        pme: {
            requiredCredits: {
                type: Number,
                required: true,
            },
            courses: [
                {
                    type: Schema.Types.ObjectId, // course id
                    ref: "Course",
                },
            ],
        },
        hse: {
            requiredCredits: {
                type: Number,
                required: true,
            },
            courses: [
                {
                    type: Schema.Types.ObjectId, // course id
                    ref: "Course",
                },
            ],
        },
        sme: {
            requiredCredits: {
                type: Number,
                required: true,
            },
            courses: [
                {
                    type: Schema.Types.ObjectId, // course id
                    ref: "Course",
                },
            ],
        },
        pmt: {
            requiredCredits: {
                type: Number,
                required: true,
            },
            courses: [
                {
                    type: Schema.Types.ObjectId, // course id
                    ref: "Course",
                },
            ],
        },
        oe: {
            requiredCredits: {
                type: Number,
                required: true,
            },
            courses: [
                {
                    type: Schema.Types.ObjectId, // course id
                    ref: "Course",
                },
            ],
        },
    },
    { timestamps: true }
);

curriculumSchema.index({ department: 1, type: 1 }, { unique: true });

export default model<Curriculum<Types.ObjectId>>(
    "Curriculum",
    curriculumSchema
);
