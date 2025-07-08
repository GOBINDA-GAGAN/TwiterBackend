import User from "../models/user.js";
import Post from "../models/post.js";
import Comment from "../models/comment.js";
import formidable from "formidable";
import { cloudinary } from "../config/cloudinary.js";

export const addPost = async (req, res) => {
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

      await User.findByIdAndUpdate(req.userId,{$push:{threads:newPost._id}},{new:true})

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

