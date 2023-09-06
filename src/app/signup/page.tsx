"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { userSignup } from "@/Redux/Features/userSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../hooks/TypedHooks";
import Loading from "@/components/Loading";

const Signup = () => {
  const [User, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.user);

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...User, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(userSignup(User));
  };

  useEffect(() => {
    if (error) {
      alert("error occured Retry");
      return;
    }
    if (user) router.push(`/profile/${user._id}`);
  }, [user, error, router]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Signup</h1>
      <hr className="text-white mt-6 w-56" />

      <form className="flex flex-col p-4" onSubmit={handleSubmit}>
        <div className="group m-2 flex flex-col justify-between">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            value={User.name}
            placeholder="Enter your name"
            className="text-black placeholder:text-gray-600 rounded-sm px-3 py-1"
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className="group m-2 flex flex-col justify-between">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            value={User.email}
            placeholder="Enter your email"
            className="text-black placeholder:text-gray-600 rounded-sm px-3 py-1"
            onChange={handleChange}
            type="email"
          />
        </div>
        <div className="group m-2 flex flex-col justify-between">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            className="text-black placeholder:text-gray-600 rounded-sm px-3 py-1"
            value={User.password}
            placeholder="Enter your password"
            onChange={handleChange}
            type="password"
          />
        </div>
        <button
          type="submit"
          className="my-2 bg-black text-white p-2 px-6 rounded-lg w-2/3 mx-auto border-2 border-white"
        >
          {isLoading ? <Loading /> : "Signup"}
        </button>
        <Link className="text-center" href={"/login"}>
          <span className="text-center my-2">Visit Login Page</span>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
