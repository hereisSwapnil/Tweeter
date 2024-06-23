import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../app/features/loadingSlice";
import { toast } from "react-toastify";
import axios from "axios";
import UserDetailedPost from "../components/UserDetailedPost";
import { useNavigate, useParams } from "react-router-dom";
import ReplyPopup from "../components/ReplyPopup";
import Sidebar from "../components/Sidebar";
import RecommendationBar from "../components/RecommendationBar";

const Post = () => {
  const { username, postID } = useParams();
  const user = useSelector((state) => state.auth.user);
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
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message || "An error occurred.");
        navigate("/");
      });
  }, []);

  return (
    <div>
      {user && <Sidebar />}
      {isReplying && <ReplyPopup />}
      {post && <UserDetailedPost post={post} />}
      {user && <RecommendationBar />}
    </div>
  );
};

export default Post;
