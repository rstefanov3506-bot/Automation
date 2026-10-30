import type { Metadata } from "next";
import "@fontsource-variable/onest";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/rubik";
import "./globals.css";
import MouseDrone from "@/components/MouseDrone";
import SiteBackground from "@/components/SiteBackground";

// Absolute base for share-image URLs. Set NEXT_PUBLIC_SITE_URL once the
// custom domain is live; until then Vercel's production URL is used.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

// Root routes are the Bulgarian site; /en overrides these in its page.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Noxlytics — AI автоматизации за бизнеса",
  description:
    "Изграждаме и поддържаме AI автоматизации — SEO съдържание, социални мрежи, запитвания и чатботове — с табло, в което виждаш какво се случва.",
  openGraph: {
    type: "website",
    siteName: "Noxlytics",
    locale: "bg_BG",
    title: "Noxlytics — агенти, които работят вместо теб",
    description:
      "AI автоматизации за малкия бизнес: SEO съдържание, социални мрежи, запитвания и чатботове, с табло за контрол.",
  },
  twitter: { card: "summary_large_image" },
};

// Runs before paint so the right theme class is set with no flash.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bg" className="h-full antialiased">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <SiteBackground />
        <MouseDrone />
        <div className="relative z-[1] flex min-h-full flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
