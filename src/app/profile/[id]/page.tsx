"use client";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks/TypedHooks";
import { userDetails } from "@/Redux/Features/userSlice";
import { useRouter } from "next/navigation";
import { convertDate } from "@/app/utils/config";
import pfp from "../../../../public/pfp.svg";
import Dp from "../../../../public/a152e0ae56613ca2b08182b3f6153cb1.png";
import Tick from "../../../../public/1538299575.svg";
import Image from "next/image";
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
    <div className="mx-auto flex flex-col justify-center mt-12 items-center rounded-lg bg-black-shade shadow-inner-md w-1/4 border-t-2 border-b-2 border-gray-700">
      <Image width={250} height={250} src={Dp} alt="pfp" />
      <div className="info mt-6 flex flex-col justify-center items-center p-4">
        <span className="text-3xl capitalize font-semibold">{user?.name}</span>
        <span className="text-xl capitalize font-normal m-2">
          Joined on {convertDate(user?.createdAt!)}
        </span>
        <a
          className="flex px-4 py-3 m-2 rounded-lg bg-white text-black gap-2 items-center"
          href={`mailto:${user?.email}`}
        >
          <Image src={pfp} alt="pfp" />
          <span className="font-semibold text-lg">Get In Touch</span>
        </a>
        {user?.isVerified ? (
          <span className="m-1 flex items-center justify-between">
            <span className="texi-xl font-semibold">Verified</span>{" "}
            <Image src={Tick} alt="pfp" />
          </span>
        ) : (
          <a className="m-3 flex items-center justify-between texi-xl font-semibold">
            Verify Your Self Click Here
          </a>
        )}
      </div>
    </div>
  );
};

export default Page;
