import express from "express";
import { getAllUser } from "../controller/admin.controller.js";
const router = express.Router();

router.get("/all-users",getAllUser)

export default router;