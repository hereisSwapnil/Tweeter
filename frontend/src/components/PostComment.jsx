import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import PostAction from "./PostAction";
import { convertPostDate } from "../utils/convertPostDate";
import copy from "copy-to-clipboard";

const PostComment = ({ reply }) => {
  const [liked, setLiked] = useState(false);
  const [isliking, setIsliking] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div>
      <div className="flex flex-row items-start align-start justify-between mt-3 pb-5 border-b-[1px] dark:border-b-[#ffffff2a] border-b-[#0000002a]">
        <div className="flex flex-row align-top items-start gap-3">
          <Link to={"/"}>
            <img
              className="border-0 rounded-full h-[45px] w-[45px] bg-cover bg-center"
              src={reply.repliedBy.profilePicture}
              alt=""
            />
          </Link>
          <div>
            <Link to={"/"}>
              <p className="flex flex-row items-center gap-1 font-extrabold cursor-pointer hover:underline">
                {reply.repliedBy.username}
                <span>
                  <MdVerified color="#0096FF" />
                </span>
              </p>
            </Link>
            <p className="mt-2 font-light text-sm">{reply.content}</p>
            <PostAction
              liked={liked}
              setLiked={setLiked}
              isliking={isliking}
              setIsliking={setIsliking}
              size={25}
            />
            <div className="flex flex-row mt-3 font-thin text-[15px] opacity-75 items-start">
              {/* <p>
                {reply?.length > 0 ? `${reply?.length} replies` : ""}
              </p>
              {(post.replies.length > 0 && post.likes.length) > 0 ? (
                <p className="mx-3">-</p>
              ) : (
                <p></p>
              )} */}
              <p>
                {reply.likes?.length > 0 ? `${reply.likes?.length} likes ` : ""}
              </p>
            </div>
            {/* <div className="flex flex-row gap-3 mt-3 font-thin md:text-[15px] text-sm opacity-75 items-center">
              <p>801 replies</p>
              <p>-</p>
              <p>21 likes</p>
            </div> */}
          </div>
        </div>
        <div className="flex relative flex-row gap-4 mt-3 font-thin text-[15px] items-center">
          <p className="opacity-75">{convertPostDate(reply.createdAt)}</p>
          <BsThreeDots
            className="relative flex opacity-75"
            onClick={() => {
              setIsShareMenuOpen(!isShareMenuOpen);
            }}
          />
          <div
            onClick={() => {
              console.log("copying");
              copy(
                window.location.origin +
                  `/${post.postedBy.username}/${post._id}`
              );
              setIsCopied(true);
              setTimeout(() => {
                setIsShareMenuOpen(false);
                setIsCopied(false);
              }, 1000);
            }}
            className={`absolute z-10 md:text-md text-sm select-none ${
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
  );
};

export default PostComment;
