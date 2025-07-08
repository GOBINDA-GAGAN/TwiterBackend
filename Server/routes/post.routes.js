import express from "express";

import {isAuthenticated} from "../middleware/isAuthenticated.js"
import { addPost, getAllPost } from "../controller/post.controller.js";
const router = express.Router();

router.post("/post",isAuthenticated,addPost)
router.get("/post",getAllPost)

export default router;