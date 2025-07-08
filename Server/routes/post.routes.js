import express from "express";

import {isAuthenticated} from "../middleware/isAuthenticated.js"
import { addPost, getAllPost,deletePost } from "../controller/post.controller.js";
const router = express.Router();

router.post("/post",isAuthenticated,addPost)
router.get("/post",getAllPost)
router.delete("/post/:postId",isAuthenticated,deletePost)

export default router;