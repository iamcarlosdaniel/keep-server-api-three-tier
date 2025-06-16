import Note from "../database/models/note.model.js";

import "../database/models/image.model.js";

class NoteService {
  async getAllMyNotes(userId) {
    try {
      const allMyNotes = await Note.find({ user_id: userId })
        .populate("images")
        .populate("color")
        .populate("tags");

      return {
        message: "Notes retrieved successfully",
        data: { notes: allMyNotes },
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getNoteById(noteId) {
    try {
      const noteFound = await Note.findById(noteId);

      if (!noteFound) {
        throw {
          status: 404,
          userErrorMessage: "Note not found",
        };
      }

      return {
        message: "Note retrieved successfully",
        data: { note: noteFound },
      };
    } catch (error) {
      console.log(error);
      throw {
        status: error.status,
        message: error.userErrorMessage,
      };
    }
  }

  async createNote(userId, noteData) {
    try {
      const newNote = await Note.create({
        user_id: userId,
        ...noteData,
      });

      return {
        message: "Note created successfully",
        data: { note: newNote },
      };
    } catch (error) {
      console.log(error);
      throw {
        status: error.status,
        message: error.userErrorMessage,
      };
    }
  }

  async updateNote(noteId, noteData) {
    try {
      const noteUpdated = await Note.findByIdAndUpdate(
        noteId,
        { ...noteData },
        { new: true }
      );

      if (!noteUpdated) {
        throw {
          status: 404,
          userErrorMessage: "Note not found",
        };
      }

      return { message: "Note updated successfully" };
    } catch (error) {
      console.log(error);
      throw {
        status: error.status,
        message: error.userErrorMessage,
      };
    }
  }

  async deleteNote(noteId) {
    try {
      const noteDeleted = await Note.findByIdAndDelete(noteId);

      if (!noteDeleted) {
        throw {
          status: 404,
          userErrorMessage: "Note not found",
        };
      }

      return { message: "Note deleted successfully" };
    } catch (error) {
      console.log(error);
      throw {
        status: error.status,
        message: error.userErrorMessage,
      };
    }
  }

  async shareNote(noteId, sharedWithUserId) {
    try {
      const noteFound = await Note.findById(noteId);
      if (!noteFound) {
        throw {
          status: 404,
          userErrorMessage: "Note not found",
        };
      }
      noteFound.shared_with.push({ user_id: sharedWithUserId });
      await noteFound.save();
      return {
        message: "Note shared successfully",
      };
    } catch (error) {
      console.error(error);
      throw {
        status: error.status,
        message: error.userErrorMessage,
      };
    }
  }

  async unshareNote(noteId, sharedWithUserId) {
    try {
      const noteFound = await Note.findById(noteId);
      if (!noteFound) {
        throw {
          status: 404,
          userErrorMessage: "Note not found",
        };
      }
      noteFound.shared_with = noteFound.shared_with.filter(
        (shared) => !shared.user_id.equals(sharedWithUserId)
      );
      await noteFound.save();
      return {
        message: "Note unshared successfully",
      };
    } catch (error) {
      console.error(error);
      throw {
        status: error.status,
        message: error.userErrorMessage,
      };
    }
  }

  async addImageToNote(noteId, imageId) {
    try {
      const noteFound = await Note.findById(noteId);
      if (!noteFound) {
        throw {
          status: 404,
          userErrorMessage: "Note not found",
        };
      }
      noteFound.images.push(imageId);
      await noteFound.save();
      return {
        message: "Image added to note successfully",
      };
    } catch (error) {
      console.error(error);
      throw {
        status: error.status,
        message: error.userErrorMessage,
      };
    }
  }

  async removeImageFromNote(noteId, imageId) {
    try {
      const noteFound = await Note.findById(noteId);
      if (!noteFound) {
        throw {
          status: 404,
          userErrorMessage: "Note not found",
        };
      }
      noteFound.images = noteFound.images.filter(
        (image) => !image.equals(imageId)
      );
      await noteFound.save();
      return {
        message: "Image removed from note successfully",
      };
    } catch (error) {
      console.error(error);
      throw {
        status: error.status,
        message: error.userErrorMessage,
      };
    }
  }
}

export default new NoteService();
