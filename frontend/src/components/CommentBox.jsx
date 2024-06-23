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

const CommentBox = ({ placeholder, postID, replyID }) => {
  const user = useSelector((state) => state.auth.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const { replyPost, replyReply } = useSelector((state) => state.reply);

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
        console.log(res.data);
        if (res.data.message === "Reply posted successfully") {
          reset();
          dispatch(setIsReplying(false));
          dispatch(setReplyPost(null));
          toast.success("Replied successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response?.data?.message || "An error occurred.");
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
        console.log(res.data);
        if (res.data.message === "Reply posted successfully") {
          reset();
          dispatch(setIsReplying(false));
          dispatch(setReplyReply(null));
          toast.success("Replied successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response?.data?.message || "An error occurred.");
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
        console.log(res.data);
        if (res.data.message === "Reply posted successfully") {
          reset();
          dispatch(setIsReplying(false));
          dispatch(setReplyReply(null));
          toast.success("Replied successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response?.data?.message || "An error occurred.");
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
      className="flex flex-row py-3 border-b-[1px] border-t-[1px] gap-4 justify-between md:text-md text-sm dark:border-b-[#ffffff2a] border-b-[#0000002a] dark:border-t-[#ffffff2a] border-t-[#0000002a] align-middle items-center"
    >
      <div className="flex flex-row w-full gap-4">
        <label htmlFor="comment">👋</label>
        <input
          type="text"
          name="comment"
          className="w-full appearance-none border-none bg-transparent focus:outline-0"
          placeholder={placeholder}
          {...register("content", { required: "Reply cannot be empty" })}
        />
        {errors.content && (
          <span className="text-red-600 text-sm">{errors.content.message}</span>
        )}
      </div>
      <button
        className="dark:bg-[#ffffff1c] md:text-md text-sm bg-[#0000001c] hover:bg-[#00000030] dark:hover:bg-[#ffffff30] px-3 py-2 rounded-lg cursor-pointer"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default CommentBox;
