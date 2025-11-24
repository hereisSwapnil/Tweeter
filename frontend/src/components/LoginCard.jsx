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
    <div className="w-full max-w-md p-8 bg-white dark:bg-black rounded-2xl shadow-xl border border-light-border dark:border-dark-border">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
          Welcome back
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your details to sign in
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter your username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative">
            <input
              type={toggleType}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              {toggleType === "password" ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-primary-500/30"
        >
          Sign in
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-black text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGuestLogin}
          className="w-full py-3 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-black dark:text-white font-semibold rounded-xl transition-colors"
        >
          Guest Login
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => dispatch(setPageRoute("signup"))}
            className="text-primary-500 font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginCard;
