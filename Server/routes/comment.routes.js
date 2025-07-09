import express from "express";
import {addComment} from "../controller/comment.controller.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();
router.post("/comment/:postId",isAuthenticated, addComment)


export default router;
