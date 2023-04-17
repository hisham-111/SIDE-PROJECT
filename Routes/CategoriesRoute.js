import express from "express";
import Controller from "../Controllers/CategoriesController.js";
import imageHandle from "../middleware/imageHandle.js";
const router = express.Router();

router.get("/", Controller.getAll);
router.get("/:id", Controller.get);
router.post("/",imageHandle,Controller.addCategories);
router.put("/:id",imageHandle,Controller.updateCategories);
router.delete("/:id", Controller.deleteCategories);

export default router;

