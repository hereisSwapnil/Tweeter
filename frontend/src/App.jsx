import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "./app/features/authSlice";
import "react-toastify/dist/ReactToastify.css";
import MainApp from "./Pages/MainApp";
import Loader from "./components/Loader";
import Profile from "./Pages/Profile";
import { setPageRoute } from "./app/features/pageRouteSlice";
import Post from "./Pages/Post";
import Notifications from "./Pages/Notifications";
import Analytics from "./Pages/Analytics";
import Layout from "./components/Layout";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.isLoading);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.getItem("isDarkMode") === "true"
    );
  }, []);

  const pageRoute = useSelector((state) => state.pageRoute.pageRoute);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/user/get`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const userData = res.data;
          dispatch(setAuth(userData));
          dispatch(setPageRoute("feed"));
        });
    }
  }, [pageRoute, dispatch]);

  return (
    <>
      <Loader />
      <div className={loading ? "opacity-20 pointer-events-none" : ""}>
        <Layout>
          <Routes>
            <Route path="/" element={<MainApp />} />
            <Route path="/:username" element={<Profile />} />
            <Route path="/:username/:postID" element={<Post />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </Layout>
      </div>
    </>
  );
}

export default App;
