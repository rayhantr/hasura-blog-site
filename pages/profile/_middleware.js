import { NextResponse } from "next/server";

export function middleware(req) {
  if (req.cookies.nhostRefreshToken) return;
  return NextResponse.redirect("/login");
}
