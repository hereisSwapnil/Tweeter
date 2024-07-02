import React from "react";
import { CiLogout } from "react-icons/ci";
import { useSelector } from "react-redux";
import { MdHome } from "react-icons/md";
import { FaBell, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoAnalytics } from "react-icons/io5";

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  if (user)
    return (
      <div
        style={{ left: `calc((100vw - 1100px) / 2)` }}
        className="dark:text-white text-black flex-col justify-between h-[90vh] fixed w-[200px] top-[8vh] hidden md:flex"
      >
        <div className="flex flex-col gap-4">
          <div
            className="flex flex-row gap-2 items-center align-middle py-3 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <MdHome size={30} />
            Home
          </div>
          <div
            className="flex flex-row gap-2 items-center align-middle py-3 cursor-pointer"
            onClick={() => {
              navigate("/notifications");
            }}
          >
            <FaBell size={25} />
            Notification
          </div>
          <div
            className="flex flex-row gap-2 items-center align-middle py-3 cursor-pointer"
            onClick={() => {
              navigate("/analytics");
            }}
          >
            <IoAnalytics size={25} />
            Analytics
          </div>
          <div
            className="flex flex-row gap-2 items-center align-middle py-3 cursor-pointer"
            onClick={() => {
              navigate(`/${user.username}`);
            }}
          >
            <FaUser size={25} />
            Profile
          </div>
        </div>
        <div>
          <div className="gap-5 flex flex-row align-middle items-center justify-between">
            <div className="flex flex-row gap-4">
              <img
                className="border-0 rounded-full h-[25px] w-[25px] md:h-[35px] md:w-[35px] bg-cover bg-center"
                src={user?.profilePicture}
                alt=""
              />
              <div>
                <p className="font-semibold text-sm">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm font-thin">{user?.username}</p>
              </div>
            </div>
            <CiLogout
              className="cursor-pointer"
              size={25}
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            />
          </div>
        </div>
      </div>
    );
};

export default Sidebar;
