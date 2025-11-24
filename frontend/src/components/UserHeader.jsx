import React, { useState } from "react";
import { PiDotsThreeCircle } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import { useSelector } from "react-redux";
import axios from "axios";
import { IoSettingsOutline, IoCalendarOutline, IoLinkOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const UserHeader = ({
  userProfile,
  setIsSettingsOpen,
  setIsUserListOpen,
  setUserType,
}) => {
  const navigate = useNavigate();
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const [followUnfollowBtnVal, setFollowUnfollowBtnVal] = useState(null);

  const followUnfollowUser = (userID) => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/user/follow-unfollow/${userID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.message === "User followed") {
          setFollowUnfollowBtnVal("Unfollow");
        } else if (res.data.message === "User unfollowed") {
          setFollowUnfollowBtnVal("Follow");
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "An error occurred.");
        navigate("/");
      });
  };

  return (
    <div className="w-full">
      {/* Cover Image Placeholder (Optional - can be added later) */}
      <div className="h-32 md:h-48 bg-gray-200 dark:bg-gray-800 w-full relative"></div>

      <div className="px-4 pb-4 relative">
        {/* Profile Picture & Actions Row */}
        <div className="flex justify-between items-end -mt-16 mb-4">
          <div className="relative">
            <img
              className="w-32 h-32 rounded-full border-4 border-white dark:border-black object-cover bg-white dark:bg-black"
              src={userProfile?.profilePicture}
              alt={userProfile?.username}
            />
          </div>
          
          <div className="flex gap-2 mb-2">
            {userProfile?._id === user?._id ? (
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="px-4 py-1.5 border border-gray-300 dark:border-gray-600 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Edit profile
              </button>
            ) : (
              <div className="flex gap-2">
                <div className="relative">
                  <button
                    onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <PiDotsThreeCircle size={20} />
                  </button>
                  {isShareMenuOpen && (
                    <div
                      onClick={() => {
                        copy(window.location.href);
                        setIsCopied(true);
                        setTimeout(() => {
                          setIsShareMenuOpen(false);
                          setIsCopied(false);
                        }, 1000);
                      }}
                      className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 py-2 z-50 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 text-center text-sm font-medium"
                    >
                      {isCopied ? "Copied!" : "Copy Link"}
                    </div>
                  )}
                </div>
                {user && (
                  <button
                    onClick={() => followUnfollowUser(userProfile?._id)}
                    className={`px-4 py-1.5 rounded-full font-bold transition-colors ${
                      (followUnfollowBtnVal === "Unfollow" || (!followUnfollowBtnVal && userProfile?.followers.includes(user?._id)))
                        ? "border border-gray-300 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 hover:border-red-200"
                        : "bg-black dark:bg-white text-white dark:text-black hover:opacity-80"
                    }`}
                  >
                    {followUnfollowBtnVal !== null
                      ? followUnfollowBtnVal
                      : userProfile?.followers.includes(user?._id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="mb-4">
          <h1 className="text-xl font-bold leading-tight">
            {userProfile?.firstName} {userProfile?.lastName}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            @{userProfile?.username}
          </p>
        </div>

        {/* Bio */}
        {userProfile?.bio && (
          <p className="mb-3 text-sm whitespace-pre-wrap">
            {userProfile.bio}
          </p>
        )}

        {/* Metadata (Joined Date, etc - placeholders for now) */}
        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm mb-3">
          <div className="flex items-center gap-1">
            <IoCalendarOutline />
            <span>Joined recently</span>
          </div>
        </div>

        {/* Follow Stats */}
        <div className="flex gap-4 text-sm">
          <button
            onClick={() => {
              setIsUserListOpen(true);
              setUserType("following");
            }}
            className="hover:underline"
          >
            <span className="font-bold text-black dark:text-white">
              {userProfile?.following.length}
            </span>{" "}
            <span className="text-gray-500 dark:text-gray-400">Following</span>
          </button>
          <button
            onClick={() => {
              setIsUserListOpen(true);
              setUserType("followers");
            }}
            className="hover:underline"
          >
            <span className="font-bold text-black dark:text-white">
              {userProfile?.followers.length}
            </span>{" "}
            <span className="text-gray-500 dark:text-gray-400">Followers</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-light-border dark:border-dark-border mt-2">
        <div className="flex-1 text-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer relative py-4">
          <span className="font-bold">Posts</span>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-primary-500 rounded-full"></div>
        </div>
        <div className="flex-1 text-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer py-4 text-gray-500 dark:text-gray-400">
          <span>Replies</span>
        </div>
        <div className="flex-1 text-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer py-4 text-gray-500 dark:text-gray-400">
          <span>Likes</span>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
