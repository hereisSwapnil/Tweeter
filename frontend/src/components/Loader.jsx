import React from "react";
import { useSelector } from "react-redux";

const Loader = () => {
  const loading = useSelector((state) => state.loading.isLoading);

  if (!loading) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 dark:bg-black dark:bg-opacity-50 bg-white bg-opacity-70"
      }`}
    >
      <div
        className={
          "border-gray-300 h-20 w-20 animate-spin rounded-full border-8 dark:border-t-white dark:border-t-black border-t-gray-500"
        }
      />
    </div>
  );
};

export default Loader;
