import React, { useState } from "react";
import { PiDotsThreeCircle, PiInstagramLogoLight } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import { useSelector } from "react-redux";
import axios from "axios";
import { IoSettingsOutline } from "react-icons/io5";

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
        console.log(res.data);
        if (res.data.message === "User followed") {
          setFollowUnfollowBtnVal("Unfollow");
        } else if (res.data.message === "User unfollowed") {
          setFollowUnfollowBtnVal("Follow");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message || "An error occurred.");
        navigate("/");
      });
    console.log(followUnfollowBtnVal);
  };

  return (
    <div className="flex flex-col m-auto md:w-auto mt-10 w-[90vw]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="md:text-4xl text-2xl font-extrabold">
            {userProfile?.firstName + " " + userProfile?.lastName}
          </h1>
          <p className="font-light opacity-80 md:text-md text-sm">
            @{userProfile?.username}
          </p>
          {user && (
            <div
              className={`md:text-md mt-10 text-sm select-none ${
                userProfile?._id === user?._id ? "hidden" : ""
              }
        cursor-pointer dark:hover:bg-gray-950 text-center dark:hover:border-gray-800 bg-[#e3e3e3] hover:bg-[#cfcfcf] h-fit w-[100px] dark:bg-gray-900 dark:border-gray-700 border-[1px] px-[8px] py-[8px] md:px-[8px] md:py-[8px] rounded-lg`}
              onClick={() => {
                followUnfollowUser(userProfile?._id);
              }}
            >
              {followUnfollowBtnVal !== null
                ? followUnfollowBtnVal
                : userProfile?.followers.includes(user?._id)
                ? "Unfollow"
                : "Follow"}
            </div>
          )}
        </div>
        <img
          className="border-0 rounded-full md:h-[100px] md:w-[100px] h-[80px] w-[80px] bg-cover bg-center"
          src={userProfile?.profilePicture}
          alt=""
        />
      </div>
      <p className="md:my-5 my-5 md:text-md text-sm">
        {userProfile?.bio || (
          <span className="opacity-50">Write something in your bio 😉</span>
        )}
      </p>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4">
          <p
            className="font-semibold opacity-50 md:text-md text-sm cursor-pointer hover:text-gray-500"
            onClick={() => {
              setIsUserListOpen(true);
              setUserType("followers");
            }}
          >
            {userProfile?.followers.length} followers
          </p>
          <p
            className="font-semibold opacity-50 md:text-md text-sm cursor-pointer hover:text-gray-500"
            onClick={() => {
              setIsUserListOpen(true);
              setUserType("following");
            }}
          >
            {userProfile?.following.length} following
          </p>
        </div>
        <div className="flex flex-row gap-1">
          {userProfile?._id === user?._id ? (
            <div>
              <IoSettingsOutline
                size={30}
                cursor={"pointer"}
                onClick={() => {
                  setIsSettingsOpen(true);
                }}
                className="hidden md:flex"
              />
              <IoSettingsOutline
                size={25}
                cursor={"pointer"}
                onClick={() => {
                  setIsSettingsOpen(true);
                }}
                className="md:hidden flex"
              />
            </div>
          ) : (
            ""
          )}
          <div className="relative">
            <PiDotsThreeCircle
              size={30}
              cursor={"pointer"}
              className="relative hidden md:flex"
              onClick={() => {
                setIsShareMenuOpen(!isShareMenuOpen);
              }}
            />
            <PiDotsThreeCircle
              size={25}
              cursor={"pointer"}
              className="relative flex md:hidden"
              onClick={() => {
                setIsShareMenuOpen(!isShareMenuOpen);
              }}
            />
            <div
              onClick={() => {
                console.log("copying");
                copy(window.location.href);
                setIsCopied(true);
                setTimeout(() => {
                  setIsShareMenuOpen(false);
                  setIsCopied(false);
                }, 1000);
              }}
              className={`absolute z-50 md:text-md text-sm select-none ${
                isShareMenuOpen ? "" : "hidden"
              } cursor-pointer ${
                isCopied ? "bg-opacity-45 border-none animate-ping" : ""
              } dark:hover:bg-gray-950 text-center dark:hover:border-gray-800 bg-[#e3e3e3] hover:bg-[#cfcfcf] top-8 right-0 w-[100px] dark:bg-gray-900 dark:border-gray-700 border-[1px] px-[8px] py-[8px] md:px-[8px] md:py-[8px] rounded-lg`}
            >
              {isCopied ? "Copied" : "Copy Link"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
