import { Router } from "express";

import { authenticationMiddleware } from "../../middlewares/authentication.middleware.js";

import { processImage } from "../../middlewares/processFile.middleware.js";

import { imageAccessMiddleware } from "../../middlewares/resourceAccess.middleware.js";

import imageController from "../../controllers/image.controller.js";

const router = Router();

router.get(
  "/info/:imageId",
  authenticationMiddleware,
  imageAccessMiddleware("owner", "view"),
  imageController.getInformationImageById
);

router.get(
  "/:imageId/view",
  authenticationMiddleware,
  imageAccessMiddleware("owner", "view"),
  imageController.getImageById
);

router.post(
  "/",
  authenticationMiddleware,
  processImage,
  imageController.saveImage
);

router.delete(
  "/:imageId",
  authenticationMiddleware,
  imageAccessMiddleware("owner"),
  imageController.deleteImage
);

router.post(
  "/:imageId/share/:userId",
  authenticationMiddleware,
  imageAccessMiddleware("owner"),
  imageController.shareImage
);

router.post(
  "/:imageId/unshare/:userId",
  authenticationMiddleware,
  imageAccessMiddleware("owner"),
  imageController.unshareImage
);

export default router;
