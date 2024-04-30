import React, { useState } from "react";
import { PiDotsThreeCircle, PiInstagramLogoLight } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

const UserHeader = () => {
  const navigate = useNavigate();
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className="flex flex-col w-auto mt-10">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="text-4xl font-extrabold">Swamp GT</h1>
          <p className="font-light opacity-80">@swampgt</p>
        </div>
        <img
          className="border-0 rounded-full h-[100px] w-[100px] bg-cover bg-center"
          src="https://imgs.search.brave.com/o5HhnkskyqdnCfdF4gjyJ_tQeJV_MBoNDrzSluFzgdA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zLmNh/ZmViYXphYXIuaXIv/aW1hZ2VzL2ljb25z/L2NvbS5vdXRmaXQ3/Lm1vdmluZ2V5ZS5z/d2FtcGF0dGFjay1l/M2FlOGFmOS02Mjg3/LTQ2ZjMtODYwOS00/NmM0MGI1ODMwYWFf/NTEyeDUxMi5wbmc_/eC1pbWc9djEvcmVz/aXplLGhfMjU2LHdf/MjU2LGxvc3NsZXNz/X2ZhbHNlL29wdGlt/aXpl"
          alt=""
        />
      </div>
      <p className="my-10">Esports BGMI Player, 10🏆 and 3🥈</p>
      <div className="flex flex-row justify-between">
        <p className="font-semibold opacity-50">69.9K followers</p>
        <div className="flex flex-row gap-1">
          <Link to={"/"}>
            <PiInstagramLogoLight
              size={30}
              cursor={"pointer"}
              onClick={() => {
                navigate("www.instagram.com");
              }}
            />
          </Link>
          <div className="relative">
            <PiDotsThreeCircle
              size={30}
              cursor={"pointer"}
              className="relative"
              onClick={() => {
                setIsShareMenuOpen(!isShareMenuOpen);
              }}
            />
            <div
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setIsCopied(true);
                setTimeout(() => {
                  setIsShareMenuOpen(false);
                  setIsCopied(false);
                }, 1000);
              }}
              className={`absolute z-10 ${
                isShareMenuOpen ? "" : "hidden"
              } cursor-pointer ${
                isCopied ? "bg-opacity-45 border-none animate-ping" : ""
              } hover:bg-gray-950 hover:border-gray-800 top-10 w-[100px] bg-gray-900 border-gray-700 border-[1px] px-[10px] py-[10px] rounded-lg`}
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
