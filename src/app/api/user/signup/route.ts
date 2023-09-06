import { connectDB } from "@/app/utils/config";
import User from "@/models/userModel";
import { signToken } from "@/app/utils/config";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const { email, name, password } = await req.json();
    const user = await User.findOne({ email: email });
    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 500 }
      );
    }

    const userData = new User({
      name,
      email,
      password,
    });
    await userData.save();

    const token = await signToken(userData);

    const response = NextResponse.json(
      { message: "hello", data: userData },
      { status: 200 }
    );

    response.cookies.set("token", token);

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Hello from Next.js!" },
      { status: 500 }
    );
  }
}
