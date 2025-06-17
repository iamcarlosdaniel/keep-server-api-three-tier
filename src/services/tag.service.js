import Tag from "../database/models/tag.model.js";

import UserError from "../errors/user.error.js";

class TagService {
  async getMyTags(userId) {
    const allTags = await Tag.find({ created_by: userId }).select("-__v");

    if (!allTags || allTags.length === 0) {
      throw new UserError(404, "No tags found for this user");
    }

    return {
      message: "Tags retrieved successfully",
      data: { tags: allTags },
    };
  }

  async getTagById(userId, tagId) {
    const tagFound = await Tag.findOne({
      _id: tagId,
      created_by: userId,
    }).select("-__v");

    if (!tagFound) {
      throw new UserError(404, "Tag not found");
    }

    return {
      message: "Tag retrieved successfully",
      data: { tag: tagFound },
    };
  }

  async createTag(userId, tagData) {
    const tagFound = await Tag.findOne({
      title: tagData.title,
      created_by: userId,
    });

    if (tagFound) {
      throw new UserError(400, "Tag with this title already exists");
    }

    await Tag.create({
      created_by: userId,
      ...tagData,
    });

    return {
      message: "Tag created successfully",
    };
  }

  async updateTag(userId, tagId, tagData) {
    const updatedTag = await Tag.findOneAndUpdate(
      { _id: tagId, created_by: userId },
      { ...tagData },
      {
        new: true,
      }
    );

    if (!updatedTag) {
      throw new UserError(404, "Tag not found");
    }

    return {
      message: "Tag updated successfully",
    };
  }

  async deleteTag(userId, tagId) {
    const deletedTag = await Tag.findOneAndDelete({
      _id: tagId,
      created_by: userId,
    });

    if (!deletedTag) {
      throw new Error(404, "Tag not found");
    }

    return { message: "Tag deleted successfully" };
  }
}

export default new TagService();
