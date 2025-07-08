import express from "express";

import {isAuthenticated} from "../middleware/isAuthenticated.js"
import { addPost } from "../controller/post.controller.js";
const router = express.Router();

router.post("/post",isAuthenticated,addPost)

export default router;