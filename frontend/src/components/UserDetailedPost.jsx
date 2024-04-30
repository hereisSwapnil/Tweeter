import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import PostAction from "./PostAction";
import PostComment from "./PostComment";
import CommentBox from "./CommentBox";

const UserDetailedPost = () => {
  const [liked, setLiked] = useState(false);
  const [isliking, setIsliking] = useState(false);

  return (
    <div flex flex-col>
      <div className="border-b-[1px] pb-8 dark:border-b-[#ffffff2a] border-b-[#0000002a]">
        <div className="flex flex-row items-end align-middle justify-between mt-10">
          <div className="flex flex-row align-middle items-center gap-3">
            <Link to={"/"}>
              <img
                className="border-0 rounded-full h-[50px] w-[50px] bg-cover bg-center"
                src="https://imgs.search.brave.com/o5HhnkskyqdnCfdF4gjyJ_tQeJV_MBoNDrzSluFzgdA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zLmNh/ZmViYXphYXIuaXIv/aW1hZ2VzL2ljb25z/L2NvbS5vdXRmaXQ3/Lm1vdmluZ2V5ZS5z/d2FtcGF0dGFjay1l/M2FlOGFmOS02Mjg3/LTQ2ZjMtODYwOS00/NmM0MGI1ODMwYWFf/NTEyeDUxMi5wbmc_/eC1pbWc9djEvcmVz/aXplLGhfMjU2LHdf/MjU2LGxvc3NsZXNz/X2ZhbHNlL29wdGlt/aXpl"
                alt=""
              />
            </Link>
            <Link to={"/"}>
              <p className="flex flex-row items-center gap-1 font-extrabold cursor-pointer hover:underline">
                swampgt
                <span>
                  <MdVerified color="#0096FF" />
                </span>
              </p>
            </Link>
          </div>
          <div className="flex flex-row gap-4 mt-3 font-thin text-[15px] opacity-75 items-center">
            <p>1d</p>
            <BsThreeDots />
          </div>
        </div>
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
      </div>
      <CommentBox />
      <PostComment />
    </div>
  );
};

export default UserDetailedPost;
