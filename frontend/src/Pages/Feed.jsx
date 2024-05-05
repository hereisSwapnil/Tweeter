import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageRoute } from "../app/features/theme/pageRouteSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { setLoading } from "../app/features/theme/loadingSlice";
import UserPost from "../components/UserPost";

const Feed = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [feedPost, setFeedPost] = useState([]);

  useEffect(() => {
    if (user) {
      dispatch(setLoading(true));
      axios
        .get(`/api/post/feed/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setFeedPost(res.data);
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
      {feedPost.map((post, index) => (
        <UserPost key={index} post={post} />
      ))}
    </div>
  );
};

export default Feed;
