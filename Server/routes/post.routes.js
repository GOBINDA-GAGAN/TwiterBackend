import express from "express";

import {isAuthenticated} from "../middleware/isAuthenticated.js"
import { addPost, getAllPost,deletePost, like_dislike, rePost, singlePost } from "../controller/post.controller.js";
const router = express.Router();

router.post("/post",isAuthenticated,addPost)
router.get("/post",getAllPost)
router.get("/post/:id",singlePost)
router.delete("/post/:postId",isAuthenticated,deletePost)
router.put("/post/like/:postId",isAuthenticated,like_dislike)
router.put("/re-post/:postId",isAuthenticated,rePost)

export default router;