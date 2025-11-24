import React from "react";
import { CiLogout } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { MdHome } from "react-icons/md";
import { FaBell, FaUser, FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { IoAnalytics } from "react-icons/io5";
import { toggleTheme } from "../app/features/themeSlice";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

const Sidebar = ({ mobile }) => {
  const user = useSelector((state) => state.auth.user);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const navItems = [
    { icon: MdHome, label: "Home", path: "/" },
    { icon: FaSearch, label: "Explore", path: "/explore" }, // Added Explore placeholder
    { icon: FaBell, label: "Notifications", path: "/notifications" },
    { icon: IoAnalytics, label: "Analytics", path: "/analytics" },
    { icon: FaUser, label: "Profile", path: `/${user?.username}` },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (!user) return null;

  if (mobile) {
    return (
      <div className="flex justify-around items-center h-full px-4 py-2">
        {navItems.map((item) => (
          <div
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`p-2 rounded-full ${
              location.pathname === item.path
                ? "text-primary-500"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <item.icon size={24} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between h-full py-4">
      <div className="flex flex-col gap-2">
        <div className="px-4 mb-6">
           <img
            className="h-8 w-auto"
            src={!isDarkMode ? "/DarkLogo.svg" : "/LightLogo.svg"}
            alt="Logo"
          />
        </div>

        {navItems.map((item) => (
          <div
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-4 px-4 py-3 rounded-full cursor-pointer transition-colors duration-200 ${
              location.pathname === item.path
                ? "font-bold text-primary-500 bg-primary-50 dark:bg-primary-900/20"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <item.icon size={26} />
            <span className="text-xl">{item.label}</span>
          </div>
        ))}

        <div
            onClick={() => dispatch(toggleTheme())}
            className="flex items-center gap-4 px-4 py-3 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        >
            {isDarkMode ? <BsSunFill size={26} /> : <BsMoonStarsFill size={26} />}
            <span className="text-xl">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200 group">
          <div className="flex items-center gap-3">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={user?.profilePicture}
              alt=""
            />
            <div className="hidden xl:block">
              <p className="font-bold text-sm truncate w-24">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-gray-500 text-sm truncate w-24">@{user?.username}</p>
            </div>
          </div>
          <CiLogout
            size={20}
            onClick={(e) => {
                e.stopPropagation();
                handleLogout();
            }}
            className="text-gray-500 hover:text-red-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
