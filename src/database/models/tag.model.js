import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
    },
  },
  {
    timestamps: true,
  }
);

tagSchema.index({ title: 1, created_by: 1 }, { unique: true });

export default mongoose.model("Tag", tagSchema);
