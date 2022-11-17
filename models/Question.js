import mongoose, { Schema } from "mongoose";

const QuestionSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    awnsers: {
      type: [Object],
    },
    solved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Question", QuestionSchema);
