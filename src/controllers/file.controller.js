import fileService from "../services/file.service.js";

import { catchedAsync } from "../utils/catchedAsync.util.js";

class FileController {
  getFileById = catchedAsync(async (req, res) => {
    const imageId = req.params.fileId;
    const response = await fileService.getFileById(imageId);

    res.status(200).sendFile(response.file_path);
  });

  saveFile = catchedAsync(async (req, res) => {
    const userId = req.authData.id;
    const file = req.file;

    const response = await fileService.saveFile(userId, file);

    res.status(200).send({
      status: "OK",
      message: response.message,
    });
  });

  deleteFile = catchedAsync(async (req, res) => {
    const fileId = req.params.fileId;

    const response = await fileService.deleteFile(fileId);

    res.status(200).send({
      status: "OK",
      message: response.message,
    });
  });
}

export default new FileController();
