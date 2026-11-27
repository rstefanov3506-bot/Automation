import "@fontsource-variable/onest";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/rubik";
import "../app/globals.css";
import MouseDrone from "@/components/MouseDrone";
import SiteBackground from "@/components/SiteBackground";

// Shared <html> shell for the two root layouts: app/(bg) and app/(en).
// Two root layouts exist only so each language gets the right <html lang>.

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

export default function RootShell({
  lang,
  children,
}: {
  lang: "bg" | "en";
  children: React.ReactNode;
}) {
  return (
    <html lang={lang} className="h-full antialiased" suppressHydrationWarning>
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
