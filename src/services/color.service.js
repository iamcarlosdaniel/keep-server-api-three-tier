import Color from "../database/models/color.model.js";

import UserError from "../errors/user.error.js";

class ColorService {
  async getAllColors() {
    const colorsFound = await Color.find().select("_id, name");

    if (!colorsFound || colorsFound.length === 0) {
      throw new UserError(404, "No colors found");
    }

    return {
      message: "Colors retrieved successfully",
      data: { colors: colorsFound },
    };
  }

  async getColorById(colorId) {
    const colorFound = await Color.findById(colorId).select("_id, name");

    if (!colorFound) {
      throw new UserError(404, "Color not found");
    }

    return {
      message: "Color retrieved successfully",
      data: { color: colorFound },
    };
  }
}

export default new ColorService();
