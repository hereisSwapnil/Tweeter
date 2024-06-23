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
  const [imagePath, setImagePath] = useState(null);
  const [image, setImage] = useState(null);

  const post = (data) => {
    dispatch(setLoading(true));

    const formData = new FormData();
    formData.append("content", data.content);

    if (image) {
      formData.append("image", image);
    }

    console.log(formData);

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
          setImage(null);
          setImagePath(null);
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
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePath(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
        {!image ? <div className="mb-20"></div> : ""}
        {image && (
          <div className="relative">
            <img
              src={imagePath}
              alt="Uploaded"
              className="border-0 rounded-lg w-full bg-cover bg-center mt-2 max-h-[400px]"
            />
            <span
              onClick={() => {
                setImage(null);
                setImagePath(null);
              }}
              className="bg-black absolute text-white font-bold text-lg opacity-45 px-3 py-1 z-20 cursor-pointer m-1 rounded-full hover:opacity-70 top-0 right-0"
            >
              X
            </span>
          </div>
        )}
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
              {...register("content", { required: "Reply cannot be empty" })}
            />
            {errors.content && (
              <span className="text-red-600 text-sm">
                {errors.content.message}
              </span>
            )}
          </div>
          <button
            className="dark:bg-[#ffffff1c] md:text-md text-sm bg-[#0000001c] hover:bg-[#00000030] dark:hover:bg-[#ffffff30] px-3 py-2 rounded-lg cursor-pointer"
            type="submit"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
