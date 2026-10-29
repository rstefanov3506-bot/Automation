import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noxlytics — AI automations for business",
  description:
    "Noxlytics builds and runs AI automations — leads, chatbots, SEO, accounting integrations — with a dashboard that shows you what's happening.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bg" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
