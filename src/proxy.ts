import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const pathname = request.nextUrl.pathname;

  // Guest User
  if (!session) {
    if (
      pathname.startsWith("/profile") ||
      pathname.startsWith("/cases/") ||
      pathname.startsWith("/dashboard")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }

  // Logged-in user cannot access login/register
  if (pathname === "/login" || pathname === "/register") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/cases/") && session?.user?.userType === "general") {
    return NextResponse.redirect(new URL(`/cases`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/cases/:path*", "/profile"],
};
