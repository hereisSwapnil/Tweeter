import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import PostAction from "./PostAction";
import { convertPostDate } from "../utils/convertPostDate";
import copy from "copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { setIsReplying, setReplyReply } from "../app/features/replySlice";
import axios from "axios";

const PostComment = ({ reply, post, username }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(reply.likes.includes(user._id));
  const [isLiking, setIsLiking] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);

  const ReplyaReply = () => {
    dispatch(setIsReplying(true));
    dispatch(setReplyReply(reply));
  };

  const fetchReplies = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/post/reply/replies/${reply?._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      setReplies(response.data);
      setShowReplies(true);
    } catch (error) {
      console.error("Error fetching replies", error);
    }
  };

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
            <p className="mt-2 font-light text-sm">
              {username && (
                <span className="text-blue-500 mr-2 cursor-pointer hover:underline">
                  @ {username}
                </span>
              )}
              {reply.content}
            </p>
            <PostAction
              liked={liked}
              setLiked={setLiked}
              isLiking={isLiking}
              setIsLiking={setIsLiking}
              size={25}
              isReply={true}
              id={post?._id}
              replyId={reply?._id}
              ReplyaReply={ReplyaReply}
            />
            <div className="flex flex-row mt-3 font-thin text-[15px] opacity-75 items-start">
              <p>
                {reply.likes?.length > 0 ? `${reply.likes?.length} likes ` : ""}
              </p>
            </div>
            {reply?.replies?.length > 0 && !showReplies && (
              <div className="mt-2">
                <button
                  onClick={fetchReplies}
                  className="text-blue-500 hover:underline"
                >
                  View {reply.replies.length} replies
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex relative flex-row gap-4 mt-3 font-thin text-[15px] items-center">
          <p className="opacity-75">{convertPostDate(reply.createdAt)}</p>
          <BsThreeDots
            className="relative flex opacity-75 cursor-pointer"
            onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
          />
          <div
            onClick={() => {
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
      {showReplies &&
        replies.map((reply_) => (
          <PostComment
            key={reply_._id}
            username={reply.repliedBy.username}
            reply={reply_}
          />
        ))}
    </div>
  );
};

export default PostComment;
