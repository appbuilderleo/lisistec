import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only intercept /crm routes
  if (pathname.startsWith("/crm")) {
    const sessionCookie = request.cookies.get("lisis_crm_session")?.value;
    const isLoginPage = pathname === "/crm/login";

    // If trying to access CRM protected route without session cookie, redirect to login
    if (!sessionCookie && !isLoginPage) {
      const loginUrl = new URL("/crm/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // If already has session cookie and visits login page, redirect to CRM dashboard
    if (sessionCookie && isLoginPage) {
      const dashboardUrl = new URL("/crm", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/crm/:path*"],
};
