import { connectDB, signToken } from "@/app/utils/config";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email: email });
    if (!user || !user.matchPassword(password)) {
      return NextResponse.json(
        { message: "Wrong Credentials Entered" },
        { status: 403 }
      );
    }
    const { _id, name, isVerified, isAdmin } = user;

    const token = await signToken({ _id, name, email, isVerified, isAdmin });

    const response = NextResponse.json(
      { message: "hello", data: user },
      { status: 200 }
    );

    response.cookies.set("token", token);

    return response;
  } catch (error) {
    console.log(error);
  }
}
