import "dotenv/config";
import mongoose from "mongoose";
import Color from "../models/color.model.js";

const colors = [
  { name: "Rojo", value: "#FF0000" },
  { name: "Verde", value: "#00FF00" },
  { name: "Azul", value: "#0000FF" },
  { name: "Amarillo", value: "#FFFF00" },
  { name: "Negro", value: "#000000" },
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
