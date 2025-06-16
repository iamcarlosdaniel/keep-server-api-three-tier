import imageService from "../services/image.service.js";
import fs from "fs";
import path from "path";
class ImageController {
  async getInformationImageById(req, res) {
    try {
      const image = req.image;

      const response = await imageService.getInformationImageById(image);

      res.status(200).send({
        status: "OK",
        data: response.data,
      });
    } catch (error) {
      console.log(error);
      res.status(error?.status || 500).send({
        status: "FAILED",
        error: [
          {
            message:
              error?.message ||
              "Ocurrio un error al procesar su solicitud. Por favor intente de nuevo mas tarde.",
          },
        ],
      });
    }
  }

  async getImageById(req, res) {
    try {
      const imagePath = req.image.path;
      const imageFile = await imageService.getImageById(imagePath);

      res.status(200).sendFile(imageFile);
    } catch (error) {
      console.log(error);
      res.status(error?.status || 500).send({
        status: "FAILED",
        error: [
          {
            message:
              error?.message ||
              "Ocurrio un error al procesar su solicitud. Por favor intente de nuevo mas tarde.",
          },
        ],
      });
    }
  }

  async saveImage(req, res) {
    try {
      const userId = req.authData.id;
      const file = req.file;

      console.log("userId", userId);
      const response = await imageService.saveImage(userId, file);

      res.status(200).send({
        status: "OK",
        message: response.message,
      });
    } catch (error) {
      console.log(error);
      res.status(error?.status || 500).send({
        status: "FAILED",
        error: [
          {
            message:
              error?.message ||
              "Ocurrio un error al procesar su solicitud. Por favor intente de nuevo mas tarde.",
          },
        ],
      });
    }
  }

  async deleteImage(req, res) {
    try {
      const userId = req.authData.id;
      const imageId = req.image._id;

      const response = await imageService.deleteImage(imageId, userId);

      res.status(200).send({
        status: "OK",
        message: response.message,
      });
    } catch (error) {
      console.log(error);
      res.status(error?.status || 500).send({
        status: "FAILED",
        error: [
          {
            message:
              error?.message ||
              "Ocurrio un error al procesar su solicitud. Por favor intente de nuevo mas tarde.",
          },
        ],
      });
    }
  }

  async shareImage(req, res) {
    try {
      const imageId = req.params.imageId;
      const sharedWith = req.params.userId;

      const response = await imageService.shareImage(imageId, sharedWith);

      res.status(200).send({
        status: "OK",
        message: response.message,
      });
    } catch (error) {
      console.log(error);
      res.status(error?.status || 500).send({
        status: "FAILED",
        error: [
          {
            message:
              error?.message ||
              "Ocurrio un error al procesar su solicitud. Por favor intente de nuevo mas tarde.",
          },
        ],
      });
    }
  }

  async unshareImage(req, res) {
    try {
      const imageId = req.params.imageId;
      const sharedWith = req.params.userId;

      const response = await imageService.unshareImage(imageId, sharedWith);

      res.status(200).send({
        status: "OK",
        message: response.message,
      });
    } catch (error) {
      console.log(error);
      res.status(error?.status || 500).send({
        status: "FAILED",
        error: [
          {
            message:
              error?.message ||
              "Ocurrio un error al procesar su solicitud. Por favor intente de nuevo mas tarde.",
          },
        ],
      });
    }
  }
}

export default new ImageController();
