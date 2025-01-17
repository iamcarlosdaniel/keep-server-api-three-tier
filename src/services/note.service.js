import Note from "../database/models/note.model.js";

class NoteService {
  async getAllMyNotes(userId) {
    try {
      const allMyNotes = await Note.find({ user_id: userId });
      return allMyNotes;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getOneNote(noteId) {
    try {
      const noteFound = await Note.findById(noteId).populate("user_id");

      if (!noteFound) {
        throw new Error("Note not found");
      }

      return noteFound;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createNote(noteData, userId) {
    try {
      const newNote = await Note({
        user_id: userId,
        ...noteData,
      });

      await newNote.save();

      return { message: "Note created successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateNote(noteId, noteData) {
    try {
      const noteUpdated = await Note.findByIdAndUpdate(
        { _id: noteId },
        noteData,
        { new: true }
      );

      if (!noteUpdated) {
        throw new Error("Note not found");
      }

      return { message: "Note updated successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteNote(noteId) {
    try {
      const noteDeleted = await Note.findByIdAndDelete(noteId);

      if (!noteDeleted) {
        throw new Error("Note not found");
      }

      return { message: "Note deleted successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new NoteService();
