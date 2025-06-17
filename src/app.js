import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import { apiReference } from "@scalar/express-api-reference";

import authRoutes from "./v1/routes/auth.routes.js";
import notesRoutes from "./v1/routes/note.routes.js";
import tagRoutes from "./v1/routes/tag.routes.js";
import colorRoutes from "./v1/routes/color.routes.js";
import fileRoutes from "./v1/routes/file.routes.js";

import errorHandler from "./middlewares/errorHandler.middleware.js";

import OpenApiSpecification from "./openapi.json" with {type: "json"}

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notes", notesRoutes);
app.use("/api/v1/tags", tagRoutes);
app.use("/api/v1/colors", colorRoutes);
app.use("/api/v1/files", fileRoutes);

app.use(errorHandler);

app.get("/helloworld", (req, res) => {
  res.send("Hello World");
});

app.use(
  "/api/v1/reference",
  apiReference({
    theme: "none",
    spec: {
      content: OpenApiSpecification,
    },
  })
);

export default app;
