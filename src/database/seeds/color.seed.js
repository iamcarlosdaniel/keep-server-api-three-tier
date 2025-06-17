import "dotenv/config";
import mongoose from "mongoose";
import Color from "../models/color.model.js";

const colors = [
  { name: "red" },
  { name: "orange" },
  { name: "yellow" },
  { name: "green" },
  { name: "blue" },
  { name: "fuchsia" },
  { name: "rose" },
  { name: "gray" },
];

const seedColors = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(">>> DB is connected");

    await Color.insertMany(colors);
    console.log("Colors seeded successfully!");
  } catch (error) {
    console.error("Error seeding colors:", error);
  } finally {
    await mongoose.connection.close();
    console.log(">>> DB is disconnected");
  }
};

seedColors();
