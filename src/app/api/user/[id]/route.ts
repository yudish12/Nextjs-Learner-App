import { connectDB } from "@/app/utils/config";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const user = await User.findById(id);
    return NextResponse.json({
      message: "Logged In successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
}
