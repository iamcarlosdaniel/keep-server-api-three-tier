import { Router } from "express";

import { authenticationMiddleware } from "../../middlewares/authentication.middleware.js";

import tagController from "../../controllers/tag.controller.js";

const router = Router();

router.get("/", authenticationMiddleware, tagController.getMyTags);

router.get("/:tagId", authenticationMiddleware, tagController.getTagById);

router.post("/", authenticationMiddleware, tagController.createTag);

router.put("/:tagId", authenticationMiddleware, tagController.updateTag);

router.delete("/:tagId", authenticationMiddleware, tagController.deleteTag);

export default router;
