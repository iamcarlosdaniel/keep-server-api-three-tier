import mongoose from "mongoose";

const sharedWithSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    permission: {
      type: String,
      enum: ["viewer", "editor"],
      default: "viewer",
    },
  },
  {
    _id: false,
  }
);

const editionSchema = new mongoose.Schema(
  {
    locked: {
      type: Boolean,
      default: false,
    },
    editing_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    locked_at: {
      type: Date,
      default: null,
    },
  },
  {
    _id: false,
  }
);

const noteSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    header_image: {
      ref: "File",
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      sparse: true,
    },
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
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
    //edition: editionSchema,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Note", noteSchema);
