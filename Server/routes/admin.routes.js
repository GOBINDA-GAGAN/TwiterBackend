import express from "express";
import { deleteAllPost, deleteAllUser, getAllUser } from "../controller/admin.controller.js";
import { getAllPost } from "../controller/post.controller.js";
const router = express.Router();

router.get("/all-users", getAllUser);
router.delete("/delete-all-users", deleteAllUser);

router.get("/all-post", getAllPost);
router.delete("/delete-all-post", deleteAllPost);

export default router;
