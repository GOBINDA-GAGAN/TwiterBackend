import { useState } from "react";

export default function AddPost() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSubmit = () => {
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Add Post Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Post
        </button>
      )}

      {/* Post Form */}
      {showForm && (
        <div className="bg-white shadow-md rounded p-4 mt-4 space-y-4">
          <input
            type="text"
            placeholder="Post Title"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Post Content"
            rows="4"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="flex space-x-2">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Display Posts */}
      <div className="mt-6 space-y-4">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-gray-100 border border-gray-300 rounded p-4"
          >
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-gray-700 mt-1">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
