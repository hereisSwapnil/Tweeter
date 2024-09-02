import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setPageRoute } from "../app/features/pageRouteSlice";
import { setLoading } from "../app/features/loadingSlice";

const LoginCard = () => {
  const [toggleType, setToggleType] = useState("password");
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setToggleType((prev) => (prev === "password" ? "text" : "password"));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/user/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const userData = res.data;
        localStorage.setItem("token", userData.token);
        toast.success("Logged in successfully");
        dispatch(setPageRoute("feed"));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err.response.data.message);
      })
      .finally(() => {
        reset();
      });
  };

  const handleGuestLogin = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/user/guestlogin`)
      .then((res) => {
        const guestData = res.data;
        localStorage.setItem("token", guestData.token);
        toast.success("Logged in as guest");
        dispatch(setPageRoute("feed"));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center align-middle p-2">
      <h1 className="md:text-4xl text-3xl font-extrabold md:mb-10 mb-5">
        Log in
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-[#0000002a] dark:border-[#ffffff2a] p-10 rounded-lg flex flex-col gap-5 lg:w-[634px] w-[90vw]"
      >
        <div className="flex flex-col justify-start gap-1">
          <label htmlFor="username" className="text-md font-semibold">
            Username <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="username"
            className="text-md py-2 px-2 bg-transparent border border-[#0000002a] dark:border-[#ffffff2a] rounded-lg appearance-none focus:outline-none"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <span className="text-red-600 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>
        <div className="flex flex-col justify-start gap-1">
          <label htmlFor="password" className="text-md font-semibold">
            Password <span className="text-red-700">*</span>
          </label>
          <div className="w-full relative">
            <input
              type={toggleType}
              name="password"
              className="text-md w-full py-2 px-2 bg-transparent border border-[#0000002a] dark:border-[#ffffff2a] rounded-lg appearance-none focus:outline-none"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-red-600 text-sm">
                {errors.password.message}
              </span>
            )}
            {toggleType === "password" ? (
              <>
                <FaEyeSlash
                  color="white"
                  onClick={togglePasswordVisibility}
                  className="hidden dark:flex absolute right-[12px] top-[12px] text-[#0000002a] cursor-pointer"
                />
                <FaEyeSlash
                  color="black"
                  onClick={togglePasswordVisibility}
                  className="dark:hidden flex absolute right-[12px] top-[12px] text-[#0000002a] cursor-pointer"
                />
              </>
            ) : (
              <>
                <FaEye
                  color="white"
                  onClick={togglePasswordVisibility}
                  className="hidden dark:flex absolute right-[12px] top-[12px] text-[#0000002a] cursor-pointer"
                />
                <FaEye
                  color="black"
                  onClick={togglePasswordVisibility}
                  className="dark:hidden flex absolute right-[12px] top-[12px] text-[#0000002a] cursor-pointer"
                />
              </>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="text-lg mt-5 dark:hover:bg-[#ffffff30] hover:bg-[#00000030] dark:text-white text-black dark:bg-[#ffffff1c] bg-[#0000001c] py-3 w-full rounded-lg"
        >
          Log in
        </button>

        <p className="text-sm flex flex-row gap-1 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => {
              dispatch(setPageRoute("signup"));
            }}
            className="text-blue-500 font-semibold hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>

        <hr className="my-4 border-t border-[#0000002a] dark:border-[#ffffff2a]" />
        <p className="text-center text-lg my-4 font-semibold text-gray-700 dark:text-gray-300">
          OR
        </p>
        <button
          type="button"
          onClick={handleGuestLogin}
          className="text-lg mt-3 dark:hover:bg-[#ffffff30] hover:bg-[#00000030] dark:text-white text-black dark:bg-[#ffffff1c] bg-[#0000001c] py-3 w-full rounded-lg"
        >
          Login as Guest
        </button>
      </form>
    </div>
  );
};

export default LoginCard;
