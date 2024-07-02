import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../app/features/themeSlice";
import { Link, useLocation } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";

const Header = () => {
  const loc = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  return (
    <div className="lg:w-[600px] w-[90vw] m-auto items-center flex flex-row justify-between md:mt-10">
      <p className="md:hidden"></p>
      <img
        className="h-[30px] absolute right-[46vw] lg:right-[48vw]"
        src={
          !isDarkMode ? "src/assets/DarkLogo.svg" : "src/assets/LightLogo.svg"
        }
        alt=""
        // onClick={handleToggle}
      />
      {user ? (
        <div className="flex flex-row md:hidden gap-3 align-middle items-center">
          {loc.pathname.slice(1) === user.username ? (
            <Link to={`/`}>
              <IoHomeOutline size={40} />
            </Link>
          ) : (
            <Link to={`/${user.username}`}>
              <img
                className="border-0 rounded-full h-[35px] w-[35px] md:h-[45px] md:w-[45px] bg-cover bg-center"
                src={user?.profilePicture}
                alt=""
              />
            </Link>
          )}
        </div>
      ) : (
        <button className="opacity-0 md:hidden cursor-default dark:bg-[#ffffff1c] md:text-md text-sm bg-[#0000001c] hover:bg-[#00000030] dark:hover:bg-[#ffffff30] px-3 py-2 rounded-lg">
          LOGIN
        </button>
      )}
    </div>
  );
};

export default Header;
