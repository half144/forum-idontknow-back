import mongoose, { Schema } from "mongoose";

export const AwnserSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  awnser: {
    type: String,
    required: true,
  },
  comments: {
    type: [Object],
  },
  isCorrectAwnser: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Awnser", AwnserSchema);
