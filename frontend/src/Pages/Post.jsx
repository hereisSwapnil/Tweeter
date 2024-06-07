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
  console.log(isReplying);
  // const [userProfile, setUserProfile] = useState(null);
  // const [userPosts, setUserPosts] = useState([]);
  // const [userReplies, setUserReplies] = useState([]);

  const [post, setPost] = useState(null);

  useEffect(() => {
    dispatch(setLoading(true));
    axios
      .get(`/api/post/${postID}`, {
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

  // useEffect(() => {
  //   if (userProfile) {
  //     axios
  //       .get(`api/post/user/${userProfile?._id}`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       })
  //       .then((res) => {
  //         setUserPosts(res.data);
  //         console.log(res.data);
  //       });
  //     axios
  //       .get(`api/post/user/replies/${userProfile?._id}`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       })
  //       .then((res) => {
  //         setUserReplies(res.data);
  //       })
  //       .finally(() => {
  //         setTimeout(() => {
  //           dispatch(setLoading(false));
  //         }, 1000);
  //       });
  //   }
  // }, [userProfile]);

  return (
    <div>
      <Sidebar />
      {isReplying && <ReplyPopup />}
      {post && <UserDetailedPost post={post} />}
      {/* <UserHeader userProfile={userProfile} /> */}
      {/* {userProfile && (
        <div className="flex flex-col gap-4">
          {userPosts.map((post, index) => (
            <UserDetailedPost
              key={index}
              post={post}
              userProfile={userProfile}
            />
          ))} */}
      {/* {userReplies.map((post, index) => (
            <UserDetailedPost key={index} post={post} />
          ))} */}
      {/* </div> */}
      {/* )} */}
      <RecommendationBar />
    </div>
  );
};

export default Post;