import User from "../models/user.js";
import Post from "../models/post.js";
import Comment from "../models/comment.js";
import formidable from "formidable";
import { cloudinary } from "../config/cloudinary.js";
import mongoose from "mongoose";

export const addPost = async (req, res) => {
  const userId = req.userId;
  console.log(userId);

  const userExistOrNot = await User.findById(userId);

  if (!userExistOrNot) {
    return res.status(500).json({
      message: "user not found",
    });
  }

  const form = formidable({});

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: "Error in formidable",
        error: err.message,
      });
    }

    try {
      const post = new Post();

      if (fields.text) {
        post.text = fields.text;
      }

      if (files.media) {
        const uploadedImage = await cloudinary.uploader.upload(
          files.media.filepath,
          { folder: "Threads_Clone/Posts" }
        );

        if (!uploadedImage) {
          return res.status(400).json({
            message: "Error uploading media!",
          });
        }

        post.media = uploadedImage.secure_url;
        post.publicId = uploadedImage.public_id;
      }

      post.admin = req.userId;

      const newPost = await post.save();

      await User.findByIdAndUpdate(
        req.userId,
        { $push: { threads: newPost._id } },
        { new: true }
      );

      return res.status(200).json({
        message: "Post created successfully",
        post: newPost,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error in addPost controller",
        error: error.message,
      });
    }
  });
};

export const getAllPost = async (req, res) => {
  try {
    const { page } = req.query;
    let pageNumber = page;
    if (!page || page === undefined) {
      pageNumber = 1;
    }
    const AllPost = await Post.find()
      .sort({
        createdAt: -1,
      })
      .skip((pageNumber - 1) * 3)
      .limit(3)
      .populate({ path: "likes", select: "-password" });

    if (AllPost.length == 0) {
      return res.status(402).json({
        message: "no post found",
      });
    }

    return res.status(200).json({
      message: "fetch all post",
      AllPost: AllPost,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in getAll post",
      error: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const deletePostId = await Post.findById(postId);

    if (!deletePostId) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const deletePost = await Post.findByIdAndDelete(postId);
    if (deletePost) {
      await cloudinary.uploader.destroy(deletePost.publicId);
    }

    await User.findByIdAndUpdate(
      deletePost.admin,
      {
        $pull: { threads: postId },
      },
      { new: true }
    );
    await Comment.deleteMany({ _id: { $in: deletePost.comments } });

    return res.status(200).json({
      message: "delete post",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in delete post",
      error: error.message,
    });
  }
};

export const like_dislike = async (req, res) => {
  try {
    const { postId } = req.params;
    console.log(postId);

    if (!postId) {
      return res.status(400).json({
        message: "id not found",
      });
    }

    const postExist = await Post.findById(postId);
    if (!postExist) {
      return res.status(400).json({
        message: "post not found",
      });
    }

    if (postExist.likes.includes(req.userId)) {
      await Post.findByIdAndUpdate(
        postId,
        {
          $pull: {
            likes: req.userId,
          },
        },
        { new: true }
      );
      return res.status(201).json({
        message: "post unlike",
      });
    }
    await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          likes: req.userId,
        },
      },
      { new: true }
    );
    return res.status(201).json({
      message: "post like",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "error in like post", error: error.message });
  }
};

export const rePost = async (req, res) => {
  try {
    const findUserid = req.userId;

    const user = await User.findById(findUserid);
    if (!user) {
      return res.status(200).json({
        message: "user not found",
      });
    }

    const { postId } = req.params;
    console.log(postId);

    if (!postId) {
      return res.status(400).json({
        message: "id not found",
      });
    }

    const postExist = await Post.findById(postId);
    if (!postExist) {
      return res.status(400).json({
        message: "post not found",
      });
    }

    const newId = new mongoose.Types.ObjectId(postId);
    if (user.rePosts.includes(newId)) {
      return res.status(400).json({
        message: "this post is already rePost",
      });
    }

    await User.findByIdAndUpdate(
      req.userId,
      {
        $push: { rePosts: postExist._id },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "re post successfully",
    });
  } catch (error) {
    res.status(400).json({ message: "error in rePost", error: error.message });
  }
};

export const singlePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "id is required",
      });
    }

    const post = await Post.findById(id)
      .populate({
        path:"likes",
        select:"username profilePicture "
      })
      .populate({
        path: "admin",
        select: "username profilePicture bio", // 👈 excludes password, email, etc.
      })
      .populate({
        path: "comments",
        populate: {
          path: "admin",
          select: "username profilePicture", // 👈 safe for comment authors too
        },
      });

    if (!post) {
      return res.status(400).json({
        message: "post is  not found",
      });
    }

    return res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(400).json({
      message: " error in singlePost",
      error: error.message,
    });
  }
};
