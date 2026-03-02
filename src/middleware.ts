import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { updateSession } from "./lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes: skip i18n, apply Supabase auth
  if (pathname.startsWith("/admin")) {
    return updateSession(request);
  }

  // API routes: pass through
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // All other routes: apply i18n middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
