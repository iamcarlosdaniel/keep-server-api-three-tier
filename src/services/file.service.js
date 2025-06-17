import File from "../database/models/file.model.js";

import UserError from "../errors/user.error.js";

import {
  saveFileToDisk,
  deleteFileFromDisk,
  getFileFromDisk,
} from "../utils/file.util.js";

class FileService {
  async getFileById(imageId) {
    const fileFound = await File.findOne({ stored_file_name: imageId });

    if (!fileFound) {
      throw new UserError({
        status: 404,
        userErrorMessage: "File not found.",
      });
    }

    const file = await getFileFromDisk(fileFound.storage_path);

    return {
      file_path: file.path,
    };
  }

  async saveFile(userId, file) {
    const relativePath = "images/" + userId;
    const newFile = await saveFileToDisk(relativePath, file);

    await File.create({
      uploaded_by: userId,
      original_name: newFile.originalName,
      stored_file_name: newFile.storedFileName,
      mime_type: newFile.mimeType,
      size_in_bytes: newFile.sizeInBytes,
      storage_path: newFile.storagePath,
      url:
        "http://localhost:3000/api/v1/files/" +
        newFile.storedFileName +
        "/view",
    });

    return { message: "The image was saved successfully." };
  }

  async deleteFile(imageId) {
    const imageFound = await File.findByIdAndDelete(imageId);

    if (!imageFound) {
      throw {
        status: 404,
        message: "Image not found.",
      };
    }

    await deleteFileFromDisk(imageFound.path);

    return {
      message: "The image was deleted successfully.",
    };
  }
}

export default new FileService();
