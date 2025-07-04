
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });

  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}