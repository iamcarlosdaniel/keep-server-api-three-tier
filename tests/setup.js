import "dotenv/config";
import mongoose from "mongoose";

beforeAll(async () => {
  console.log(">>> Connecting to the database...");
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  console.log(">>> Closing the database connection...");
  await mongoose.connection.close();
});
