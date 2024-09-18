import { NextRequest, NextResponse } from "next/server";
import { validateJWT } from "./utils/cookies";
import { isAuthorized } from "./lib/utils";

const protectedRoutes = {
  "/admin": "admin",
  "/manager": "manager",
  "/writer": "writer",
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const roleRequired = protectedRoutes[pathname];

  if (roleRequired) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    try {
      const decodedToken = await validateJWT(token);

      if (!decodedToken) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }

      const userRole: string = decodedToken.user_role;

      if (!isAuthorized(userRole, roleRequired)) {
        return NextResponse.redirect(new URL("/403", req.url));
      }
    } catch (error) {
      console.error("Middleware JWT validation error:", error);
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/writer", "/manager"],
};
