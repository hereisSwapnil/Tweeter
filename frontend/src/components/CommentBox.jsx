import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../app/features/loadingSlice";
import { toast } from "react-toastify";
import {
  setIsReplying,
  setReplyPost,
  setReplyReply,
} from "../app/features/replySlice";
import { IoSend } from "react-icons/io5";

const CommentBox = ({ placeholder, postID, replyID, onSuccess }) => {
  const user = useSelector((state) => state.auth.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const { replyPost, replyReply } = useSelector((state) => state.reply);

  const handleSuccess = () => {
    reset();
    if (onSuccess) {
      onSuccess();
    } else {
      // Default behavior if no onSuccess provided (e.g., inline comments)
      dispatch(setIsReplying(false));
      dispatch(setReplyPost(null));
      dispatch(setReplyReply(null));
    }
    toast.success("Replied successfully");
  };

  const replyaPost = (data) => {
    if (!user) {
      toast.error("Please login to reply");
      return;
    }
    dispatch(setLoading(true));
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/post/reply/${postID}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.message === "Reply posted successfully") {
          handleSuccess();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message || "An error occurred.");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const replyaReply = (data) => {
    if (!user) {
      toast.error("Please login to reply");
      return;
    }
    dispatch(setLoading(true));
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/post/reply/reply/${replyID}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.message === "Reply posted successfully") {
          handleSuccess();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message || "An error occurred.");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const handleDirectReply = (data) => {
    if (!user) {
      toast.error("Please login to reply");
      return;
    }
    dispatch(setLoading(true));
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/post/reply/${postID}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.message === "Reply posted successfully") {
          handleSuccess();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message || "An error occurred.");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return (
    <form
      onSubmit={
        replyPost
          ? handleSubmit(replyaPost)
          : replyReply
          ? handleSubmit(replyaReply)
          : handleSubmit(handleDirectReply)
      }
      className="flex items-center gap-3 w-full"
    >
      <div className="relative flex-grow">
        <input
          type="text"
          className="w-full bg-gray-100 dark:bg-gray-900 border-none rounded-full py-3 px-4 pr-12 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
          placeholder={placeholder}
          {...register("content", { required: "Reply cannot be empty" })}
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary-500 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
          type="submit"
        >
          <IoSend size={20} />
        </button>
      </div>
      {errors.content && (
        <span className="text-red-500 text-xs absolute -bottom-5 left-4">{errors.content.message}</span>
      )}
    </form>
  );
};

export default CommentBox;
