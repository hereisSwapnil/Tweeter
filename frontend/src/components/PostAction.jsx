import React from "react";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { BsSend } from "react-icons/bs";
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
    }
  };

  const handleLikeUnlike = () => {
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

  return (
    <div className="mt-5 flex flex-row gap-2 items-center">
      {liked ? (
        <IoMdHeart
          className={`cursor-pointer ${isLiking ? "animate-ping" : ""}`}
          color="red"
          size={size}
          onClick={handleLikeUnlike}
        />
      ) : (
        <IoIosHeartEmpty
          className={`cursor-pointer ${isLiking ? "animate-ping" : ""}`}
          size={size}
          onClick={handleLikeUnlike}
        />
      )}
      {isCommentVisible && (
        <>
          <svg
            className="mr-2 cursor-pointer hidden dark:flex"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            id="comment"
            height={size + 2}
            onClick={isPost ? clickReplyPost : ReplyaReply}
          >
            <path
              fill=""
              d="m23.751 21.127.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z"
            ></path>
            <path
              fill="#fff"
              d="M25.784 21.017A10.992 10.992 0 0 0 27 16c0-6.065-4.935-11-11-11S5 9.935 5 16s4.935 11 11 11c1.742 0 3.468-.419 5.018-1.215l4.74 1.185a.996.996 0 0 0 .949-.263 1 1 0 0 0 .263-.95l-1.186-4.74zm-2.033.11.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z"
            ></path>
          </svg>

          <svg
            className="mr-2 cursor-pointer dark:hidden"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            id="comment"
            height={size + 2}
            onClick={isPost ? clickReplyPost : ReplyaReply}
          >
            <path
              fill="#fff"
              d="m23.751 21.127.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z"
            ></path>
            <path
              fill="#000000"
              d="M25.784 21.017A10.992 10.992 0 0 0 27 16c0-6.065-4.935-11-11-11S5 9.935 5 16s4.935 11 11 11c1.742 0 3.468-.419 5.018-1.215l4.74 1.185a.996.996 0 0 0 .949-.263 1 1 0 0 0 .263-.95l-1.186-4.74zm-2.033.11.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z"
            ></path>
          </svg>
        </>
      )}
      <BsSend className="cursor-pointer" size={size - 10} />
    </div>
  );
};

export default PostAction;
