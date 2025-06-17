import Note from "../database/models/note.model.js";
import User from "../database/models/user.model.js";
import Tag from "../database/models/tag.model.js";
import Color from "../database/models/color.model.js";

import UserError from "../errors/user.error.js";

class NoteService {
  async getMyNotes(userId) {
    const allMyNotes = await Note.find({ created_by: userId })
      .select("-__v")
      .populate({ path: "header_image", select: "url" })
      .populate({ path: "color", select: "name" })
      .populate({ path: "tags", select: "title" });

    if (!allMyNotes || allMyNotes.length === 0) {
      throw new UserError(404, "No notes found for this user");
    }

    return {
      message: "Notes retrieved successfully",
      data: { notes: allMyNotes },
    };
  }

  async getNotesSharedWithMe(userId) {
    const notesSharedWithMe = await Note.find({
      shared_with: {
        $elemMatch: { created_by: userId, permission: "viewer" },
      },
    }).select("-__v");

    if (!notesSharedWithMe || notesSharedWithMe.length === 0) {
      throw new UserError(404, "No notes shared with this user");
    }

    return {
      message: "Notes shared with you retrieved successfully",
      data: { notes: notesSharedWithMe },
    };
  }

  async getNoteById(userId, noteId) {
    const noteFound = await Note.findOne({
      _id: noteId,
    })
      .or([
        { created_by: userId },
        {
          shared_with: {
            $elemMatch: { user_id: userId, permission: "viewer" },
          },
        },
      ])
      .select("-__v")
      .populate({ path: "header_image", select: "url" })
      .populate({ path: "color", select: "name" })
      .populate({ path: "tags", select: "title" })
      .populate({
        path: "created_by",
        select: "first_name last_name",
      });

    if (!noteFound) {
      throw new UserError(
        404,
        "Note not found or you do not have permission to view it"
      );
    }

    return {
      message: "Note retrieved successfully",
      data: { note: noteFound },
    };
  }

  async createNote(userId, noteData) {
    await Note.create({
      created_by: userId,
      ...noteData,
    });

    return {
      message: "Note created successfully",
    };
  }

  async updateNote(userId, noteId, noteData) {
    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: noteId,
      },
      { $set: noteData },
      { new: true }
    ).or([
      { created_by: userId },
      {
        shared_with: {
          $elemMatch: { user_id: userId, permission: "editor" },
        },
      },
    ]);

    if (!updatedNote) {
      throw new UserError(
        404,
        "Note not found or you do not have permission to edit it"
      );
    }

    return {
      message: "Note updated successfully",
    };
  }

  async deleteNote(userId, noteId) {
    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      created_by: userId,
    });

    if (!deletedNote) {
      throw new UserError(
        404,
        "Note not found or you do not have permission to delete it"
      );
    }

    return { message: "Note deleted successfully" };
  }

  async changeColor(userId, noteId, colorId) {
    const colorFound = await Color.findOne({ _id: colorId });
    if (!colorFound) {
      throw new UserError(404, "Color not found");
    }
    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: noteId,
        created_by: userId,
      },
      {
        $set: { color: colorId },
      },
      { new: true }
    );
    if (!updatedNote) {
      throw new UserError(
        404,
        "Note not found or you do not have permission to change its color"
      );
    }
    return {
      message: "Note color changed successfully",
    };
  }

  async addHeaderImage(userId, noteId, imageId) {
    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: noteId,
        created_by: userId,
      },
      {
        $set: { header_image: imageId },
      },
      { new: true }
    );
    if (!updatedNote) {
      throw new UserError(
        404,
        "Note not found or you do not have permission to add a header image"
      );
    }
    return {
      message: "Header image added successfully",
    };
  }

  async removeHeaderImage(userId, noteId) {
    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: noteId,
        created_by: userId,
      },
      {
        $unset: { header_image: "" },
      },
      { new: true }
    );
    if (!updatedNote) {
      throw new UserError(
        404,
        "Note not found or you do not have permission to remove the header image"
      );
    }
    return {
      message: "Header image removed successfully",
    };
  }

  async addTag(userId, noteId, tagId) {
    const tagFound = await Tag.findOne({ _id: tagId, created_by: userId });

    if (!tagFound) {
      throw new UserError(404, "Tag not found");
    }

    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: noteId,
        created_by: userId,
      },
      {
        $addToSet: { tags: tagId },
      },
      { new: true }
    );

    if (!updatedNote) {
      throw new UserError(
        404,
        "Note not found or you do not have permission to add a tag"
      );
    }

    return {
      message: "Tag added successfully",
    };
  }

  async removeTag(userId, noteId, tagId) {
    const tagFound = await Tag.findOne({ _id: tagId, created_by: userId });

    if (!tagFound) {
      throw new UserError(404, "Tag not found");
    }

    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: noteId,
        created_by: userId,
      },
      {
        $pull: { tags: tagId },
      },
      { new: true }
    );
    if (!updatedNote) {
      throw new UserError(
        404,
        "Note not found or you do not have permission to remove a tag"
      );
    }
    return {
      message: "Tag removed successfully",
    };
  }

  async shareNote(userId, noteId, payload) {
    const userFound = await User.findOne({ email: payload.email });

    if (!userFound) {
      throw new UserError(404, "User not found");
    }

    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: noteId,
        created_by: userId,
      },
      {
        $addToSet: {
          shared_with: {
            user_id: userFound._id,
            permission: payload.permission,
          },
        },
      }
    );

    if (!updatedNote) {
      throw new UserError(
        404,
        "Note not found or you do not have permission to share it"
      );
    }

    return {
      message: "Note shared successfully",
    };
  }

  async unshareNote(userId, noteId, payload) {
    const userFound = await User.findOne({ email: payload.email });

    if (!userFound) {
      throw new UserError(404, "User not found");
    }

    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: noteId,
        created_by: userId,
      },
      {
        $pull: {
          shared_with: {
            user_id: userFound._id,
          },
        },
      }
    );

    if (!updatedNote) {
      throw new UserError(
        404,
        "Note not found or you do not have permission to unshare it"
      );
    }

    return {
      message: "Note unshared successfully",
    };
  }
}

export default new NoteService();
