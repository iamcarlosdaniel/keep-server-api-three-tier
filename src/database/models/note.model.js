import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Note", noteSchema);
