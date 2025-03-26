import { NextRequest, NextResponse } from "next/server";

export async function middleware(requset: NextRequest) {
  const accessToken = requset.cookies.get("accessToken")?.value;
  const refreshToken = requset.cookies.get("refreshToken")?.value;
  const publicPaths = ["/login", "/register"];
  if (publicPaths.some((path) => requset.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }
  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL("/login", requset.url));
  }

  try {
    const verifyResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/token/verify/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: accessToken }),
      },
    );

    if (!verifyResponse.ok) {
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/token/refresh/`,
        {
          method: "POST",
          body: JSON.stringify({ refresh: refreshToken }),
        },
      );
      if (!refreshResponse.ok) {
        return NextResponse.redirect(new URL("/login", requset.url));
      }
      const { accessToken: newAccessToken } = await refreshResponse.json();
      const response = NextResponse.next();

      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
      return response;
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", requset.url));
  }
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
