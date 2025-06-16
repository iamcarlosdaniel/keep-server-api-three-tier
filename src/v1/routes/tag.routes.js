import { Router } from "express";

import { authenticationMiddleware } from "../../middlewares/authentication.middleware.js";

import TagController from "../../controllers/tag.controller.js";

const router = Router();

router.get("/", authenticationMiddleware, TagController.getAllMyTags);

router.post("/", authenticationMiddleware, TagController.createTag);

router.put("/:id", authenticationMiddleware, TagController.updateTag);

router.delete("/:id", authenticationMiddleware, TagController.deleteTag);

export default router;
