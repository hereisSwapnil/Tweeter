import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "./app/features/authSlice";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainApp from "./Pages/MainApp";
import Loader from "./components/Loader";
import Profile from "./Pages/Profile";
import { setPageRoute } from "./app/features/pageRouteSlice";
import Post from "./Pages/Post";
import Notifications from "./Pages/Notifications";

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

  const theme = useSelector((state) => state.theme.isDarkMode)
    ? "dark"
    : "light";

  return (
    <>
      <Loader />
      <div
        className={`min-h-screen flex flex-col select-none ${
          loading ? "opacity-20" : ""
        }`}
      >
        <div className="bg-white text-black dark:bg-black dark:text-white flex-grow">
          <div className="max-w-[600px] m-auto min-h-screen my-5">
            <Header />
            <ToastContainer
              position="top-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={theme}
              transition:Bounce
            />
            <Routes>
              <Route path="/" element={<MainApp />} />
              <Route path="/:username" element={<Profile />} />
              <Route path="/:username/:postID" element={<Post />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
