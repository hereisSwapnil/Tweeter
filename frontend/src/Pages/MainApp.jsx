import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Feed from "./Feed";
import Login from "./Login";
import Signup from "./Signup";
import { setPageRoute } from "../app/features/pageRouteSlice";

const MainApp = () => {
  const user = useSelector((state) => state.auth.user);
  const pageRoute = useSelector((state) => state.pageRoute.pageRoute);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setPageRoute("feed"));
    } else {
      dispatch(setPageRoute("login"));
    }
  }, [user, dispatch]);

  if (pageRoute === "feed") {
    return <Feed />;
  }
  if (pageRoute === "login") {
    return <Login />;
  }

  if (pageRoute === "signup") {
    return <Signup />;
  }
};
export default MainApp;
