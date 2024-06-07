import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageRoute } from "../app/features/pageRouteSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { setLoading } from "../app/features/loadingSlice";
import UserPost from "../components/UserPost";
import ReplyPopup from "../components/ReplyPopup";
import AddPost from "../components/AddPost";
import Sidebar from "../components/Sidebar";
import HamburgerMenu from "../components/HamburgerMenu";
import RecommendationBar from "../components/RecommendationBar";

const Feed = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [feedPost, setFeedPost] = useState([]);

  const { isReplying } = useSelector((state) => state.reply);
  useEffect(() => {
    if (user) {
      dispatch(setLoading(true));
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/post/feed/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setFeedPost(res.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response?.data?.message || "An error occurred.");
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [dispatch, user]);

  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1">
        <div className="pt-10">
          {user && <AddPost />}
          {isReplying && <ReplyPopup />}
          {feedPost.map((post, index) => (
            <UserPost key={index} post={post} isCommentVisible={true} />
          ))}
        </div>
      </div>
      <RecommendationBar />
    </div>
  );
};

export default Feed;
