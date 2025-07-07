import express from "express";
import {followUser, logout, profile, profileById, searchUser, signIn,signUp, updateUser} from "../controller/user.controller.js"
import {isAuthenticated} from "../middleware/isAuthenticated.js"
const router = express.Router();

router.get("/welcome-message", (req, res) => {
  res.status(200).json({ message: "Welcome to Thread API" });
});


// Auth
router.post('/auth/sign-in', signIn);
router.post('/auth/sign-up', signUp);
router.get('/auth/logout',isAuthenticated, logout);

// Profile (authenticated user's own profile)
router.get('/profile', isAuthenticated, profile);

// User Profile by ID
router.get('/user/id/:id',isAuthenticated, profileById);        
// User Search by username or query
router.get('/user/search/:query', searchUser);  




//? this router for follow log in user to another
router.put('/follow/:id', isAuthenticated, followUser);

// this is for update profile 
router.put('/update', isAuthenticated, updateUser);




export default router;
