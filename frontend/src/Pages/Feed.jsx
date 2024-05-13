import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageRoute } from "../app/features/theme/pageRouteSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { setLoading } from "../app/features/theme/loadingSlice";
import UserPost from "../components/UserPost";
import ReplyPopup from "../components/ReplyPopup";

const Feed = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [isReplying, setIsReplying] = useState(false);
  const [feedPost, setFeedPost] = useState([]);
  const [replyPost, setReplyPost] = useState(null);

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
            dispatch(setLoading(false));
        });
    }
  }, [dispatch, user, isReplying]);

  return (
    <div>
      {isReplying && (
        <ReplyPopup post={replyPost} setIsReplying={setIsReplying} />
      )}
      {feedPost.map((post, index) => (
        <UserPost
          key={index}
          post={post}
          setIsReplying={setIsReplying}
          setReplyPost={setReplyPost}
          isReplying={isReplying}
        />
      ))}
    </div>
  );
};

export default Feed;
