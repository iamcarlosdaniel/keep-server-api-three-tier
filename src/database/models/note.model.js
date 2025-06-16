import mongoose from "mongoose";

const sharedWithSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  permission: {
    type: String,
    enum: ["viewer", "editor"],
    default: "viewer",
  },
});

const noteSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    shared_with: [sharedWithSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Note", noteSchema);
