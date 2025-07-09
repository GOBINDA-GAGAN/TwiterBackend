import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
dotenv.config();

export const isAuthenticated = async(req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

   const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await user.findById(decoded.id);

    if (!user) {
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.status(404).json({ message: "User not found. It might have been deleted." });
    }
 
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
      }

      req.userId = decoded.id;
      next();
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in isAuthenticated middleware",
      error: error.message || "Unexpected error"
    });
  }
};
