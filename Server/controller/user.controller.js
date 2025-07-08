import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Post from "../models/post.js";
import Comment from "../models/comment.js";

import formidable from "formidable";
import { cloudinary } from "../config/cloudinary.js";

export const signIn = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // 1. Validation
    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    // 3. Hash password
    const hashPassword = await bcryptjs.hash(password, 10);

    // 4. Create user
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    if (!newUser) {
      return res.status(500).json({
        success: false,
        message: "User creation failed",
      });
    }

    // 5. Generate JWT token
    const accessToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // 6. Set cookie
    res.cookie("token", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // 7. Send response
    return res.status(201).json({
      success: true,
      message: "Sign-up successful",
      user: {
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    return res.status(500).json({
      success: false,
      message: "Error in sign-in!",
      error: error.message || "An unexpected error occurred.",
    });
  }
};

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcryptjs.compare(password, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("token", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      success: true,
      message: "Sign-in successful",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in sign-up !",
      error: error.message || "An unexpected error occurred.",
    });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password")
      .populate({
        path: "threads",
        populate: [
          {
            path: "likes",
          },
          { path: "comments" },
        ],
      });
    return res.status(200).json({
      message: `welcome ${user.username}`,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error getting profile",
      error: error.message || "An unexpected error occurred.",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in logout !",
      error: error.message || "An unexpected error occurred.",
    });
  }
};

export const profileById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "id is required",
      });
    }

    const user = await User.findById(id)
      .select("-password")
      .populate("followers")
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

    if (!user) {
      return res.status(400).json({
        message: "user is  not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in user profileById",
      error: error.message || "An unexpected error occurred.",
    });
  }
};

export const followUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const targetUser = await User.findById(id);

    if (!targetUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const currentUserId = req.userId; // Assuming this is added by auth middleware

    // If already following, unfollow
    if (targetUser.followers.includes(currentUserId)) {
      await User.findByIdAndUpdate(id, {
        $pull: { followers: currentUserId },
      });

      return res.status(200).json({
        message: `Unfollowed ${targetUser.username}`,
      });
    }

    // Otherwise, follow
    await User.findByIdAndUpdate(id, {
      $addToSet: { followers: currentUserId }, // prevents duplicate entries
    });

    return res.status(200).json({
      message: `Followed ${targetUser.username}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in followUser",
      error: error.message || "An unexpected error occurred.",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userExist = await User.findById(req.userId);

    if (!userExist) {
      return res.status(400).json({
        status: false,
        message: "no user found",
      });
    }

    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).json({
          message: "error in  formidable",
          err: err,
        });
      }
      if (fields.text) {
        await User.findByIdAndUpdate(
          req.userId,
          {
            bio: fields.text,
          },
          { new: true }
        );
      }

      if (files.media) {
        if (userExist.publicId) {
          try {
            const result = await cloudinary.uploader.destroy(
              userExist.publicId,
              { invalidate: true }
            );
          } catch (err) {
            console.error(err);
          }
        }

        const uploadedImage = await cloudinary.uploader.upload(
          files.media.filepath,

          { folder: "Threads_Clone/Profiles" }
        );
        if (!uploadedImage) {
          return res.status(400).json({
            message: "Error in uploaded profile !",
          });
        }
        await User.findByIdAndUpdate(
          req.userId,
          {
            profilePicture: uploadedImage.secure_url,
            publicId: uploadedImage.public_id,
          },
          { new: true }
        );
      }
      return res.status(200).json({
        message: "profile update successfully",
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in updateUser",
      error: error.message || "An unexpected error occurred.",
    });
  }
};

export const searchUser = async (req, res) => {
  try {
    const { query } = req.params;
    const users = await User.find({
      $or: [
        {
          username: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    });

    if (users.length === 0) {
      return res.status(200).json({
        message: "no user  found",
      });
    }
    return res.status(200).json({
      message: "search  user ",
      search_user: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in search",
      error: error.message || "An unexpected error occurred.",
    });
  }
};
