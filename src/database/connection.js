import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
};
