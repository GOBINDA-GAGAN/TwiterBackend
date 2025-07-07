import express from "express";
import {followUser, logout, profile, profileById, signIn,signUp} from "../controller/user.controller.js"
import {isAuthenticated} from "../middleware/isAuthenticated.js"
const router = express.Router();

router.get("/welcome-message", (req, res) => {
  res.status(200).json({ message: "Welcome to Thread API" });
});


router.post('/auth/sign-in',signIn);
router.post('/auth/sign-up',signUp);
router.get("/user/:id",profileById)
router.get("/profile", isAuthenticated,profile)
router.get("/logout",logout)



//? for follow log in user to another
router.put('/follow/:id', isAuthenticated, followUser);




export default router;
