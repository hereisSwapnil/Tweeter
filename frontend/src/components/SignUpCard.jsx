import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setPageRoute } from "../app/features/pageRouteSlice";

const SignUpCard = () => {
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
      .post(`${import.meta.env.VITE_API_URL}/api/user/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const userData = res.data;
        localStorage.setItem("token", userData.token);
        toast.success("Sign up successful");
        dispatch(setPageRoute("feed"));
      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      })
      .finally(() => {
        reset();
      });
  };

  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-black rounded-2xl shadow-xl border border-light-border dark:border-dark-border">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
          Create account
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Join Tweeter today
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-1/2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              First Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              placeholder="First"
              {...register("firstName", { required: "Required" })}
            />
            {errors.firstName && (
              <span className="text-red-500 text-xs">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              placeholder="Last"
              {...register("lastName")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            placeholder="Choose a username"
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
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              {errors.email.message}
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
              placeholder="Create a password"
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
          className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-primary-500/30 mt-2"
        >
          Create Account
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => dispatch(setPageRoute("login"))}
            className="text-primary-500 font-semibold hover:underline"
          >
            Log in
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUpCard;
