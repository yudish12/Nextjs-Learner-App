"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  addTokenToLocalStorage,
  addUserToLocalStorage,
} from "@/utils/localstorage";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  console.log(router);

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await axios.post("/api/user/signup", user);
      addUserToLocalStorage(resp.data.data);
      addTokenToLocalStorage(resp.data.token);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      router.push("/profile");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Signup</h1>
      <hr className="text-white mt-6 w-56" />
      {loading ? (
        <span>Loading....</span>
      ) : (
        <form className="flex flex-col p-4" onSubmit={handleSubmit}>
          <div className="group m-2 flex flex-col justify-between">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              name="name"
              value={user.name}
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
              value={user.email}
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
              value={user.password}
              placeholder="Enter your password"
              onChange={handleChange}
              type="password"
            />
          </div>
          <button
            type="submit"
            className="my-2 bg-black text-white p-2 px-6 rounded-lg w-2/3 mx-auto border-2 border-white"
          >
            Signup
          </button>
          <Link className="text-center" href={"/login"}>
            <span className="text-center my-2">Visit Login Page</span>
          </Link>
        </form>
      )}
    </div>
  );
};

export default Signup;
