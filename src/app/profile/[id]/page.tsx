"use client";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks/TypedHooks";
import { userDetails } from "@/Redux/Features/userSlice";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

type paramTypes = {
  params: { id: string };
};

const Page = (params: paramTypes) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      dispatch(userDetails(user._id));
    } else {
      router.push("/login");
    }
  }, [dispatch, router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center mt-48 items-center">
      <span className="text-center border-white border-2 text-4xl p-3 text-white rounded-sm mx-auto w-1/2">
        This is profile page with id - {params.params.id}
      </span>
    </div>
  );
};

export default Page;
