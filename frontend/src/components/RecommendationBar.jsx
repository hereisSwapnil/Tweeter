import React from "react";
import { useSelector } from "react-redux";

const RecommendationBar = () => {
  const user = useSelector((state) => state.auth.user);
  if (user)
    return (
      <div
        style={{ right: `calc((100vw - 1200px) / 2)` }}
        className="dark:text-white text-black flex-col justify-between h-[90vh] fixed w-[250px] top-[8vh] hidden md:flex"
      >
        <div className="flex flex-col">
          <div className="flex flex-row gap-4 items-center align-middle py-3 cursor-pointer">
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
            <div className="flex flex-row gap-1 text-[#0096FF]">
              +<p className="text-[#0096FF] font-semibold">Follow</p>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center align-middle py-3 cursor-pointer">
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
            <div className="flex flex-row gap-1 text-[#0096FF]">
              +<p className="text-[#0096FF] font-semibold">Follow</p>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center align-middle py-3 cursor-pointer">
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
            <div className="flex flex-row gap-1 text-[#0096FF]">
              +<p className="text-[#0096FF] font-semibold">Follow</p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default RecommendationBar;
