import { Schema, Types, model } from "mongoose";

import { Curriculum } from "../interfaces/Curriculum";

const curriculumSchema = new Schema<Curriculum<Types.ObjectId>>(
    {
        department: {
            type: String,
            required: true,
        },
        pm: [
            {
                type: Schema.Types.ObjectId, // course id
                ref: "Course",
            },
        ],
        pme: [
            {
                type: Schema.Types.ObjectId, // course id
                ref: "Course",
            },
        ],
        hse: [
            {
                type: Schema.Types.ObjectId, // course id
                ref: "Course",
            },
        ],
        sme: [
            {
                type: Schema.Types.ObjectId, // course id
                ref: "Course",
            },
        ],
        pmt: [
            {
                type: Schema.Types.ObjectId, // course id
                ref: "Course",
            },
        ],
        oe: [
            {
                type: Schema.Types.ObjectId, // course id
                ref: "Course",
            },
        ],
    },
    { timestamps: true }
);

export default model<Curriculum<Types.ObjectId>>(
    "Curriculum",
    curriculumSchema
);
