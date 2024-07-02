import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import PostAction from "./PostAction";
import PostComment from "./PostComment";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../app/features/loadingSlice";
import copy from "copy-to-clipboard";
import { convertPostDate } from "../utils/convertPostDate";
import CommentBox from "./CommentBox";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

const UserDetailedPost = ({ post, userProfile }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [viewingImages, setViewingImages] = useState(false);

  const [liked, setLiked] = useState(post.likes.includes(user?._id));
  const [isLiking, setIsLiking] = useState(false);
  const [userReplies, setUserReplies] = useState([]);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (user && post) {
      dispatch(setLoading(true));
      if (userProfile) {
        post.replies = post.replies.filter(
          (reply) => reply.repliedBy._id === userProfile._id
        );
      }
      setUserReplies(post.replies);
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 1000);
    }
  }, [post, userProfile, dispatch]);

  const handleCopyLink = () => {
    copy(`${window.location.origin}/${post.postedBy.username}/${post._id}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsShareMenuOpen(false);
      setIsCopied(false);
    }, 1000);
  };

  const renderImages = () => {
    const displayedImages = post.images.slice(0, 4);
    const extraImagesCount = post.images.length - 4;

    return (
      <Gallery id="my-gallery">
        <div className="relative grid grid-cols-2 gap-2">
          {post.images.map((image, index) => (
            <div
              key={index}
              className="relative flex items-center justify-center align-middle"
            >
              <Item
                original={image.url}
                thumbnail={image.url}
                key={index}
                className={`border-0 cursor-pointer rounded-lg object-cover w-auto h-full ${
                  extraImagesCount > 0 && index == displayedImages.length - 1
                    ? "opacity-20"
                    : ""
                }`}
                width={"auto"}
                height={"auto"}
                style={{
                  width: "100%", // Adjust as needed
                  height: "auto", // Adjust as needed
                }}
              >
                {({ ref, open }) => (
                  <img
                    ref={ref}
                    onClick={open}
                    src={image.url}
                    alt=""
                    className={`border-0 cursor-pointer rounded-lg w-full h-[200px] object-cover ${
                      extraImagesCount > 0 &&
                      index == displayedImages.length - 1
                        ? "opacity-20"
                        : ""
                    } ${index < 4 ? "flex" : "hidden"}`}
                  />
                )}
              </Item>
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
      </Gallery>
    );
  };

  return (
    <div className="flex flex-col w-[95vw] md:w-full mx-auto mb-10">
      <div className="border-b-[1px] pb-8 dark:border-b-[#ffffff2a] border-b-[#0000002a]">
        <div className="flex flex-row align-middle justify-between mt-10 items-center">
          <div className="flex flex-row align-middle items-center gap-3">
            <Link to={`/${post.postedBy.username}`}>
              <img
                className="border-0 rounded-full h-[45px] w-[45px] md:h-auto md:w-[45px] bg-cover bg-center"
                src={post.postedBy.profilePicture}
                alt=""
              />
            </Link>
            <Link to={`/${post.postedBy.username}`}>
              <p className="flex flex-row items-center gap-1 font-extrabold cursor-pointer hover:underline">
                {post.postedBy.username}
                <span>
                  <MdVerified color="#0096FF" />
                </span>
              </p>
            </Link>
          </div>
          <div className="flex relative flex-row gap-4 mt-3 font-thin text-[15px] items-center">
            <p className="opacity-75">{convertPostDate(post.createdAt)}</p>
            <BsThreeDots
              className="relative flex opacity-75 cursor-pointer"
              onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
            />
            <div
              className={`absolute z-10 md:text-md text-sm select-none ${
                isShareMenuOpen ? "" : "hidden"
              } cursor-pointer ${
                isCopied ? "bg-opacity-45 border-none animate-ping" : ""
              } dark:hover:bg-gray-950 text-center dark:hover:border-gray-800 bg-[#e3e3e3] hover:bg-[#cfcfcf] top-8 right-0 w-[100px] dark:bg-gray-900 dark:border-gray-700 border-[1px] px-[8px] py-[8px] md:px-[8px] md:py-[8px] rounded-lg`}
              onClick={handleCopyLink}
            >
              {isCopied ? "Copied" : "Copy Link"}
            </div>
          </div>
        </div>
        <Link to={`/${post.postedBy.username}/${post._id}`}>
          <p className="mt-2 font-light text-sm mb-2">{post.content}</p>
        </Link>
        {post.images.length > 0 ? renderImages() : null}
        <div className="hidden md:flex">
          <PostAction
            liked={liked}
            setLiked={setLiked}
            isLiking={isLiking}
            setIsLiking={setIsLiking}
            size={35}
            id={post._id}
            isCommentVisible={false}
            isPost={true}
          />
        </div>
        <div className="md:hidden flex">
          <PostAction
            liked={liked}
            setLiked={setLiked}
            isLiking={isLiking}
            setIsLiking={setIsLiking}
            size={30}
            id={post._id}
            isCommentVisible={false}
            isPost={true}
          />
        </div>
        <div className="flex flex-row mt-3 font-thin text-[15px] opacity-75 items-start">
          {post.replies.length > 0 && (
            <p>{`${post.replies.length} ${
              post.replies.length === 1 ? "reply" : "replies"
            }`}</p>
          )}
          {post.replies.length > 0 && post.likes.length > 0 && (
            <p className="mx-3">-</p>
          )}
          {post.likes.length > 0 && (
            <p>{`${post.likes.length} ${
              post.likes.length === 1 ? "like" : "likes"
            }`}</p>
          )}
        </div>
      </div>
      {user && <CommentBox placeholder="Send a reply..." postID={post._id} />}
      <br />
      {user &&
        userReplies.map((reply) => (
          <PostComment key={reply._id} reply={reply} />
        ))}
    </div>
  );
};

export default UserDetailedPost;
