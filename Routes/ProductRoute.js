import express from "express";
import Controller from "../Controllers/ProductController.js";
import imageHandle from "../middleware/imageHandle.js";
const router = express.Router();

router.get("/", Controller.getAll);
router.get("/:id", Controller.get);
router.post("/",imageHandle,Controller.addProduct);
router.put("/edit/:id",imageHandle,Controller.updateProduct);
router.delete("/delete/:id", Controller.deleteProduct);

export default router;
