import { fileURLToPath } from "url";
import path, { dirname } from "path";

import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { CLIENT_URL } from "./config.js";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };

import authRoutes from "./v1/routes/auth.routes.js";
import notesRoutes from "./v1/routes/note.routes.js";

const app = express();

// Definir __dirname en módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notes", notesRoutes);

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Carpeta public para servir archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

app.get("/helloworld", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "helloWorld.html"));
});

// Ruta para servir el archivo HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

export default app;
