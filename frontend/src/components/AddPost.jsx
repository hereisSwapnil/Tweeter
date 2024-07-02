import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { CiImageOn } from "react-icons/ci";
import { setLoading } from "../app/features/loadingSlice";
import axios from "axios";

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
        console.log(res.data.message);
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

  const renderImages = () => {
    const displayedImages = imagePaths.slice(0, 4);
    const extraImagesCount = imagePaths.length - 4;

    if (imagePaths.length === 1) {
      return (
        <div className="flex justify-center">
          <div className="relative w-full mb-2">
            <img
              src={imagePaths[0]}
              alt="Uploaded 0"
              className="border-0 rounded-lg w-full max-h-[400px] object-cover"
            />
            <span
              onClick={() => {
                setImages([]);
                setImagePaths([]);
              }}
              className="bg-black absolute text-white font-bold text-md opacity-45 px-2.5 py-1 z-20 cursor-pointer m-1 rounded-full hover:opacity-70 top-0 right-0"
            >
              X
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="relative grid grid-cols-2 gap-2">
        {displayedImages.map((imagePath, index) => (
          <div key={index} className={`relative w-full mb-2`}>
            <img
              src={imagePath}
              alt={`Uploaded ${index}`}
              className={`border-0 rounded-lg cursor-pointer w-full h-[200px] object-cover ${
                extraImagesCount > 0 && index == displayedImages.length - 1
                  ? "opacity-20"
                  : ""
              }`}
            />
            {extraImagesCount > 0 && index == displayedImages.length - 1 && (
              <div className="absolute top-[50%] right-[50%] z-10">
                <span className="text-lg font-bold text-white z-30">
                  +{extraImagesCount}
                </span>
              </div>
            )}
            <span
              onClick={() => {
                setImages((prevImages) =>
                  prevImages.filter((_, i) => i !== index)
                );
                setImagePaths((prevPaths) =>
                  prevPaths.filter((_, i) => i !== index)
                );
              }}
              className="bg-black absolute text-white font-bold text-md opacity-45 px-2.5 py-1 z-20 cursor-pointer m-1 rounded-full hover:opacity-70 top-0 right-0"
            >
              X
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-black h-fit !opacity-100 z-10 flex flex-row mt-0 p-3 rounded-lg pt-7 pb-10 px-5">
      <div className="w-full">
        <div className="flex flex-row justify-between align-middle items-center mb-5">
          <Link to={"/"} className="flex flex-row gap-2">
            <img
              className="border-0 rounded-full h-[35px] w-[35px] md:h-[45px] md:w-[45px] bg-cover bg-center"
              src={user?.profilePicture}
              alt=""
            />
            <p className="flex flex-row items-center gap-1 font-extrabold cursor-pointer hover:underline">
              {user.username}
              <span>
                <MdVerified color="#0096FF" />
              </span>
            </p>
          </Link>
          <div className="flex flex-row gap-4 mt-3 font-thin text-[15px] opacity-75 items-center">
            <p>1d</p>
            <BsThreeDots />
          </div>
        </div>
        <Link>
          <p className="mt-2 font-light text-sm mb-0 w-auto break-all">
            {watch().content}
          </p>
        </Link>
        {imagePaths.length > 0 && renderImages()}
        <hr />
        <CiImageOn
          className="my-2 cursor-pointer"
          size={25}
          color="ffffff30"
          onClick={() => document.getElementById("imageInput").click()}
        />
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          className="hidden"
          multiple
          onChange={handleImageUpload}
        />
        <form
          onSubmit={handleSubmit(post)}
          className="flex flex-row py-3 border-b-[1px] border-t-[1px] gap-4 justify-between md:text-md text-sm dark:border-b-[#ffffff2a] border-b-[#0000002a] dark:border-t-[#ffffff2a] border-t-[#0000002a] align-middle items-center"
        >
          <div className="flex flex-row w-[80%] gap-4">
            <label htmlFor="comment">👋</label>
            <input
              type="text"
              name="comment"
              className="w-full appearance-none border-none bg-transparent focus:outline-0"
              placeholder="Add content..."
              {...register("content", { required: "Content cannot be empty" })}
            />
          </div>
          <button
            className="dark:bg-[#ffffff1c] md:text-md text-sm bg-[#0000001c] hover:bg-[#00000030] dark:hover:bg-[#ffffff30] px-3 py-2 rounded-lg cursor-pointer"
            type="submit"
          >
            Add Post
          </button>
        </form>
        {errors.content && (
          <span className="text-red-600 text-sm">{errors.content.message}</span>
        )}
      </div>
    </div>
  );
};

export default AddPost;
