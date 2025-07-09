import React from "react";
import PostCard from "../components/PostCard"; // adjust the path based on your project

const MyFeed = () => {
  const posts = [
    {
      user: "Sonya Leena",
      location: "Dubai, UAE",
      profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
      postImage: "https://images.unsplash.com/photo-1751013781739-4f10e714ef53",
      likedBy: "Andrew",
      likesCount: 360,
      caption: "You can never dull my sparkle ✨",
    },
    {
      user: "Adam Addisin",
      location: "Oklahoma, US",
      profileImage: "https://randomuser.me/api/portraits/men/65.jpg",
      postImage: "https://images.unsplash.com/photo-1508672019048-805c876b67e2",
      likedBy: "Nicole",
      likesCount: 540,
      caption:
        "In photography, there is a reality so subtle that it becomes more real than reality.",
    },
    {
      user: "Nicole Segall",
      location: "New Delhi, India",
      profileImage: "https://randomuser.me/api/portraits/women/22.jpg",
      postImage: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
      likedBy: "Ashley",
      likesCount: 278,
      caption: "Bright colors, bright minds 🌈",
    },
    {
      user: "Andrew Dewitt",
      location: "Overland Park, KS",
      profileImage: "https://randomuser.me/api/portraits/men/41.jpg",
      postImage: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1",
      likedBy: "Sonya",
      likesCount: 430,
      caption: "The unexpected moment is always sweeter 📸",
    },
    {
      user: "Michael Gilmore",
      location: "Lawrence, KS",
      profileImage: "https://randomuser.me/api/portraits/men/23.jpg",
      postImage: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913",
      likedBy: "Nicole",
      likesCount: 315,
      caption: "Caught between dreams and golden hour ☀️",
    },
    {
      user: "Damian Efron",
      location: "Birmingham, UK",
      profileImage: "https://randomuser.me/api/portraits/men/54.jpg",
      postImage: "https://images.unsplash.com/photo-1751013781739-4f10e714ef53",
      likedBy: "Ashley",
      likesCount: 289,
      caption: "Wildlife speaks louder than words 🐾",
    },
    {
      user: "Michael Gilmore",
      location: "Lawrence, KS",
      profileImage: "https://randomuser.me/api/portraits/men/23.jpg",
      postImage: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913",
      likedBy: "Nicole",
      likesCount: 315,
      caption: "Caught between dreams and golden hour ☀️",
    },
  ];

  return (
    <div className="overflow-y-auto p-4">
      <div className=" p-4 ">
        <h1 className=" text-2xl font-semibold">Feed</h1>
      </div>
      <div className="columns-1 sm:columns-2 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {posts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

export default MyFeed;
