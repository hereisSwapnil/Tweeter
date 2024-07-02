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

  const clickReplyPost = () => {
    dispatch(setReplyPost(post));
    dispatch(setIsReplying(true));
  };

  const renderImages = () => {
    const displayedImages = post.images.slice(0, 4);
    const extraImagesCount = post.images.length - 4;

    return (
      <div className="grid grid-cols-2 gap-2 mt-2">
        {displayedImages.map((image, index) => (
          <div key={index} className="relative w-full mb-2">
            <img
              src={image.url}
              alt={`Uploaded ${index}`}
              className={`border-0 rounded-lg cursor-pointer w-full h-[200px] object-cover ${
                extraImagesCount > 0 && index == displayedImages.length - 1
                  ? "opacity-20"
                  : ""
              }`}
            />
            {extraImagesCount > 0 && index == displayedImages.length - 1 && (
              <div className="absolute top-[50%] right-[50%] z-10">
                <span className="text-lg font-bold text-white z-30">
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
    <div className="flex flex-row mt-[20px] border-b-[1px] pb-12 dark:border-b-[#ffffff2a] border-b-[#0000002a] w-[95vw] md:w-auto">
      <div
        className={`flex flex-col justify-between items-center h-auto gap-1 ${
          post?.replies?.length > 2 ? "" : "w-[90px]"
        }`}
      >
        <Link to={`/${post.postedBy.username}`}>
          <img
            className="border-0 rounded-full h-[45px] w-[45px] md:h-[45px] md:w-[45px] bg-cover bg-center"
            src={post.postedBy.profilePicture}
            alt=""
          />
        </Link>
        <div className="border-[1px] h-full border-black dark:border-white opacity-25"></div>
        {post?.replies?.length > 2 ? (
          <Link to={`/${post.postedBy.username}`} className="flex gap-2">
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
        <div className="flex flex-row justify-between align-middle items-center">
          <Link to={`/${post.postedBy.username}`}>
            <p className="flex flex-row items-center gap-1 font-extrabold cursor-pointer hover:underline">
              {post.postedBy.username}
              <span>
                <MdVerified color="#0096FF" />
              </span>
            </p>
          </Link>
          <div className="flex relative flex-row gap-4 mt-3 font-thin text-[15px] items-center">
            <p className="opacity-75">{convertPostDate(post.createdAt)}</p>
            <BsThreeDots
              className="relative flex opacity-75 cursor-pointer"
              onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
            />
            <div
              onClick={() => {
                copy(
                  `${window.location.origin}/${post.postedBy.username}/${post._id}`
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
        <Link to={`/${post.postedBy.username}/${post._id}`}>
          <p className="mt-2 font-light text-sm">{post.content}</p>
          {post.images.length > 0 ? renderImages() : null}
        </Link>
        <div className="hidden md:flex">
          <PostAction
            id={post._id}
            liked={liked}
            setLiked={setLiked}
            isLiking={isLiking}
            setIsLiking={setIsLiking}
            size={35}
            clickReplyPost={clickReplyPost}
            isCommentVisible={isCommentVisible}
            isPost={true}
          />
        </div>
        <div className="md:hidden flex">
          <PostAction
            id={post._id}
            liked={liked}
            setLiked={setLiked}
            isLiking={isLiking}
            setIsLiking={setIsLiking}
            size={30}
            clickReplyPost={clickReplyPost}
            isCommentVisible={isCommentVisible}
            isPost={true}
          />
        </div>
        <div className="flex flex-row mt-3 font-thin text-[15px] opacity-75 items-start">
          <p>
            {post?.replies?.length > 0
              ? `${post?.replies?.length} replies`
              : ""}
          </p>
          {(post.replies.length > 0 && post.likes.length) > 0 ? (
            <p className="mx-3">-</p>
          ) : (
            <p></p>
          )}
          <p>
            {post?.likes?.length > 0 ? `${post?.likes?.length} likes ` : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
