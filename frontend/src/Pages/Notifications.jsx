import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import RecommendationBar from "../components/RecommendationBar";
import Sidebar from "../components/Sidebar";
import { setLoading } from "../app/features/loadingSlice";
import NotificationCard from "../components/NotificationCard";

const Notifications = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="mt-[8vh] px-2 md:px-0">
        <h1 className="text-3xl font-semibold mb-5">Notifications</h1>
        <NotificationCard
          username={user?.username}
          profilePicture={user?.profilePicture}
          activity={"like"}
          details={"This is a wire pole, top view....."}
        />
        {/* Followed */}
        <NotificationCard
          username={user?.username}
          profilePicture={user?.profilePicture}
          activity={"follow"}
        />
        {/* Commented */}
        <NotificationCard
          username={user?.username}
          profilePicture={user?.profilePicture}
          activity={"comment"}
          details={"This is a wire pole, top view....."}
        />
      </div>
      <RecommendationBar />
    </div>
  );
};

export default Notifications;
