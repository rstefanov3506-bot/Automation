import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// .com visitors see the English homepage at "/", .bg visitors see Bulgarian.
// Both domains point at this same deployment (see README for DNS setup).
export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  if (pathname === "/" && host.includes(".com")) {
    return NextResponse.rewrite(new URL("/en", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
