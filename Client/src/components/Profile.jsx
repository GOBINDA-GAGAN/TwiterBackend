import React from "react";
import StoryHighlight from "./StoryHighlight";
import { FiPlus } from "react-icons/fi";

const Profile = () => {
  return (
    <div className="w-full p-3">
      <div className=" flex items-center justify-center flex-col gap-2 w-full">
        <img
          src="https://res.cloudinary.com/donigot3r/image/upload/v1752063549/Threads_Clone/Profiles/gsgrmk1oxsikvjwworav.jpg"
          alt=""
          srcset=""
          className=" h-20 w-20  rounded-full"
        />
        <div>
          <h1 className="text-lg text-center font-semibold">
            Gobinda Gagan Dey
          </h1>
          <h4 className="text-base text-gray-600 text-center font-semibold">
            @gobinda_gagan
          </h4>
        </div>
        <div className=" flex justify-between font-semibold items-center w-full px-1 text-center mt-2">
          <div>
            <p className="text-sm">300</p>
            <p>Posts</p>
          </div>
          <div>
            <p className="text-sm ">12.4k</p>
            <p>Followers</p>
          </div>
          <div className="text-sm ">
            <p>453</p>
            <p>Following</p>
          </div>
        </div>
      </div>
      <div className="p-1.5">
        <p className="text-sm font-semibold">I am Alok 😊</p>
        <p className="text-base text-gray-600">
          Ui designer | Traveler | Blogger
        </p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Story Highlights</h2>
        <div className="flex items-center gap-3 mt-3 overflow-x-auto scrollbar-hide">
          <div className=" flex items-center justify-center flex-col cursor-pointer">
            <div className="bg-gray-200 h-14 w-14 rounded-full flex items-center justify-center">
              <FiPlus size={25} />
            </div>
            <p className="font-semibold text-xs ">New</p>
          </div>
          <StoryHighlight />
          <StoryHighlight />
          <StoryHighlight />
        </div>
      </div>
    </div>
  );
};

export default Profile;
