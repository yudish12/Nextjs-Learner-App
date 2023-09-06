"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/app/hooks/TypedHooks";
import Link from "next/link";
import { userLogout } from "@/Redux/Features/userSlice";

const Navright = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logoutHandler = () => {
    dispatch(userLogout(""));
    router.push("/login");
  };

  return (
    <>
      {!user ? (
        <>
          <Link href={"/login"}>
            <span className="bg-white text-black p-2 px-6 rounded-lg">
              Login
            </span>
          </Link>
          <Link href={"/signup"}>
            <span className="bg-white text-black p-2 px-6 rounded-lg">
              Signup
            </span>
          </Link>
        </>
      ) : (
        <button
          onClick={logoutHandler}
          className="bg-white text-black p-2 px-6 rounded-lg"
        >
          Logout
        </button>
      )}
    </>
  );
};

export default Navright;
