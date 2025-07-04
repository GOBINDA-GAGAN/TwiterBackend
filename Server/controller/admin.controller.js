import User from "../models/user.js";

export const getAllUser = async (req, res) => {


  try {

    const AllUser = await User.find();

    return res.status(200).json({ User: AllUser })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in logout !",
      error: error.message || "An unexpected error occurred."
    });

  }

}