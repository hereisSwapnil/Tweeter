import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setPageRoute } from "../app/features/pageRouteSlice";
import { setLoading } from "../app/features/loadingSlice";

const SignUpCard = () => {
  const [toggleType, setToggleType] = useState("password");
  const dispatch = useDispatch();
  const togglePasswordVisibility = () => {
    if (toggleType === "password") {
      setToggleType("text");
    } else {
      setToggleType("password");
    }
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

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(setLoading(false));
  //   }, 1000);
  // }, []);

  return (
    <div className="flex flex-col justify-center items-center align-middle p-2">
      <h1 className="md:text-4xl text-3xl font-extrabold md:mb-10 mb-5">
        Sign up
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-[#0000002a] dark:border-[#ffffff2a] p-10 rounded-lg flex flex-col gap-5 lg:w-[634px] w-[90vw]"
      >
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="flex flex-col w-full justify-start gap-1">
            <label htmlFor="firstname" className="md:text-md font-semibold">
              First Name <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              name="firstname"
              className="md:text-md py-2 px-2 bg-transparent border border-[#0000002a] dark:border-[#ffffff2a] rounded-lg appearance-none focus:outline-none"
              {...register("firstName", { required: "This field is required" })}
            />
            {errors.firstName && (
              <span className="text-red-600 text-sm">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full justify-start gap-1">
            <label htmlFor="lastname" className="md:text-md font-semibold">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              className="md:text-md py-2 px-2 bg-transparent border border-[#0000002a] dark:border-[#ffffff2a] rounded-lg appearance-none focus:outline-none"
              {...register("lastName")}
            />
          </div>
        </div>
        <div className="flex flex-col justify-start gap-1">
          <label htmlFor="username" className="md:text-md font-semibold">
            Username <span className="text-red-700">*</span>
          </label>
          <input
            type="username"
            name="username"
            className="md:text-md py-2 px-2 bg-transparent border border-[#0000002a] dark:border-[#ffffff2a] rounded-lg appearance-none focus:outline-none"
            {...register("username", { required: "This field is required" })}
          />
          {errors.username && (
            <span className="text-red-600 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>
        <div className="flex flex-col justify-start gap-1">
          <label htmlFor="email" className="md:text-md font-semibold">
            Email address <span className="text-red-700">*</span>
          </label>
          <input
            name="email"
            className="md:text-md py-2 px-2 bg-transparent border border-[#0000002a] dark:border-[#ffffff2a] rounded-lg appearance-none focus:outline-none"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-600 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col justify-start gap-1">
          <label htmlFor="" className="md:text-md font-semibold">
            Password <span className="text-red-700">*</span>
          </label>
          <div className="w-full relative">
            <input
              type={toggleType}
              name="password"
              className="md:text-md w-full py-2 px-2 bg-transparent border border-[#0000002a] dark:border-[#ffffff2a] rounded-lg appearance-none focus:outline-none"
              {...register("password", { required: "This field is required" })}
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
        <button className="text-lg mt-5 dark:hover:bg-[#ffffff30] hover:bg-[#00000030] dark:text-white text-black dark:bg-[#ffffff1c] bg-[#0000001c] py-3 w-full rounded-lg">
          Sign up
        </button>
        <p className="text-sm flex flex-row gap-1">
          Already a user?{" "}
          <span
            onClick={() => {
              dispatch(setPageRoute("login"));
            }}
            className="text-blue-500 font-semibold hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUpCard;
