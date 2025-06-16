import noteService from "../services/note.service.js";

class NoteController {
  async getAllMyNotes(req, res) {
    try {
      const response = await noteService.getAllMyNotes(req.authData.id);
      res.send({
        status: "OK",
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: [{ message: error.message || error }] },
      });
    }
  }

  async getOneNote(req, res) {
    try {
      const response = await noteService.getOneNote(req.params.id);

      res.status(200).send({ status: "OK", data: response.data });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: [{ message: error.message || error }] },
      });
    }
  }

  async createNote(req, res) {
    try {
      const response = await noteService.createNote(req.authData.id, req.body);

      res.status(200).send({ status: "OK", data: response.message });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: [{ message: error.message || error }] },
      });
    }
  }

  async updateNote(req, res) {
    try {
      const response = await noteService.updateNote(req.params.id, req.body);

      res.status(200).send({ status: "OK", data: response.message });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: [{ message: error.message || error }] },
      });
    }
  }

  async deleteImageFromNote(req, res) {
    try {
      const response = await noteService.deleteImageFromNote(
        req.params.id,
        req.params.imageId
      );

      res.status(200).send({ status: "OK", data: response.message });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: [{ message: error.message || error }] },
      });
    }
  }

  async deleteNote(req, res) {
    try {
      const response = await noteService.deleteNote(req.params.id);

      res.status(200).send({ status: "OK", data: response.message });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: [{ message: error.message || error }] },
      });
    }
  }
}

export default new NoteController();
