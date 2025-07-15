import { useAuth } from "../context/AuthContext";
import StoryHighlight from "./StoryHighlight";
import { FiPlus } from "react-icons/fi";

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading user...</p>;
  if (!user) return <p>No user found. Please log in.</p>; // ✅ prevent crash

  return (
    <div className="w-full p-4 space-y-4">
      {/* Profile Image and Basic Info */}
      <div className="flex flex-col items-center text-center gap-2">
        <img
          src={user.profilePicture}
          alt={user.fullName || "Profile"}
          className="h-20 w-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-lg font-semibold">{user.fullName}</h1>
          <h4 className="text-sm text-gray-500">{user.username}</h4>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-around text-center font-semibold">
        <div className="p-2 cursor-pointer hover:bg-gray-200 bg-gray-100 rounded-xl">
          <p className="text-sm">{user.thread?.length || 0}</p>
          <p className="text-xs text-gray-500">Posts</p>
        </div>
        <div className="p-2 cursor-pointer hover:bg-gray-200 bg-gray-100 rounded-xl">
          <p className="text-sm">{user.followers?.length || 0}</p>
          <p className="text-xs text-gray-500">Followers</p>
        </div>
        <div className="p-2 cursor-pointer hover:bg-gray-200 bg-gray-100 rounded-xl">
          <p className="text-sm">{user.Following?.length || 0}</p>
          <p className="text-xs text-gray-500">Following</p>
        </div>
      </div>

      {/* Bio */}
      <div className="text-sm space-y-1 px-1 text-center">
        <p className="text-gray-600">{user.bio}</p>
      </div>

      {/* Story Highlights */}
      <div className="space-y-2">
        <h2 className="text-base font-semibold">Story Highlights</h2>
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
          {/* Add New Story */}
          <div className="flex flex-col items-center cursor-pointer">
            <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center">
              <FiPlus size={20} />
            </div>
            <p className="text-xs mt-1 font-medium">New</p>
          </div>

          {/* Existing Highlights */}
          <StoryHighlight />
          <StoryHighlight />
          <StoryHighlight />
        </div>
      </div>
    </div>
  );
};

export default Profile;
