import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import CommentBox from "./CommentBox";

const ReplyPopup = ({ post, setIsReplying }) => {
  return (
    <div
      className={`absolute left-0 flex h-[100vh] w-[100vw] bg-[#ffffff9c] dark:bg-[#0000009c] justify-center overflow-y-hidden`}
      onClick={() => {
        setIsReplying(false);
      }}
      style={{ top: `${window.scrollY}px` }}
    >
      <div
        className="bg-white dark:bg-black h-fit shadow-xl !opacity-100 z-10 flex flex-row mt-[80px] p-3 rounded-lg border-[1px] pt-7 pb-10 px-5 dark:border-[#ffffff2a] border-[#0000002a] w-[95vw] md:w-[800px]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className={`flex-col justify-between items-center h-auto gap-1 hidden md:flex ${
            post?.replies?.length > 2 ? "" : "w-[90px]"
          }`}
        >
          <Link to={"/"}>
            <img
              className="border-0 rounded-full h-[45px] w-[45px] md:h-[45px] md:w-[45px] bg-cover bg-center"
              src={post.postedBy.profilePicture}
              alt=""
            />
          </Link>
          <div className="border-[1px] h-full border-black dark:border-white"></div>
          {post?.replies?.length > 2 ? (
            <Link to={"/"} className="flex gap-2">
              <img
                className="border-0 rounded-full h-[25px] w-[25px] bg-cover bg-center relative left-[24px] md:left-[28px]"
                src={post.replies[0].repliedBy.profilePicture}
                alt=""
              />
              <img
                className="border-0 rounded-full h-[25px] w-[25px] bg-cover bg-center relative left-[-23px] md:left-[-20px] bottom-[-28px]"
                src={post.replies[1].repliedBy.profilePicture}
                alt=""
              />
              <img
                className="border-0 rounded-full h-[25px] w-[25px] bg-cover bg-center relative left-[-24px] md:left-[-20px] bottom-[-28px]"
                src={post.replies[2].repliedBy.profilePicture}
                alt=""
              />
            </Link>
          ) : (
            <div>🤯</div>
          )}
        </div>
        <div className="w-full">
          <div className="flex flex-row justify-between align-middle items-center mb-5">
            <Link to={"/"} className="flex flex-row gap-2 md:flex-col md:gap-0">
              <img
                className="border-0 rounded-full h-[35px] md:hidden w-[35px] md:h-[45px] md:w-[45px] bg-cover bg-center"
                src={post.postedBy.profilePicture}
                alt=""
              />
              <div>
                <p className="flex flex-row items-center gap-1 font-extrabold cursor-pointer hover:underline">
                  {post.postedBy.username}
                  <span>
                    <MdVerified color="#0096FF" />
                  </span>
                </p>
                <p className="text-xs md:text-sm">
                  Replying to{" "}
                  <Link
                    to={`/${post.postedBy.username}`}
                    className="text-blue-600"
                  >
                    @{post.postedBy.username}
                  </Link>
                </p>
              </div>
            </Link>
            <div className="flex flex-row gap-4 mt-3 font-thin text-[15px] opacity-75 items-center">
              <p>1d</p>
              <BsThreeDots />
            </div>
          </div>
          <Link>
            <p className="mt-2 font-light text-sm md:mb-20 mb-8">
              {post.content}
            </p>
          </Link>
          <CommentBox
            placeholder="Send a reply..."
            postID={post?._id}
            setIsReplying={setIsReplying}
          />
        </div>
      </div>
    </div>
  );
};

export default ReplyPopup;
