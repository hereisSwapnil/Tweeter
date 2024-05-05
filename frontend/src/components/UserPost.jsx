import React, { useState } from "react";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import PostAction from "./PostAction";
import { useSelector } from "react-redux";

const UserPost = ({ post }) => {
  const user = useSelector((state) => state.auth.user);

  const [liked, setLiked] = useState(post.likes.includes(user._id));
  const [isliking, setIsliking] = useState(false);

  return (
    <div className="flex flex-row mt-[20px] border-b-[1px] pb-12 dark:border-b-[#ffffff2a] border-b-[#0000002a] w-[95vw] md:w-auto">
      <div
        className={`flex flex-col justify-between items-center h-auto gap-1 ${
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
        <div className="flex flex-row justify-between align-middle items-center">
          <Link to={"/"}>
            <p className="flex flex-row items-center gap-1 font-extrabold cursor-pointer hover:underline">
              {post.postedBy.username}
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
          <p className="mt-2 font-light text-sm">{post.content}</p>
          <img
            className="border-0 rounded-lg w-full bg-cover bg-center mt-2"
            src={post.image}
            alt=""
          />
          <div className="hidden md:flex">
            <PostAction
              id={post._id}
              liked={liked}
              setLiked={setLiked}
              isliking={isliking}
              setIsliking={setIsliking}
              size={35}
            />
          </div>
          <div className="md:hidden flex">
            <PostAction
              id={post._id}
              liked={liked}
              setLiked={setLiked}
              isliking={isliking}
              setIsliking={setIsliking}
              size={30}
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
        </Link>
      </div>
    </div>
  );
};

export default UserPost;
