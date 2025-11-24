import React from "react";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { BsSend, BsChat } from "react-icons/bs";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PostAction = ({
  liked,
  setLiked,
  isLiking,
  setIsLiking,
  size,
  id,
  clickReplyPost,
  isCommentVisible = true,
  replyId,
  isPost,
  isReply,
  ReplyaReply,
  showCount = true,
  likeCount,
  replyCount,
}) => {
  const user = useSelector((state) => state.auth.user);

  const likeUnlike = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.message.includes("successfully")) {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error liking/unliking:", error);
      setLiked(false);
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  const handleLikeUnlike = (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to like/unlike a post.");
      return;
    }
    setIsLiking(true);
    const url = isReply
      ? `${import.meta.env.VITE_API_URL}/api/post/reply/like/${replyId}`
      : `${import.meta.env.VITE_API_URL}/api/post/like/${id}`;
    likeUnlike(url);
    setLiked(!liked);
    setTimeout(() => {
      setIsLiking(false);
    }, 500);
  };

  const handleReplyClick = (e) => {
    e.stopPropagation();
    if (isPost && clickReplyPost) {
      clickReplyPost(e);
    } else if (ReplyaReply) {
      ReplyaReply(e);
    }
  };

  return (
    <div className="flex flex-row gap-6 items-center">
      <div className="flex items-center gap-1 group">
        <div className="p-2 rounded-full group-hover:bg-pink-50 dark:group-hover:bg-pink-900/20 transition-colors cursor-pointer" onClick={handleLikeUnlike}>
          {liked ? (
            <IoMdHeart
              className={`${isLiking ? "animate-ping" : ""}`}
              color="red"
              size={size}
            />
          ) : (
            <IoIosHeartEmpty
              className={`text-gray-500 group-hover:text-pink-500 ${isLiking ? "animate-ping" : ""}`}
              size={size}
            />
          )}
        </div>
        {showCount && likeCount !== undefined && (
          <span className={`text-sm ${liked ? 'text-pink-500' : 'text-gray-500 group-hover:text-pink-500'}`}>
            {likeCount + (liked && !isLiking ? 0 : 0)} {/* Logic to update count optimistically could be added here */}
          </span>
        )}
      </div>

      {isCommentVisible && (
        <div className="flex items-center gap-1 group">
          <div 
            className="p-2 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors cursor-pointer"
            onClick={handleReplyClick}
          >
            <BsChat 
              size={size - 4} 
              className="text-gray-500 group-hover:text-blue-500"
            />
          </div>
          {showCount && replyCount !== undefined && (
            <span className="text-sm text-gray-500 group-hover:text-blue-500">
              {replyCount}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center gap-1 group">
        <div className="p-2 rounded-full group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors cursor-pointer">
          <BsSend 
            size={size - 4} 
            className="text-gray-500 group-hover:text-green-500"
          />
        </div>
      </div>
    </div>
  );
};

export default PostAction;
