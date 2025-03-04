import mongoose from "mongoose";

const { Schema, model } = mongoose;

const QueAnsSchema = new Schema({
    company_id: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const QueAnsModel = model("QueAns", QueAnsSchema);
export default QueAnsModel;
