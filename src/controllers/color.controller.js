import colorService from "../services/color.service.js";

import { catchedAsync } from "../utils/catchedAsync.util.js";

class ColorController {
  getAllColors = catchedAsync(async (req, res) => {
    const response = await colorService.getAllColors();

    res.status(200).send({
      status: "success",
      message: response.message,
      data: response.data,
    });
  });

  getColorById = catchedAsync(async (req, res) => {
    const colorId = req.params.colorId;
    const response = await colorService.getColorById(colorId);

    res.status(200).send({
      status: "success",
      message: response.message,
      data: response.data,
    });
  });
}

export default new ColorController();
