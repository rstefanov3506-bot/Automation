import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security headers for every response. Scripts are not restricted by a CSP
  // yet (GTM injects arbitrary tags); the CSP below only blocks framing,
  // plugins and foreign <base>/<form> targets, which is safe with GTM.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
          },
        ],
      },
    ];
  },
  experimental: {
    // Two root layouts (app/(bg), app/(en)) -> one shared 404 page.
    globalNotFound: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
