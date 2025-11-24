import React, { useState } from "react";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import PostAction from "./PostAction";
import { useDispatch, useSelector } from "react-redux";
import { convertPostDate } from "../utils/convertPostDate";
import copy from "copy-to-clipboard";
import { setIsReplying, setReplyPost } from "../app/features/replySlice";

const UserPost = ({ post, isCommentVisible }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(post.likes.includes(user._id));
  const [isLiking, setIsLiking] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const clickReplyPost = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setReplyPost(post));
    dispatch(setIsReplying(true));
  };

  const renderImages = () => {
    const displayedImages = post.images.slice(0, 4);
    const extraImagesCount = post.images.length - 4;

    return (
      <div className="grid grid-cols-2 gap-2 mt-3 rounded-xl overflow-hidden">
        {displayedImages.map((image, index) => (
          <div key={index} className="relative w-full aspect-square">
            <img
              src={image.url}
              alt={`Uploaded ${index}`}
              className={`w-full h-full object-cover hover:opacity-90 transition-opacity duration-200 ${
                extraImagesCount > 0 && index == displayedImages.length - 1
                  ? "opacity-50"
                  : ""
              }`}
            />
            {extraImagesCount > 0 && index == displayedImages.length - 1 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <span className="text-2xl font-bold text-white">
                  +{extraImagesCount}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="border-b border-light-border dark:border-dark-border hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-200 cursor-pointer">
      <div className="flex gap-4 p-4">
        {/* Avatar Column */}
        <div className="flex-shrink-0">
          <Link to={`/${post.postedBy.username}`} onClick={(e) => e.stopPropagation()}>
            <img
              className="w-12 h-12 rounded-full object-cover hover:opacity-80 transition-opacity"
              src={post.postedBy.profilePicture}
              alt={post.postedBy.username}
            />
          </Link>
        </div>

        {/* Content Column */}
        <div className="flex-grow min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 text-sm group">
              <Link 
                to={`/${post.postedBy.username}`} 
                className="font-bold text-black dark:text-white hover:underline truncate"
                onClick={(e) => e.stopPropagation()}
              >
                {post.postedBy.firstName} {post.postedBy.lastName}
              </Link>
              {post.postedBy.isVerified && <MdVerified className="text-primary-500" />}
              <span className="text-gray-500 dark:text-gray-400 truncate">@{post.postedBy.username}</span>
              <span className="text-gray-500 dark:text-gray-400">·</span>
              <span className="text-gray-500 dark:text-gray-400 hover:underline">
                {convertPostDate(post.createdAt)}
              </span>
            </div>
            
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsShareMenuOpen(!isShareMenuOpen);
                }}
                className="p-2 -mr-2 text-gray-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-full transition-colors"
              >
                <BsThreeDots />
              </button>
              
              {isShareMenuOpen && (
                <div className="absolute right-0 top-8 z-20 w-32 bg-white dark:bg-black border border-light-border dark:border-dark-border rounded-xl shadow-xl py-1 overflow-hidden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copy(`${window.location.origin}/${post.postedBy.username}/${post._id}`);
                      setIsCopied(true);
                      setTimeout(() => {
                        setIsShareMenuOpen(false);
                        setIsCopied(false);
                      }, 1000);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {isCopied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Post Content */}
          <Link to={`/${post.postedBy.username}/${post._id}`} className="block">
            <p className="text-black dark:text-white text-[15px] whitespace-pre-wrap mb-3">
              {post.content}
            </p>
            
            {post.images.length > 0 && (
              <div className="mb-3">
                {post.images.length > 1 ? (
                  renderImages()
                ) : (
                  <div className="rounded-xl overflow-hidden border border-light-border dark:border-dark-border">
                    <img
                      className="w-full max-h-[500px] object-cover hover:opacity-95 transition-opacity"
                      src={post.images[0].url}
                      alt=""
                    />
                  </div>
                )}
              </div>
            )}
          </Link>

          {/* Actions */}
          <div className="flex justify-between max-w-md mt-1">
            <PostAction
              id={post._id}
              liked={liked}
              setLiked={setLiked}
              isLiking={isLiking}
              setIsLiking={setIsLiking}
              size={20}
              clickReplyPost={clickReplyPost}
              isCommentVisible={isCommentVisible}
              isPost={true}
              replyCount={post.replies?.length}
              likeCount={post.likes?.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
