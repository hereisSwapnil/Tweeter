import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import CommentBox from "./CommentBox";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsReplying,
  setReplyPost,
  setReplyReply,
} from "../app/features/replySlice";

const ReplyPopup = () => {
  const dispatch = useDispatch();
  const { replyPost } = useSelector((state) => state.reply);
  const { replyReply } = useSelector((state) => state.reply);

  if (replyPost) {
    return (
      <div
        className={`absolute flex h-full w-[100vw] md:w-auto left-0 md:left-[-5vw] bg-[#ffffff9c] dark:bg-[#0000009c] justify-center overflow-y-hidden`}
        onClick={() => {
          dispatch(setIsReplying(false));
          dispatch(setReplyPost(null));
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
              replyPost?.replies?.length > 2 ? "" : "w-[90px]"
            }`}
          >
            <Link to={`/${replyPost.postedBy.username}`}>
              <img
                className="border-0 rounded-full h-[45px] w-[45px] md:h-[45px] md:w-[45px] bg-cover bg-center"
                src={replyPost?.postedBy.profilePicture}
                alt=""
              />
            </Link>
            <div className="border-[1px] h-full border-black dark:border-white opacity-25"></div>
            {replyPost?.replies?.length > 2 ? (
              <div to={"/"} className="flex gap-2">
                <img
                  className="border-0 rounded-full h-[25px] w-[25px] bg-cover bg-center relative left-[24px] md:left-[28px]"
                  src={replyPost?.replies[0].repliedBy.profilePicture}
                  alt=""
                />
                <img
                  className="border-0 rounded-full h-[25px] w-[25px] bg-cover bg-center relative left-[-23px] md:left-[-20px] bottom-[-28px]"
                  src={replyPost?.replies[1].repliedBy.profilePicture}
                  alt=""
                />
                <img
                  className="border-0 rounded-full h-[25px] w-[25px] bg-cover bg-center relative left-[-24px] md:left-[-20px] bottom-[-28px]"
                  src={replyPost?.replies[2].repliedBy.profilePicture}
                  alt=""
                />
              </div>
            ) : (
              <div>🤯</div>
            )}
          </div>
          <div className="w-full">
            <div className="flex flex-row justify-between align-middle items-center mb-5">
              <div>
                <img
                  className="border-0 rounded-full h-[35px] md:hidden w-[35px] md:h-[45px] md:w-[45px] bg-cover bg-center"
                  src={replyPost?.postedBy.profilePicture}
                  alt=""
                />
                <div>
                  <div className="flex flex-row items-center gap-1 font-extrabold cursor-pointer hover:underline">
                    <Link to={`/${replyPost?.postedBy.username}`}>
                      {replyPost?.postedBy.username}
                    </Link>
                    <span>
                      <MdVerified color="#0096FF" />
                    </span>
                  </div>
                  <div className="text-xs md:text-sm">
                    Replying to{" "}
                    <Link
                      to={`/${replyPost?.postedBy.username}`}
                      className="text-blue-600"
                    >
                      @{replyPost?.postedBy.username}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-4 mt-3 font-thin text-[15px] opacity-75 items-center">
                <p>1d</p>
                <BsThreeDots />
              </div>
            </div>
            <p className="mt-2 font-light text-sm md:mb-20 mb-8">
              {replyPost?.content}
            </p>
            <CommentBox placeholder="Send a reply..." postID={replyPost?._id} />
          </div>
        </div>
      </div>
    );
  }

  if (replyReply) {
    return (
      <div
        className={`absolute left-0 flex h-[100vh] w-[100vw] bg-[#ffffff9c] dark:bg-[#0000009c] justify-center overflow-y-hidden`}
        onClick={() => {
          dispatch(setIsReplying(false));
          dispatch(setReplyReply(null));
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
              replyReply?.replies?.length > 2 ? "" : "w-[90px]"
            }`}
          >
            <Link to={`/${replyReply?.repliedBy.username}`}>
              <img
                className="border-0 rounded-full h-[45px] w-[45px] md:h-[45px] md:w-[45px] bg-cover bg-center"
                src={replyReply?.repliedBy.profilePicture}
                alt=""
              />
            </Link>
            <div className="border-[1px] h-full border-black dark:border-white"></div>
          </div>
          <div className="w-full">
            <div className="flex flex-row justify-between align-middle items-center mb-5">
              <Link
                to={`/${replyReply?.repliedBy.username}`}
                className="flex flex-row gap-2 md:flex-col md:gap-0"
              >
                <img
                  className="border-0 rounded-full h-[35px] md:hidden w-[35px] md:h-[45px] md:w-[45px] bg-cover bg-center"
                  src={replyReply?.repliedBy.profilePicture}
                  alt=""
                />
                <div>
                  <p className="flex flex-row items-center gap-1 font-extrabold cursor-pointer hover:underline">
                    {replyReply?.repliedBy.username}
                    <span>
                      <MdVerified color="#0096FF" />
                    </span>
                  </p>
                  <p className="text-xs md:text-sm">
                    Replying to{" "}
                    <Link
                      to={`/${replyReply?.repliedBy.username}`}
                      className="text-blue-600"
                    >
                      @{replyReply?.repliedBy.username}
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
                {replyReply?.content}
              </p>
            </Link>
            <CommentBox
              placeholder="Send a reply..."
              replyID={replyReply?._id}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default ReplyPopup;
