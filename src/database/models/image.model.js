import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    filename: {
      type: String,
      required: true,
    },
    original_name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    shared_with: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Image", imageSchema);
