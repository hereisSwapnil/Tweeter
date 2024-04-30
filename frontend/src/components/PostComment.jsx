import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import PostAction from "./PostAction";

const PostComment = () => {
  const [liked, setLiked] = useState(false);
  const [isliking, setIsliking] = useState(false);

  return (
    <div>
      <div className="flex flex-row items-start align-start justify-between mt-3 pb-5 border-b-[1px] dark:border-b-[#ffffff2a] border-b-[#0000002a]">
        <div className="flex flex-row align-top items-start gap-3">
          <Link to={"/"}>
            <img
              className="border-0 rounded-full h-[50px] w-[50px] bg-cover bg-center"
              src="https://imgs.search.brave.com/o5HhnkskyqdnCfdF4gjyJ_tQeJV_MBoNDrzSluFzgdA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zLmNh/ZmViYXphYXIuaXIv/aW1hZ2VzL2ljb25z/L2NvbS5vdXRmaXQ3/Lm1vdmluZ2V5ZS5z/d2FtcGF0dGFjay1l/M2FlOGFmOS02Mjg3/LTQ2ZjMtODYwOS00/NmM0MGI1ODMwYWFf/NTEyeDUxMi5wbmc_/eC1pbWc9djEvcmVz/aXplLGhfMjU2LHdf/MjU2LGxvc3NsZXNz/X2ZhbHNlL29wdGlt/aXpl"
              alt=""
            />
          </Link>
          <div>
            <Link to={"/"}>
              <p className="flex flex-row items-center gap-1 font-extrabold cursor-pointer hover:underline">
                swampgt
                <span>
                  <MdVerified color="#0096FF" />
                </span>
              </p>
            </Link>
            <p className="mt-2 font-light text-sm">
              Wan't to play a match of Swamp Attack 🐊
            </p>
            <PostAction
              liked={liked}
              setLiked={setLiked}
              isliking={isliking}
              setIsliking={setIsliking}
              size={25}
            />
            <div className="flex flex-row gap-4 mt-3 font-thin text-[15px] opacity-75 items-center">
              <p>801 likes</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-3 font-thin text-[15px] opacity-75 items-center">
          <p>1d</p>
          <BsThreeDots />
        </div>
      </div>
    </div>
  );
};

export default PostComment;
