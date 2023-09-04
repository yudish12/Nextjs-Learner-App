import { connectDB, signToken } from "@/utils/config";
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

    const token = signToken({ _id, name, email, isVerified, isAdmin });

    return NextResponse.json({
      message: "Logged In successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
}
