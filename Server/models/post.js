import mongoose from "mongoose";
const postSchema = new mongoose.Schema({

  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
    maxLength: 250,
  },
  media: {
    type: String,
    default: "",
  },
  publicId: {
    type: String,

  },
  likes: [{
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  }],
  comments: [{
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Comment",
  }]
}, { timestamps: true })

export default mongoose.model("Post", postSchema);

