import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isAuthenticated = !!req.cookies.get("access-token");

  // if the user is not authenticated and tries to navigate to non-signin page, redirect to the signin page
  // else if the user is authenticated and tries to navigate to the signin page, redirect to the home page

  const isAuthRoute = req.nextUrl.pathname === "/signin";

  if (!isAuthenticated) {
    if (!isAuthRoute) {
      const url = req.nextUrl.clone();
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  } else if (isAuthRoute) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
}

export const config = { matcher: ["/", "/signin"] };
