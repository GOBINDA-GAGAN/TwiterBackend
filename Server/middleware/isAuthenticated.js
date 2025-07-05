import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
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
