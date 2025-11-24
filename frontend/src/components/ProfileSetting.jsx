import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPageRoute } from "../app/features/pageRouteSlice";
import { useForm } from "react-hook-form";
import axios from "axios";
import { setLoading } from "../app/features/loadingSlice";
import { toast } from "react-toastify";
import { IoArrowBack, IoCamera } from "react-icons/io5";

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
    if (image) {
      updatedUserData.append("image", image);
    }

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
        // Reload page to reflect changes since we're not updating global state directly here
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        toast.error(err.response?.data?.message || "An error occurred.");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return (
    <div className="w-full">
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-light-border dark:border-dark-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSettingsOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors"
          >
            <IoArrowBack size={20} />
          </button>
          <h2 className="text-xl font-bold">Edit Profile</h2>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          className="bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-full font-bold hover:opacity-80 transition-opacity"
        >
          Save
        </button>
      </div>

      <div className="p-4">
        {/* Cover Image Placeholder */}
        <div className="h-32 md:h-48 bg-gray-200 dark:bg-gray-800 w-full relative mb-16">
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
            <IoCamera className="text-white/80" size={30} />
          </div>
        </div>

        <div className="relative -mt-24 mb-6 px-4">
          <div className="relative inline-block">
            <img
              src={imagePath || userProfile?.profilePicture}
              alt="Profile Preview"
              className="w-28 h-28 rounded-full border-4 border-white dark:border-black object-cover bg-white dark:bg-black"
            />
            <div 
              onClick={() => document.getElementById("profileImageInput").click()}
              className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <IoCamera className="text-white/80" size={24} />
            </div>
            <input
              id="profileImageInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 px-4 pb-20">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-500">First Name</label>
            <input
              type="text"
              className="w-full p-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">{errors.firstName.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-500">Last Name</label>
            <input
              type="text"
              className="w-full p-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
              {...register("lastName")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-500">Bio</label>
            <textarea
              rows="3"
              className="w-full p-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all resize-none"
              {...register("bio")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-500">Location</label>
            <input
              type="text"
              placeholder="Add your location"
              className="w-full p-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-500">Website</label>
            <input
              type="text"
              placeholder="Add your website"
              className="w-full p-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
