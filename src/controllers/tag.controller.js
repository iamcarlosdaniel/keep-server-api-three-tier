import tagService from "../services/tag.service.js";

import { catchedAsync } from "../utils/catchedAsync.util.js";

class TagController {
  getMyTags = catchedAsync(async (req, res) => {
    const userId = req.authData.id;

    const response = await tagService.getMyTags(userId);

    return res.status(200).send({
      status: "OK",
      message: response.message,
      data: response.data,
    });
  });

  getTagById = catchedAsync(async (req, res) => {
    const userId = req.authData.id;
    const tagId = req.params.tagId;

    const response = await tagService.getTagById(userId, tagId);

    return res.status(200).send({
      status: "OK",
      message: response.message,
      data: response.data,
    });
  });

  createTag = catchedAsync(async (req, res) => {
    const userId = req.authData.id;
    const tagData = req.body;

    const response = await tagService.createTag(userId, tagData);

    return res.status(200).send({
      status: "OK",
      message: response.message,
      data: response.data,
    });
  });

  updateTag = catchedAsync(async (req, res) => {
    const userId = req.authData.id;
    const tagId = req.params.tagId;
    const tagData = req.body;

    const response = await tagService.updateTag(userId, tagId, tagData);

    return res.status(200).send({
      status: "OK",
      message: response.message,
      data: response.data,
    });
  });

  deleteTag = catchedAsync(async (req, res) => {
    const userId = req.authData.id;
    const tagId = req.params.tagId;

    const response = await tagService.deleteTag(userId, tagId);

    return res.status(200).send({
      status: "OK",
      message: response.message,
      data: response.data,
    });
  });
}

export default new TagController();
