import Image from "../database/models/image.model.js";
import {
  saveFileToDisk,
  deleteFileFromDisk,
  getFileFromDisk,
} from "../utils/file.utils.js";

class ImageService {
  async getInformationImageById(image) {
    try {
      return {
        message: "The image was found successfully.",
        data: { image: image },
      };
    } catch (error) {
      console.error(error);
      throw {
        status: error.status,
        message: error.userErrorMessage,
      };
    }
  }

  async getImageById(imagePath) {
    try {
      const file = await getFileFromDisk(imagePath);
      return file.data.path;
    } catch (error) {
      console.error(error);
      throw {
        status: error.status,
        message: error.userErrorMessage,
      };
    }
  }

  async saveImage(userId, file) {
    try {
      const relativePath = "images/" + userId;
      const savedFile = await saveFileToDisk(relativePath, file);

      await Image.create({
        user_id: userId,
        filename: savedFile.data.filename,
        original_name: savedFile.data.originalName,
        path: savedFile.data.path,
      });

      return { message: "The image was saved successfully." };
    } catch (error) {
      console.error(error);
      throw {
        status: error.status,
        message: error.userErrorMessage,
      };
    }
  }

  async deleteImage(imageId) {
    try {
      const imageFound = await Image.findByIdAndDelete(imageId);

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
    } catch (error) {
      console.error(error);
      throw {
        status: error.status,
        message: error.userErrorMessage,
      };
    }
  }

  async shareImage(imageId, sharedWithUserId) {
    try {
      const imageFound = await Image.findById(imageId);

      if (!imageFound) {
        throw {
          status: 404,
          message: "Image not found.",
        };
      }

      imageFound.shared_with.push({ user_id: sharedWithUserId });

      await imageFound.save();

      return {
        message: "The image was shared successfully.",
      };
    } catch (error) {
      console.error(error);
      throw {
        status: error.status,
        message: error.userErrorMessage,
      };
    }
  }

  async unshareImage(imageId, sharedWithUserId) {
    try {
      const imageFound = await Image.findById(imageId);

      if (!imageFound) {
        throw {
          status: 404,
          message: "Image not found.",
        };
      }

      imageFound.shared_with.pull({
        user_id: sharedWithUserId,
      });

      await imageFound.save();

      return {
        message: "The image was unshared successfully.",
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

export default new ImageService();
