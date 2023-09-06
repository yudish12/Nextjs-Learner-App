import mongoose from "mongoose";
import * as jose from "jose";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connect", () => {
      console.log("MongoDB connected Successfully");
    });

    connection.on("error", (err) =>
      console.log("mongodb connection error" + err)
    );
  } catch (error) {
    console.log("Something Went Wrong!!");
    console.log(error);
  }
};

export const signToken = async (obj: any) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!);
      const alg = "HS256";

      const token = await new jose.SignJWT(obj)
        .setProtectedHeader({ alg })
        .setExpirationTime("2h")
        .sign(secret);

      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
};

export const checkToken = async (token: string) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!);

      const decodedToken: any = await jose.jwtVerify(token, secret);
      console.log(decodedToken);
      resolve(decodedToken._id);
    } catch (error: any) {
      console.log(error, 123);
      reject("error while checking token");
    }
  });
};
