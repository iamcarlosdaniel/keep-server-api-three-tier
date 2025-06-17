import { Router } from "express";

import { authenticationMiddleware } from "../../middlewares/authentication.middleware.js";

import { processImage } from "../../middlewares/processFile.middleware.js";

import fileController from "../../controllers/file.controller.js";

const router = Router();

router.get(
  "/:fileId/view",
  authenticationMiddleware,
  fileController.getFileById
);

router.post(
  "/upload",
  authenticationMiddleware,
  processImage,
  fileController.saveFile
);

router.delete("/:fileId", authenticationMiddleware, fileController.deleteFile);

export default router;
