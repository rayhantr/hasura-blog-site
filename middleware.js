import { NextResponse } from "next/server";

export function middleware(request) {
  if (request.cookies.get("nhostSession")) return;
  return NextResponse.redirect(new URL("/login", request.url));
}

// Define paths for which the middleware will run
export const config = { matcher: ["/create/:path*", "/profile/:path*"] };
