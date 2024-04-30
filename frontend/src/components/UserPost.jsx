import React, { useState } from "react";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import PostAction from "./PostAction";

const UserPost = () => {
  const [liked, setLiked] = useState(false);
  const [isliking, setIsliking] = useState(false);

  return (
    <div className="flex flex-row mt-[20px] border-b-[1px] pb-12 dark:border-b-[#ffffff2a] border-b-[#0000002a]">
      <div className="flex flex-col justify-between items-center h-auto gap-1">
        <Link to={"/"}>
          <img
            className="border-0 rounded-full h-[50px] w-[50px] bg-cover bg-center"
            src="https://imgs.search.brave.com/o5HhnkskyqdnCfdF4gjyJ_tQeJV_MBoNDrzSluFzgdA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zLmNh/ZmViYXphYXIuaXIv/aW1hZ2VzL2ljb25z/L2NvbS5vdXRmaXQ3/Lm1vdmluZ2V5ZS5z/d2FtcGF0dGFjay1l/M2FlOGFmOS02Mjg3/LTQ2ZjMtODYwOS00/NmM0MGI1ODMwYWFf/NTEyeDUxMi5wbmc_/eC1pbWc9djEvcmVz/aXplLGhfMjU2LHdf/MjU2LGxvc3NsZXNz/X2ZhbHNlL29wdGlt/aXpl"
            alt=""
          />
        </Link>
        <div className="border-[1px] h-full border-black dark:border-white"></div>
        {/* <div>🤯</div> */}
        <Link to={"/"} className="flex gap-2">
          <img
            className="border-0 rounded-full h-[25px] w-[25px] bg-cover bg-center relative left-[28px]"
            src="https://imgs.search.brave.com/o5HhnkskyqdnCfdF4gjyJ_tQeJV_MBoNDrzSluFzgdA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zLmNh/ZmViYXphYXIuaXIv/aW1hZ2VzL2ljb25z/L2NvbS5vdXRmaXQ3/Lm1vdmluZ2V5ZS5z/d2FtcGF0dGFjay1l/M2FlOGFmOS02Mjg3/LTQ2ZjMtODYwOS00/NmM0MGI1ODMwYWFf/NTEyeDUxMi5wbmc_/eC1pbWc9djEvcmVz/aXplLGhfMjU2LHdf/MjU2LGxvc3NsZXNz/X2ZhbHNlL29wdGlt/aXpl"
            alt=""
          />
          <img
            className="border-0 rounded-full h-[25px] w-[25px] bg-cover bg-center relative left-[-20px] bottom-[-28px]"
            src="https://imgs.search.brave.com/o5HhnkskyqdnCfdF4gjyJ_tQeJV_MBoNDrzSluFzgdA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zLmNh/ZmViYXphYXIuaXIv/aW1hZ2VzL2ljb25z/L2NvbS5vdXRmaXQ3/Lm1vdmluZ2V5ZS5z/d2FtcGF0dGFjay1l/M2FlOGFmOS02Mjg3/LTQ2ZjMtODYwOS00/NmM0MGI1ODMwYWFf/NTEyeDUxMi5wbmc_/eC1pbWc9djEvcmVz/aXplLGhfMjU2LHdf/MjU2LGxvc3NsZXNz/X2ZhbHNlL29wdGlt/aXpl"
            alt=""
          />
          <img
            className="border-0 rounded-full h-[25px] w-[25px] bg-cover bg-center relative left-[-20px] bottom-[-28px]"
            src="https://imgs.search.brave.com/o5HhnkskyqdnCfdF4gjyJ_tQeJV_MBoNDrzSluFzgdA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zLmNh/ZmViYXphYXIuaXIv/aW1hZ2VzL2ljb25z/L2NvbS5vdXRmaXQ3/Lm1vdmluZ2V5ZS5z/d2FtcGF0dGFjay1l/M2FlOGFmOS02Mjg3/LTQ2ZjMtODYwOS00/NmM0MGI1ODMwYWFf/NTEyeDUxMi5wbmc_/eC1pbWc9djEvcmVz/aXplLGhfMjU2LHdf/MjU2LGxvc3NsZXNz/X2ZhbHNlL29wdGlt/aXpl"
            alt=""
          />
        </Link>
      </div>
      <div className="w-full">
        <div className="flex flex-row justify-between align-middle items-center">
          <Link to={"/"}>
            <p className="flex flex-row items-center gap-1 font-extrabold cursor-pointer hover:underline">
              swampgt
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
          <p className="mt-2 font-light text-sm">
            Wan't to play a match of Swamp Attack 🐊
          </p>
          <img
            className="border-0 rounded-lg w-full bg-cover bg-center mt-2"
            src="https://imgs.search.brave.com/h87T6we-Gx-kTfvJOYAFkfbw881YOttGt335GEnuHyU/rs:fit:860:0:0/g:ce/aHR0cDovL3d3dy5l/bXVsYXRvcnBjLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAx/OC8wNS9zd2FtcGF0/dGFja19zMi5qcGc"
            alt=""
          />
          <PostAction
            liked={liked}
            setLiked={setLiked}
            isliking={isliking}
            setIsliking={setIsliking}
            size={35}
          />
          <div className="flex flex-row gap-4 mt-3 font-thin text-[15px] opacity-75 items-center">
            <p>238 replies</p>
            <p>-</p>
            <p>801 likes</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserPost;
