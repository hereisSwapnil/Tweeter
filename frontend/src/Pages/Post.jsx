import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../app/features/loadingSlice";
import { toast } from "react-toastify";
import axios from "axios";
import UserDetailedPost from "../components/UserDetailedPost";
import { useNavigate, useParams } from "react-router-dom";
import ReplyPopup from "../components/ReplyPopup";

const Post = () => {
  const { postID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isReplying } = useSelector((state) => state.reply);

  const [post, setPost] = useState(null);

  useEffect(() => {
    dispatch(setLoading(true));
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/post/${postID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message || "An error occurred.");
        navigate("/");
      });
  }, [postID]);

  return (
    <div>
      {isReplying && <ReplyPopup />}
      {post && <UserDetailedPost post={post} />}
    </div>
  );
};

export default Post;
