import User from "../models/user.js";

import Post from "../models/post.js";
export const getAllUser = async (req, res) => {
  try {
    const AllUser = await User.find()
      .populate({
        path: "followers",
        select: "username -_id",
      })
      .select("-password")
      .populate({
        path: "threads",
        populate: [
          {
            path: "likes",
          },
          { path: "comments" },
          {
            path: "admin",
          },
        ],
      })
      .populate({ path: "replies", populate: [{ path: "admin" }] })
      .populate({
        path: "rePosts",
        populate: [{ path: "likes" }, { path: "comments" }, { path: "admin" }],
      });

    return res.status(200).json({ User: AllUser });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in get all user- by admin",
      error: error.message || "An unexpected error occurred.",
    });
  }
};

export const deleteAllUser = async (req, res) => {
  try {
    const deleteAllUser = await User.deleteMany();

    return res.status(200).json({
      message: "delete all user",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "delete all user by admin",
      error: error.message || "An unexpected error occurred.",
    });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const allPost = await Post.find();

    return res.status(200).json({
      message: " all post by admin",
      allPost: allPost,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in delete all post- by admin",
      error: error.message,
    });
  }
};
export const deleteAllPost = async (req, res) => {
  try {
    const deleteAllPost = await Post.deleteMany();
    const AllPost = await Post.find();
    if (AllPost.length === 0) {
      return res.status(200).json({
        message: "post not found",
        AllPost,
      });
    }

    return res.status(200).json({
      message: "delete successfully all post by admin",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in delete all post- by admin",
      error: error.message,
    });
  }
};
