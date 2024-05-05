import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../app/features/theme/loadingSlice";
import { toast } from "react-toastify";
import axios from "axios";
import UserDetailedPost from "../components/UserDetailedPost";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(setLoading(true));
      axios
        .get(`/api/user/${user.username}`)
        .then((res) => {
          setUserProfile(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response?.data?.message || "An error occurred.");
        })
        .finally(() => {
          setTimeout(() => {
            dispatch(setLoading(false));
          }, 1000);
        });
    }
  }, [dispatch, user]);

  return (
    <div>
      <UserHeader userProfile={userProfile} />
      <UserDetailedPost />
    </div>
  );
};

export default Profile;
