import React, { useRef, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FaRegFaceSmile } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";

const AddPostModal = ({ onClose }) => {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [step, setStep] = useState(1);
  const [caption, setCaption] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null); // stores the File object

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setUploadedFile(file);
    }
  };

  const handleSelectClick = () => {
    fileInputRef.current.click();
  };

  const goToNextStep = () => {
    if (selectedImage) setStep(2);
  };

  const goToPreviousStep = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    setIsUploading(true);

    const uploadImageByUser = {
      imageName: uploadedFile.name,
      caption: caption,
    };

    setTimeout(() => {
      setIsUploading(false);
      setIsUploadSuccess(true);

      // Log the original file name
      if (uploadImageByUser) {
        console.log(uploadImageByUser);
      }

      // Auto-close modal after 2s
      setTimeout(() => {
        setIsUploadSuccess(false);
        onClose();
      }, 2000);
    }, 5000);
  };

  const handleEmojiClick = (emojiData) => {
    setCaption((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-3xl text-gray-100 hover:text-gray-200"
      >
        &times;
      </button>

      <div className="bg-white w-[90%]  max-w-4xl rounded-xl p-4 shadow-xl relative flex flex-col min-h-[500px]">
        {isUploadSuccess ? (
          <div className="flex flex-1 items-center justify-center text-center">
            <div>
              <h2 className="text-2xl font-semibold text-green-600">
                ✅ Upload Successful
              </h2>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3 px-4  border-gray-300">
              <div className="flex items-center gap-4">
                {step > 1 && (
                  <button onClick={goToPreviousStep}>
                    <FiArrowLeft className="text-2xl text-gray-700 hover:text-black" />
                  </button>
                )}
                <h2 className="text-lg font-semibold text-center">
                  Create new post
                </h2>
              </div>
              {step === 1 && selectedImage && (
                <button
                  onClick={goToNextStep}
                  className="text-blue-500 font-medium hover:underline"
                >
                  Next
                </button>
              )}
              {step === 2 &&
                (isUploading ? (
                  <p className="text-blue-500 font-medium animate-pulse">
                    Uploading...
                  </p>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Share
                  </button>
                ))}
            </div>

            {/* Modal Content */}
            <div className="flex flex-1 flex-col lg:flex-row">
              {/* Image Preview */}
              <div className="flex-1 p-4 flex items-center justify-center border-gray-300 border-r">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="max-h-[400px] w-auto object-contain rounded-md"
                  />
                ) : (
                  <div className="text-center text-gray-500">No Image</div>
                )}
              </div>

              {/* Caption Area */}
              <div className="w-full lg:w-[300px]">
                <div className="">
                  {step === 1 && (
                    <div
                      className="text-center space-y-4 p-2 m-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        if (file && file.type.startsWith("image/")) {
                          const imageUrl = URL.createObjectURL(file);
                          setSelectedImage(imageUrl);
                          setUploadedFile(file);
                        }
                      }}
                    >
                      <img
                        src={
                          selectedImage
                            ? selectedImage
                            : "/public/image_upload.png"
                        }
                        alt="upload"
                        className="mx-auto w-20 h-20 opacity-80"
                      />
                      <p className="text-gray-700">
                        {selectedImage
                          ? "Image selected"
                          : "Drag photos and videos here"}
                      </p>
                      <button
                        onClick={handleSelectClick}
                        className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Select from computer
                      </button>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>

                <div className="w-full lg:w-[300px]">
                  {step === 2 && (
                    <div div className=" border-b p-5 border-gray-300">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-300" />
                        <p className="font-medium">gobinda_gagan_</p>
                      </div>
                      <textarea
                        value={caption}
                        autoFocus
                        onChange={(e) => setCaption(e.target.value)}
                        rows="5"
                        maxLength={2200}
                        className="w-full p-2 text-lg font-normal text-black  rounded outline-none"
                      />
                      <div className=" flex justify-between relative">
                        <button
                          onClick={() => setShowEmojiPicker((prev) => !prev)}
                        >
                          <FaRegFaceSmile size={20} />
                        </button>
                        <p className="text-sm text-gray-400 text-right">
                          {caption.length}/2200
                        </p>
                        {showEmojiPicker && (
                          <div className="absolute right-4 top-5  h-[300px] z-50">
                            <EmojiPicker
                              onEmojiClick={handleEmojiClick}
                              theme="light"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddPostModal;
