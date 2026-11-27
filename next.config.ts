import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // noxlytics.com is the only public origin. Send the default Vercel
  // production alias there too, so the same pages never live on two hosts
  // (duplicate content). Exact host match: preview URLs are untouched.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "noxlytics.vercel.app" }],
        destination: "https://noxlytics.com/:path*",
        permanent: true,
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
