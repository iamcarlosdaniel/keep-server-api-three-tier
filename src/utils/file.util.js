import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function saveFileToDisk(relativePath, file) {
  try {
    const targetDir = path.resolve("uploads", relativePath);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const uniqueName = uuidv4() + path.extname(file.originalname);
    const filePath = path.join(targetDir, uniqueName);

    fs.writeFileSync(filePath, file.buffer);

    return {
      originalName: file.originalname,
      storedFileName: uniqueName,
      mimeType: file.mimetype,
      sizeInBytes: file.size,
      storagePath: path.join(relativePath, uniqueName),
    };
  } catch (error) {
    throw {
      status: 500,
      userErrorMessage: "Saving the file was unsuccessful.",
      message: error.message,
    };
  }
}

export async function deleteFileFromDisk(relativeFilePath) {
  try {
    const filePath = path.resolve("uploads", relativeFilePath);

    fs.unlinkSync(filePath);

    return {
      message: "File deleted successfully.",
      data: {
        path: relativeFilePath,
      },
    };
  } catch (error) {
    throw {
      status: 404,
      userErrorMessage: "Unable to locate the file.",
      message: error.message,
    };
  }
}

export async function getFileFromDisk(relativeFilePath) {
  try {
    const filePath = path.resolve("uploads", relativeFilePath);

    if (!fs.existsSync(filePath)) {
      throw new Error("File not found");
    }

    return {
      message: "File retrieved successfully.",
      path: filePath,
    };
  } catch (error) {
    throw {
      status: 404,
      userErrorMessage: "Unable to locate the file.",
      message: error.message,
    };
  }
}
