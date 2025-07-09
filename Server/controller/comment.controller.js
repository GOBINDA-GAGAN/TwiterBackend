import Comment from "../models/comment.js";
import Post from "../models/post.js";
import User from "../models/user.js";

export const addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const { postId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is missing",
      });
    }

    if (!postId) {
      return res.status(400).json({
        message: "Post ID is missing",
      });
    }

    // Create new comment
    const newComment = await Comment.create({
      text: comment,
      admin: userId,
      post: postId,
    });

    // Push comment to post
    await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: newComment._id },
      },
      { new: true }
    );
    await User.findByIdAndUpdate(
     userId,
      {
        $push: { replies: newComment._id },
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment, // return full comment info
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding comment",
      error: error.message || "Something went wrong",
    });
  }
};

