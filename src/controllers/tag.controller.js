import TagService from "../services/tag.service.js";

class TagController {
  async getAllMyTags(req, res) {
    try {
      const userId = req.authData.id;
      const response = await TagService.getAllMyTags(userId);
      return res.status(200).send({
        status: "OK",
        message: response.message,
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

  async getTagById(req, res) {
    try {
      const tagId = req.params.tagId;
      const response = await TagService.getTagById(tagId);
      return res.status(200).send({
        status: "OK",
        message: response.message,
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

  async createTag(req, res) {
    try {
      const userId = req.authData.id;
      const tagData = req.body;

      const response = await TagService.createTag(userId, tagData);
      return res.status(200).send({
        status: "OK",
        message: response.message,
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

  async updateTag(req, res) {
    try {
      const tagId = req.params.id;
      const tagData = req.body;

      const response = await TagService.updateTag(tagId, tagData);
      return res.status(200).send({
        status: "OK",
        message: response.message,
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

  async deleteTag(req, res) {
    try {
      const tagId = req.params.id;

      const response = await TagService.deleteTag(tagId);
      return res.status(200).send({
        status: "OK",
        message: response.message,
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
}

export default new TagController();
