import React from "react";

const StoryHighlight = () => {
  return (
    <div className="flex items-center justify-center flex-col cursor-pointer">
      <div className="h-14 w-14 rounded-full overflow-hidden">
        <img
          src="https://res.cloudinary.com/donigot3r/image/upload/v1752063549/Threads_Clone/Profiles/gsgrmk1oxsikvjwworav.jpg"
          alt="highlight"
          className="h-full w-full "
        />
      </div>
      <p className="font-semibold text-xs mt-1 w-14 text-center truncate">
    Amazing
  </p>
    </div>
  );
};

export default StoryHighlight;
