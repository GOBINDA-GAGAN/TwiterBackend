import React from "react";
import StoryHighlight from "./StoryHighlight";
import { FiPlus } from "react-icons/fi";

const Profile = () => {
  return (
    <div className="w-full p-4 space-y-4">
      {/* Profile Image and Basic Info */}
      <div className="flex flex-col items-center text-center gap-2">
        <img
          src="https://res.cloudinary.com/donigot3r/image/upload/v1752063549/Threads_Clone/Profiles/gsgrmk1oxsikvjwworav.jpg"
          alt="Gobinda Gagan Dey"
          className="h-20 w-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-lg font-semibold">Gobinda Gagan Dey</h1>
          <h4 className="text-sm text-gray-500">@gobinda_gagan</h4>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-around text-center font-semibold">
        <div>
          <p className="text-sm">300</p>
          <p className="text-xs text-gray-500">Posts</p>
        </div>
        <div>
          <p className="text-sm">12.4k</p>
          <p className="text-xs text-gray-500">Followers</p>
        </div>
        <div>
          <p className="text-sm">453</p>
          <p className="text-xs text-gray-500">Following</p>
        </div>
      </div>

      {/* Bio */}
      <div className="text-sm space-y-1 px-1 text-center">
        <p className="font-semibold">I am Alok 😊</p>
        <p className="text-gray-600">UI Designer | Traveler | Blogger</p>
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
