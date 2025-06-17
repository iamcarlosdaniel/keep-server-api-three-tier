import noteService from "../services/note.service.js";

import { catchedAsync } from "../utils/catchedAsync.util.js";

class NoteController {
  getMyNotes = catchedAsync(async (req, res) => {
    const userId = req.authData.id;

    const response = await noteService.getMyNotes(userId);

    res.send({
      status: "success",
      message: response.message,
      data: response.data,
    });
  });

  getNotesSharedWithMe = catchedAsync(async (req, res) => {
    const userId = req.authData.id;

    const response = await noteService.getNotesSharedWithMe(userId);

    res.status(200).send({
      status: "success",
      message: response.message,
      data: response.data,
    });
  });

  getNoteById = catchedAsync(async (req, res) => {
    const userId = req.authData.id;
    const noteId = req.params.noteId;

    const response = await noteService.getNoteById(userId, noteId);

    res.status(200).send({
      status: "success",
      message: response.message,
      data: response.data,
    });
  });

  createNote = catchedAsync(async (req, res) => {
    const userId = req.authData.id;
    const noteData = req.body;

    const response = await noteService.createNote(userId, noteData);

    res.status(200).send({
      status: "success",
      message: response.message,
      data: response.data,
    });
  });

  updateNote = catchedAsync(async (req, res) => {
    const userId = req.authData.id;
    const noteId = req.params.noteId;
    const noteData = req.body;

    const response = await noteService.updateNote(userId, noteId, noteData);

    res.status(200).send({
      status: "success",
      message: response.message,
      data: response.data,
    });
  });

  deleteNote = catchedAsync(async (req, res) => {
    const userId = req.authData.id;
    const noteId = req.params.noteId;

    const response = await noteService.deleteNote(userId, noteId);

    res.status(200).send({
      status: "success",
      message: response.message,
    });
  });

  changeColor = catchedAsync(async (req, res) => {
    const userId = req.authData.id;
    const noteId = req.params.noteId;
    const colorId = req.body.color_id;
    const response = await noteService.changeColor(userId, noteId, colorId);
    res.status(200).send({
      status: "success",
      message: response.message,
    });
  });

  addHeaderImage = catchedAsync(async (req, res) => {
    const userId = req.authData.id;
    const noteId = req.params.noteId;
    const imageId = req.body.imageId;

    const response = await noteService.addHeaderImage(userId, noteId, imageId);

    res.status(200).send({
      status: "success",
      message: response.message,
    });
  });

  removeHeaderImage = catchedAsync(async (req, res) => {
    const userId = req.authData.id;
    const noteId = req.params.noteId;

    const response = await noteService.removeHeaderImage(userId, noteId);

    res.status(200).send({
      status: "success",
      message: response.message,
    });
  });

  addTag = catchedAsync(async (req, res) => {
    const userId = req.authData.id;
    const noteId = req.params.noteId;
    const tagId = req.body.tagId;

    const response = await noteService.addTag(userId, noteId, tagId);

    res.status(200).send({
      status: "success",
      message: response.message,
    });
  });

  removeTag = catchedAsync(async (req, res) => {
    const userId = req.authData.id;
    const noteId = req.params.noteId;
    const tagId = req.body.tagId;

    const response = await noteService.removeTag(userId, noteId, tagId);

    res.status(200).send({
      status: "success",
      message: response.message,
      data: response.data,
    });
  });

  shareNote = catchedAsync(async (req, res) => {
    const userId = req.authData.id;
    const noteId = req.params.noteId;
    const payload = req.body;

    const response = await noteService.shareNote(userId, noteId, payload);

    res.status(200).send({
      status: "success",
      message: response.message,
    });
  });

  unshareNote = catchedAsync(async (req, res) => {
    const userId = req.authData.id;
    const noteId = req.params.noteId;
    const payload = req.body;

    const response = await noteService.unshareNote(userId, noteId, payload);

    res.status(200).send({
      status: "success",
      message: response.message,
    });
  });
}

export default new NoteController();
