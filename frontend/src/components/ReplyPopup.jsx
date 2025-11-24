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
import { IoClose } from "react-icons/io5";

const ReplyPopup = () => {
  const dispatch = useDispatch();
  const { replyPost } = useSelector((state) => state.reply);
  const { replyReply } = useSelector((state) => state.reply);

  const closePopup = () => {
    dispatch(setIsReplying(false));
    dispatch(setReplyPost(null));
    dispatch(setReplyReply(null));
  };

  if (!replyPost && !replyReply) return null;

  const activeReply = replyPost || replyReply;
  const isReplyToReply = !!replyReply;
  const profilePicture = isReplyToReply
    ? activeReply?.repliedBy?.profilePicture
    : activeReply?.postedBy?.profilePicture;
  const username = isReplyToReply
    ? activeReply?.repliedBy?.username
    : activeReply?.postedBy?.username;
  const content = activeReply?.content;
  const replyID = isReplyToReply ? activeReply?._id : null;
  const postID = isReplyToReply ? null : activeReply?._id;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={closePopup}
    >
      <div
        className="bg-white dark:bg-black w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <button
            onClick={closePopup}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors"
          >
            <IoClose size={24} />
          </button>
          <span className="font-bold text-lg">Reply</span>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <img
                src={profilePicture}
                alt={username}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="w-0.5 flex-grow bg-gray-200 dark:bg-gray-800 my-2"></div>
            </div>
            
            <div className="flex-1 pb-8">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold">{username}</span>
                <MdVerified className="text-blue-500" />
                <span className="text-gray-500 text-sm">1d</span>
              </div>
              <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                {content}
              </p>
              <div className="mt-2 text-gray-500 text-sm">
                Replying to <span className="text-blue-500">@{username}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <div className="w-12 flex-shrink-0 flex justify-center">
               {/* Placeholder for user's avatar if we want to show it next to input */}
            </div>
            <div className="flex-1">
               <CommentBox 
                 placeholder="Post your reply" 
                 postID={postID} 
                 replyID={replyID}
                 onSuccess={closePopup}
               />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyPopup;
