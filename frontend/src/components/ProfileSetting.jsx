import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPageRoute } from "../app/features/pageRouteSlice";
import { useForm } from "react-hook-form";
import axios from "axios";
import { setLoading } from "../app/features/loadingSlice";
import { toast } from "react-toastify";

const ProfileSettings = ({ userProfile, setIsSettingsOpen }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { ...userProfile },
  });

  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePath(reader.result);
      };
      reader.readAsDataURL(file);
      setValue("profilePicture", file);
    }
  };

  const onSubmit = (data) => {
    dispatch(setLoading(true));
    const updatedUserData = new FormData();
    updatedUserData.append("firstName", data.firstName);
    updatedUserData.append("lastName", data.lastName);
    updatedUserData.append("email", data.email);
    updatedUserData.append("username", data.username);
    updatedUserData.append("bio", data.bio);
    updatedUserData.append("image", image);

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/user/update`,
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        dispatch(setPageRoute("profile"));
        setIsSettingsOpen(false);
        toast.success("Profile updated successfully");
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return (
    <div className="flex flex-col m-auto md:w-auto mt-10 w-[90vw]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col justify-start gap-1">
          <label htmlFor="firstName" className="text-md font-semibold">
            First Name <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            className="text-md py-2 px-2 bg-transparent border border-[#0000002a] dark:border-[#ffffff2a] rounded-lg appearance-none focus:outline-none"
            {...register("firstName")}
          />
          {errors.firstName && (
            <span className="text-red-600 text-sm">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col justify-start gap-1">
          <label htmlFor="lastName" className="text-md font-semibold">
            Last Name <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            className="text-md py-2 px-2 bg-transparent border border-[#0000002a] dark:border-[#ffffff2a] rounded-lg appearance-none focus:outline-none"
            {...register("lastName")}
          />
          {errors.lastName && (
            <span className="text-red-600 text-sm">
              {errors.lastName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col justify-start gap-1">
          <label htmlFor="email" className="text-md font-semibold">
            Email <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="email"
            className="text-md py-2 px-2 bg-transparent border border-[#0000002a] dark:border-[#ffffff2a] rounded-lg appearance-none focus:outline-none"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-600 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col justify-start gap-1">
          <label htmlFor="username" className="text-md font-semibold">
            Username <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="username"
            className="text-md py-2 px-2 bg-transparent border border-[#0000002a] dark:border-[#ffffff2a] rounded-lg appearance-none focus:outline-none"
            {...register("username")}
          />
          {errors.username && (
            <span className="text-red-600 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="flex flex-col justify-start gap-1">
          <label htmlFor="bio" className="text-md font-semibold">
            Bio
          </label>
          <textarea
            name="bio"
            className="text-md py-2 px-2 bg-transparent border border-[#0000002a] dark:border-[#ffffff2a] rounded-lg appearance-none focus:outline-none"
            {...register("bio")}
          />
        </div>

        <div className="flex flex-col justify-start gap-1">
          <label htmlFor="profilePicture" className="text-md font-semibold">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            name="profilePicture"
            className="text-md py-2 px-2 bg-transparent border border-[#0000002a] dark:border-[#ffffff2a] rounded-lg appearance-none focus:outline-none"
            onChange={handleImageChange}
          />
          <img
            src={imagePath || userProfile?.profilePicture}
            alt="Profile Preview"
            className="border-0 object-cover rounded-full md:h-[100px] md:w-[100px] h-[80px] w-[80px] bg-cover bg-center mt-4"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
