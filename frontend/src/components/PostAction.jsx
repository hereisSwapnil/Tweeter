import React from "react";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { BsSend } from "react-icons/bs";

const PostAction = ({ liked, setLiked, isliking, setIsliking, size }) => {
  return (
    <div className="mt-5 flex flex-row gap-2 align-middle items-center">
      {liked ? (
        <IoMdHeart
          className={`cursor-pointer ${isliking ? "animate-ping" : ""}`}
          color="red"
          size={size}
          onClick={() => {
            setIsliking(true);
            setLiked(!liked);
            setTimeout(() => {
              setIsliking(false);
            }, 500);
          }}
        />
      ) : (
        <IoIosHeartEmpty
          className={`cursor-pointer ${isliking ? "animate-ping" : ""}`}
          size={size}
          onClick={() => {
            setIsliking(true);
            setLiked(!liked);
            setTimeout(() => {
              setIsliking(false);
            }, 500);
          }}
        />
      )}
      <svg
        className="mr-[8px] cursor-pointer hidden dark:flex"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        id="comment"
        height={size + 2}
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
        className="mr-[8px] cursor-pointer dark:hidden"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        id="comment"
        height={size + 2}
      >
        <path
          fill="#fff"
          d="m23.751 21.127.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z"
        ></path>
        <path
          fill="#00000"
          d="M25.784 21.017A10.992 10.992 0 0 0 27 16c0-6.065-4.935-11-11-11S5 9.935 5 16s4.935 11 11 11c1.742 0 3.468-.419 5.018-1.215l4.74 1.185a.996.996 0 0 0 .949-.263 1 1 0 0 0 .263-.95l-1.186-4.74zm-2.033.11.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z"
        ></path>
      </svg>
      <BsSend className="cursor-pointer" size={size - 10} />
    </div>
  );
};

export default PostAction;