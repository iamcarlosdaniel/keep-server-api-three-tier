import { Router } from "express";

import { authenticationMiddleware } from "../../middlewares/authentication.middleware.js";
import { inputValidationMiddleware } from "../../middlewares/inputValidation.middleware.js";

import { noteSchema } from "../../database/schemas/note.schema.js";

import noteController from "../../controllers/note.controller.js";

const router = Router();

router.get("/", authenticationMiddleware, noteController.getMyNotes);

router.get(
  "/shared/me",
  authenticationMiddleware,
  noteController.getNotesSharedWithMe
);

router.get("/:noteId", authenticationMiddleware, noteController.getNoteById);

router.post(
  "/",
  authenticationMiddleware,
  inputValidationMiddleware(noteSchema),
  noteController.createNote
);

router.put(
  "/:noteId",
  authenticationMiddleware,
  inputValidationMiddleware(noteSchema),
  noteController.updateNote
);

router.delete("/:noteId", authenticationMiddleware, noteController.deleteNote);

router.put(
  "/:noteId/color",
  authenticationMiddleware,
  noteController.changeColor
);

router.put(
  "/:noteId/header",
  authenticationMiddleware,
  noteController.addHeaderImage
);

router.delete(
  "/:noteId/header",
  authenticationMiddleware,
  noteController.removeHeaderImage
);

router.post("/:noteId/tags", authenticationMiddleware, noteController.addTag);

router.delete(
  "/:noteId/tags",
  authenticationMiddleware,
  noteController.removeTag
);

router.post(
  "/:noteId/share",
  authenticationMiddleware,
  noteController.shareNote
);

router.delete(
  "/:noteId/share",
  authenticationMiddleware,
  noteController.unshareNote
);

export default router;
