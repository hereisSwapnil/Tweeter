import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../app/features/theme/themeSlice";

const Header = () => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  //   const isDarkMode = localStorage.getItem("isDarkMode") === "true";

  return (
    <div className="w-auto flex flex-row justify-center">
      <img
        className="h-[30px]"
        src={
          !isDarkMode ? "src/assets/DarkLogo.svg" : "src/assets/LightLogo.svg"
        }
        alt=""
        onClick={handleToggle}
      />
    </div>
  );
};

export default Header;
