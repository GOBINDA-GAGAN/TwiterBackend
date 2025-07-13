import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import postRouter from "./routes/post.routes.js";
import cookieParser from "cookie-parser";
import commentRouter from "./routes/comment.routes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;
const FrontedUrl= process.env.FrontedURl;


// Middleware
app.use(
  cors({
    origin:FrontedUrl , // ✅ from .env
    credentials: true, // ✅ allow cookies across origin
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1", userRouter);
app.use("/api/v1", postRouter);
app.use("/api/v1", commentRouter);

//! admin route
app.use("/api/v1/admin", adminRouter);

///show-cookies
app.get("/show-cookies", (req, res) => {
  return res.json({
    cookies: req.cookies,
  });
});

app.listen(PORT, () => {
  console.log("🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️");
  console.log(`Server is listening on port http://localhost:${PORT} 🟢`);
  console.log("🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️🎟️");
  console.log(FrontedUrl);
});
