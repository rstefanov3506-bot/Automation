import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Bulgarian routes live at the root; English mirrors each one under /en.
// .com visitors get rewritten from the bg path to its /en equivalent,
// .bg visitors see the bg path as-is. Both domains point at this same
// deployment (see README for DNS setup).
const BG_ROUTES = ["/", "/automations", "/pricing", "/contact"];

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  if (host.includes(".com") && BG_ROUTES.includes(pathname)) {
    const target = pathname === "/" ? "/en" : `/en${pathname}`;
    return NextResponse.rewrite(new URL(target, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/automations", "/pricing", "/contact"],
};
