import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { useSelector } from "react-redux";

const UserListPopup = ({ userType }) => {
  const [userList, setUserList] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user/${userType}/${user?._id}`)
      .then((res) => {
        setUserList(res.data);
      });
  }, []);

  return (
    <div
      className={`absolute left-0 flex h-[100vh] w-[100vw] bg-[#ffffff9c] dark:bg-[#0000009c] justify-center overflow-y-hidden`}
      onClick={() => {
        dispatch(setIsReplying(false));
        dispatch(setReplyReply(null));
      }}
      style={{ top: `${window.scrollY}px` }}
    >
      <div
        className="bg-white flex flex-col dark:bg-black shadow-xl !opacity-100 z-20 mt-[80px] p-3 rounded-lg border-[1px] pt-7 pb-10 px-5 gap-4 dark:border-[#ffffff2a] border-[#0000002a] w-[95vw] md:w-[700px] h-[80vh]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="font-semibold">
          {userType === "followers" ? "Followers" : "Following"}
        </h2>
        <div className="mt-8">
          {userList.map((user) => (
            <div className="flex flex-row justify-between border-t-[1px] border-b-[1px] dark:border-t-[#ffffff2a] border-t-[#0000002a] dark:border-b-[#ffffff2a] border-b-[#0000002a] py-3">
              <div className="flex flex-row gap-8">
                <img
                  className="border-0 rounded-full h-[25px] w-[25px] md:h-[35px] md:w-[35px] bg-cover bg-center"
                  src={user?.profilePicture}
                  alt=""
                />
                <p className="flex flex-row items-center gap-1 font-extrabold cursor-pointer hover:underline">
                  {user?.username}
                  <span>
                    <MdVerified color="#0096FF" />
                  </span>
                </p>
              </div>
              <div
                className={`md:text-md text-sm select-none cursor-pointer dark:hover:bg-gray-950 text-center dark:hover:border-gray-800 bg-[#e3e3e3] hover:bg-[#cfcfcf] h-fit w-[100px] dark:bg-gray-900 dark:border-gray-700 border-[1px] px-[8px] py-[8px] md:px-[8px] md:py-[8px] rounded-lg`}
              >
                {userType === "followers" ? "Follow" : "Unfollow"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserListPopup;
