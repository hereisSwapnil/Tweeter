import React, { useState } from "react";
import { PiDotsThreeCircle, PiInstagramLogoLight } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";

const UserHeader = ({ userProfile }) => {
  const navigate = useNavigate();
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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
        </div>
        <img
          className="border-0 rounded-full md:h-[100px] md:w-[100px] h-[80px] w-[80px] bg-cover bg-center"
          src={userProfile?.profilePicture}
          alt=""
        />
      </div>
      <p className="md:my-10 my-5 md:text-md text-sm">
        {userProfile?.bio || (
          <p className="opacity-50">Write something in your bio 😉</p>
        )}
      </p>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4">
          <p className="font-semibold opacity-50 md:text-md text-sm cursor-pointer hover:text-gray-500">
            {userProfile?.followers.length} followers
          </p>
          <p className="font-semibold opacity-50 md:text-md text-sm cursor-pointer hover:text-gray-500">
            {userProfile?.following.length} following
          </p>
        </div>
        <div className="flex flex-row gap-1">
          <Link to={"/"}>
            <PiInstagramLogoLight
              size={30}
              cursor={"pointer"}
              onClick={() => {
                navigate("/");
              }}
              className="hidden md:flex"
            />
            <PiInstagramLogoLight
              size={25}
              cursor={"pointer"}
              onClick={() => {
                navigate("/");
              }}
              className="md:hidden flex"
            />
          </Link>
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
