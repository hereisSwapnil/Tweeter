import React, { useState } from "react";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { CiImageOn } from "react-icons/ci";
import { setLoading } from "../app/features/loadingSlice";
import axios from "axios";
import { IoCloseCircle } from "react-icons/io5";

const AddPost = () => {
  const user = useSelector((state) => state.auth.user);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [imagePaths, setImagePaths] = useState([]);

  const post = (data) => {
    dispatch(setLoading(true));

    const formData = new FormData();
    formData.append("content", data.content);

    images.forEach((image) => {
      formData.append("images", image);
    });

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/post`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.message === "Post created successfully") {
          reset();
          setImages([]);
          setImagePaths([]);
        }
      })
      .catch((error) => {
        console.error("Error uploading post:", error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePaths((prevPaths) => [...prevPaths, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePaths((prevPaths) => prevPaths.filter((_, i) => i !== index));
  };

  const renderImages = () => {
    return (
      <div className="grid grid-cols-2 gap-2 mt-3 mb-3">
        {imagePaths.map((imagePath, index) => (
          <div key={index} className="relative w-full aspect-square rounded-xl overflow-hidden group">
            <img
              src={imagePath}
              alt={`Uploaded ${index}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-1 transition-all"
            >
              <IoCloseCircle size={24} />
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="border-b border-light-border dark:border-dark-border p-4">
      <div className="flex gap-4">
        <Link to={`/${user.username}`} className="flex-shrink-0">
          <img
            className="w-12 h-12 rounded-full object-cover hover:opacity-80 transition-opacity"
            src={user?.profilePicture}
            alt={user.username}
          />
        </Link>
        
        <div className="flex-grow">
          <form onSubmit={handleSubmit(post)}>
            <textarea
              className="w-full bg-transparent text-xl placeholder-gray-500 text-black dark:text-white border-none focus:ring-0 resize-none min-h-[100px] p-0"
              placeholder="What is happening?!"
              rows="3"
              {...register("content", { required: images.length === 0 })}
            />
            
            {imagePaths.length > 0 && renderImages()}
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-light-border dark:border-dark-border">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => document.getElementById("imageInput").click()}
                  className="p-2 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-full transition-colors"
                >
                  <CiImageOn size={24} />
                </button>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  className="hidden"
                  multiple
                  onChange={handleImageUpload}
                />
              </div>

              <button
                type="submit"
                disabled={!watch("content") && images.length === 0}
                className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Post
              </button>
            </div>
          </form>
          {errors.content && images.length === 0 && (
            <span className="text-red-500 text-sm mt-2 block">Please add some content or an image.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPost;
