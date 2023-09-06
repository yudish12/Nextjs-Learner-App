import { NextRequest, NextResponse } from "next/server";
import { checkToken, connectDB } from "./app/utils/config";

export async function middleware(req: NextRequest) {
  let token: string | undefined;
  token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }
  await checkToken(token);
}

export const config = {
  matcher: ["/profile/:path*"],
};
