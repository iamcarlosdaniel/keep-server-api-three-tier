import { Router } from "express";
import noteController from "../../controllers/note.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { inputValidationMiddleware } from "../../middlewares/inputValidation.middleware.js";
import { noteValidation } from "../../database/schemas/note.schema.js";

const router = Router();

//See all my notes
router.get("/", authMiddleware, noteController.getAllMyNotes);

//See one note
router.get("/:id", authMiddleware, noteController.getOneNote);

//Create a note
router.post(
  "/",
  authMiddleware,
  inputValidationMiddleware(noteValidation.noteShema),
  noteController.createNote
);

//Update a note
router.put(
  "/:id",
  authMiddleware,
  inputValidationMiddleware(noteValidation.noteShema),
  noteController.updateNote
);

//Delete a note
router.delete("/:id", authMiddleware, noteController.deleteNote);

export default router;
