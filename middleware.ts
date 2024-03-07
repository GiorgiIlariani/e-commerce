//middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const protectedRoutes = ["/", ""];


export default function middleware(req: NextRequest) {
  let isAuthenticated = true;

  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/sign-in", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  
}