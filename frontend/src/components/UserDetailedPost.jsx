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
        <div className={`grid ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-2 mt-4 mb-4 rounded-xl overflow-hidden`}>
          {displayedImages.map((image, index) => (
            <div key={index} className="relative w-full aspect-square">
              <Item
                original={image.url}
                thumbnail={image.url}
                width="1024"
                height="768"
              >
                {({ ref, open }) => (
                  <img
                    ref={ref}
                    onClick={open}
                    src={image.url}
                    alt=""
                    className={`w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity ${
                      extraImagesCount > 0 && index === displayedImages.length - 1
                        ? "opacity-50"
                        : ""
                    }`}
                  />
                )}
              </Item>
              {extraImagesCount > 0 && index === displayedImages.length - 1 && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer pointer-events-none"
                >
                  <span className="text-2xl font-bold text-white">
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
    <div className="flex flex-col w-full mx-auto mb-20">
      <div className="border-b border-light-border dark:border-dark-border p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <Link to={`/${post.postedBy.username}`}>
              <img
                className="w-12 h-12 rounded-full object-cover hover:opacity-80 transition-opacity"
                src={post.postedBy.profilePicture}
                alt={post.postedBy.username}
              />
            </Link>
            <div className="flex flex-col">
              <Link 
                to={`/${post.postedBy.username}`}
                className="font-bold text-black dark:text-white hover:underline flex items-center gap-1"
              >
                {post.postedBy.firstName} {post.postedBy.lastName}
                {post.postedBy.isVerified && <MdVerified className="text-primary-500" />}
              </Link>
              <span className="text-gray-500 dark:text-gray-400 text-sm">@{post.postedBy.username}</span>
            </div>
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
              className="p-2 -mr-2 text-gray-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-full transition-colors"
            >
              <BsThreeDots size={20} />
            </button>
            
            {isShareMenuOpen && (
              <div className="absolute right-0 top-8 z-20 w-32 bg-white dark:bg-black border border-light-border dark:border-dark-border rounded-xl shadow-xl py-1 overflow-hidden">
                <button
                  onClick={handleCopyLink}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {isCopied ? "Copied!" : "Copy Link"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-xl text-black dark:text-white whitespace-pre-wrap mb-4">
            {post.content}
          </p>
          {post.images.length > 0 && renderImages()}
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm py-4 border-y border-light-border dark:border-dark-border mb-4">
          <span>{convertPostDate(post.createdAt)}</span>
          <span>·</span>
          <span className="font-bold text-black dark:text-white">{post.likes.length}</span> Likes
          <span className="ml-2 font-bold text-black dark:text-white">{post.replies.length}</span> Replies
        </div>

        {/* Actions */}
        <div className="flex justify-start py-2 border-b border-light-border dark:border-dark-border mb-4">
          <PostAction
            liked={liked}
            setLiked={setLiked}
            isLiking={isLiking}
            setIsLiking={setIsLiking}
            size={24}
            id={post._id}
            isCommentVisible={true}
            isPost={true}
            showCount={false}
            replyCount={post.replies.length}
            likeCount={post.likes.length}
          />
        </div>

        {/* Comment Box */}
        {user && <CommentBox placeholder="Post your reply" postID={post._id} />}
      </div>

      {/* Replies */}
      <div className="flex flex-col">
        {userReplies.map((reply) => (
          <PostComment key={reply._id} reply={reply} />
        ))}
      </div>
    </div>
  );
};

export default UserDetailedPost;
