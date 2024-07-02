import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../app/features/loadingSlice";
import { toast } from "react-toastify";
import axios from "axios";
import UserDetailedPost from "../components/UserDetailedPost";
import { useNavigate, useParams } from "react-router-dom";
import ReplyPopup from "../components/ReplyPopup";
import RecommendationBar from "../components/RecommendationBar";
import Sidebar from "../components/Sidebar";
import ProfileSetting from "../components/ProfileSetting";
import UserListPopup from "../components/UserListPopup";

const Profile = () => {
  const { username } = useParams();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isReplying } = useSelector((state) => state.reply);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUserListOpen, setIsUserListOpen] = useState(false);
  const [userType, setUserType] = useState(null);

  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userReplies, setUserReplies] = useState([]);

  useEffect(() => {
    dispatch(setLoading(true));
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUserProfile(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.response?.data?.message || "An error occurred.");
        navigate("/");
      });
  }, [dispatch, user]);

  useEffect(() => {
    if (userProfile) {
      console.log(userProfile);
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/api/post/user/${userProfile?._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setUserPosts(res.data);
          // console.log(res.data);
        });
      axios
        .get(`api/post/user/replies/${userProfile?._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setUserReplies(res.data);
        })
        .finally(() => {
          setTimeout(() => {
            dispatch(setLoading(false));
          }, 1000);
        });
    }
  }, [userProfile]);

  if (isSettingsOpen) {
    return (
      <div>
        <Sidebar />
        <ProfileSetting
          userProfile={userProfile}
          setIsSettingsOpen={setIsSettingsOpen}
        />
        <RecommendationBar />
      </div>
    );
  }

  return (
    <div>
      <Sidebar />
      {isReplying && <ReplyPopup />}
      {isUserListOpen && (
        <UserListPopup
          setIsUserListOpen={setIsUserListOpen}
          userType={userType}
        />
      )}
      <UserHeader
        userProfile={userProfile}
        setIsSettingsOpen={setIsSettingsOpen}
        setIsUserListOpen={setIsUserListOpen}
        setUserType={setUserType}
      />
      {userProfile && (
        <div className="flex flex-col gap-4">
          {userPosts?.map((post, index) => (
            <UserDetailedPost
              key={index}
              post={post}
              userProfile={userProfile}
            />
          ))}
          {/* {userReplies.map((post, index) => (
            <UserDetailedPost key={index} post={post} />
          ))} */}
        </div>
      )}
      <RecommendationBar />
    </div>
  );
};

export default Profile;
