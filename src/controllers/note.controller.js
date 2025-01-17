import noteService from "../services/note.service.js";

class NoteController {
  async getAllMyNotes(req, res) {
    try {
      const allMyNotes = await noteService.getAllMyNotes(req.authData.id);
      res.send({ status: "OK", data: allMyNotes });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: [{ message: error.message || error }] },
      });
    }
  }

  async getOneNote(req, res) {
    try {
      const noteFound = await noteService.getOneNote(req.params.id);

      res.status(200).send({ status: "OK", data: noteFound });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: [{ message: error.message || error }] },
      });
    }
  }

  async createNote(req, res) {
    try {
      const newNote = await noteService.createNote(req.body, req.authData.id);

      res.status(200).send({ status: "OK", data: newNote });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: [{ message: error.message || error }] },
      });
    }
  }

  async updateNote(req, res) {
    try {
      const noteUpdated = await noteService.updateNote(req.params.id, req.body);

      res.status(200).send({ status: "OK", data: noteUpdated });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: [{ message: error.message || error }] },
      });
    }
  }

  async deleteNote(req, res) {
    try {
      const noteDeleted = await noteService.deleteNote(req.params.id);

      res.status(200).send({ status: "OK", data: noteDeleted });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: [{ message: error.message || error }] },
      });
    }
  }
}

export default new NoteController();
