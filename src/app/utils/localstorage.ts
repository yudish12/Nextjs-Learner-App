"use client";
import { UserTypes } from "../../Redux/Features/userSlice";

export const addUserToLocalStorage = (user: UserTypes) => {
  localStorage?.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage?.removeItem("user");
};

export const getUserFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const result = localStorage.getItem("user");
    const user = result ? JSON.parse(result) : null;
    return user;
  }
  return null;
};
