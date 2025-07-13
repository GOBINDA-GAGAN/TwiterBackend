import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  console.log("Token from cookie:", req.cookies.token);

  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    // ✅ Verify token once (sync)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Optional: check if user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.status(404).json({ message: "User not found. It might have been deleted." });
    }

    // ✅ Set userId for downstream routes
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
      error: error.message || "Unexpected error",
    });
  }
};
