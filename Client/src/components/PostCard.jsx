import {
  FiHeart,
  FiMessageCircle,
  FiBookmark,
  FiMoreHorizontal,
} from "react-icons/fi";
import { BiRepost } from "react-icons/bi";


const PostCard = ({
  user,
  location,
  profileImage,
  postImage,
  likedBy,
  likesCount,
  caption,
}) => {
  return (
    <div className="break-inside-avoid">
      <div className="w-full max-w-md bg-white rounded-3xl shadow p-3 mb-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={profileImage}
              alt={user}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h3 className="text-sm font-semibold">{user}</h3>
              <p className="text-xs text-gray-500">{location}</p>
            </div>
          </div>
          <FiMoreHorizontal className="text-xl cursor-pointer" />
        </div>

        {/* Image */}
        <div className="my-3">
          <img
            src={postImage}
            alt="post"
            className="w-full rounded-md object-contain"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-4 text-2xl text-gray-800">
            <FiHeart className="cursor-pointer" />
            <FiMessageCircle className="cursor-pointer" />
            <BiRepost size={25} className="cursor-pointer" />
          </div>
          <FiBookmark className="text-2xl text-gray-800 cursor-pointer" />
        </div>

        {/* Likes */}
        <p className="text-sm mt-2 px-1">
          Liked by <span className="font-semibold">{likedBy}</span> and{" "}
          <span className="font-semibold">{likesCount} others</span>
        </p>

        {/* Caption */}
        <p className="text-sm mt-1 px-1">{caption}</p>
      </div>
      </div>
    
  );
};

export default PostCard;
