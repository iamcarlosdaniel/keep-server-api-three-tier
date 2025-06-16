import Tag from "../database/models/tag.model.js";

class TagService {
  async getAllMyTags(userId) {
    try {
      const allTags = await Tag.find({ user_id: userId });

      return {
        message: "Tags retrieved successfully",
        data: { tags: allTags },
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getMyTagById(tagId) {
    try {
      const tagFound = await Tag.findById(tagId);
      if (!tagFound) {
        throw {
          status: 404,
          userErrorMessage: "Tag not found",
        };
      }
      return {
        message: "Tag retrieved successfully",
        data: { tag: tagFound },
      };
    } catch (error) {
      console.log(error);
      throw {
        status: error.status,
        message: error.userErrorMessage,
      };
    }
  }

  async createTag(userId, tagData) {
    try {
      const newTag = await Tag.create({
        user_id: userId,
        ...tagData,
      });

      return {
        message: "Tag created successfully",
        data: { tag: newTag },
      };
    } catch (error) {
      console.log(error);
      throw {
        status: error.status,
        message: error.userErrorMessage,
      };
    }
  }

  async updateTag(tagId, tagData) {
    try {
      const updatedTag = await Tag.findByIdAndUpdate(
        tagId,
        { ...tagData },
        {
          new: true,
        }
      );
      if (!updatedTag) {
        throw {
          status: 404,
          userErrorMessage: "Tag not found",
        };
      }
      return {
        message: "Tag updated successfully",
        data: { tag: updatedTag },
      };
    } catch (error) {
      console.log(error);
      throw {
        status: error.status,
        message: error.userErrorMessage,
      };
    }
  }

  async deleteTag(tagId) {
    try {
      const tagDeleted = await Tag.findByIdAndDelete(tagId);

      if (!tagDeleted) {
        throw {
          status: 404,
          userErrorMessage: "Tag not found",
        };
      }

      return { message: "Tag deleted successfully" };
    } catch (error) {
      console.log(error);
      throw {
        status: error.status,
        message: error.userErrorMessage,
      };
    }
  }
}

export default new TagService();
