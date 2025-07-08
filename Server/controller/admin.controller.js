import User from "../models/user.js";

export const getAllUser = async (req, res) => {


  try {

    const AllUser = await User.find().populate("followers").select("-password")
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
      });;

    return res.status(200).json({ User: AllUser })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in logout !",
      error: error.message || "An unexpected error occurred."
    });

  }

}