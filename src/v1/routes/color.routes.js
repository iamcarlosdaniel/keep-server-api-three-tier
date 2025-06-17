import { Router } from "express";

import { authenticationMiddleware } from "../../middlewares/authentication.middleware.js";

import colorController from "../../controllers/color.controller.js";

const router = Router();

router.get("/", authenticationMiddleware, colorController.getAllColors);

router.get("/:colorId", authenticationMiddleware, colorController.getColorById);

export default router;
