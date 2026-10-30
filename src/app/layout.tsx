import type { Metadata } from "next";
import "@fontsource-variable/onest";
import "./globals.css";
import MouseDrone from "@/components/MouseDrone";
import SiteBackground from "@/components/SiteBackground";

export const metadata: Metadata = {
  title: "Noxlytics — AI automations for business",
  description:
    "Noxlytics builds and runs AI automations — leads, chatbots, SEO, accounting integrations — with a dashboard that shows you what's happening.",
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
