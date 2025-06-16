import { Router } from "express";

import noteController from "../../controllers/note.controller.js";

import { authenticationMiddleware } from "../../middlewares/authentication.middleware.js";
import { inputValidationMiddleware } from "../../middlewares/inputValidation.middleware.js";

import { noteSchema } from "../../database/schemas/note.schema.js";

const router = Router();

router.get("/", authenticationMiddleware, noteController.getAllMyNotes);

router.get("/:id", authenticationMiddleware, noteController.getOneNote);

router.post(
  "/",
  authenticationMiddleware,
  inputValidationMiddleware(noteSchema),
  noteController.createNote
);

router.put(
  "/:id",
  authenticationMiddleware,
  inputValidationMiddleware(noteSchema),
  noteController.updateNote
);

router.delete(
  "/:id/image/:imageId",
  authenticationMiddleware,
  noteController.deleteImageFromNote
);

router.delete("/:id", authenticationMiddleware, noteController.deleteNote);

export default router;
