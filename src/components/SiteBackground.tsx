"use client";

import { usePathname } from "next/navigation";
import HeroParticles from "./HeroParticles";

const HOME_PATHS = new Set(["/", "/en"]);

// The particle canvas is a hero-scale flourish; keeping it running fixed
// behind every route (including the still-empty skeleton pages) added a
// background motion layer with nothing to justify it there. Limit it to
// the home routes, where the hero content gives it a reason to exist.
export default function SiteBackground() {
  const pathname = usePathname();
  if (!HOME_PATHS.has(pathname)) return null;

  return (
    <div className="fixed inset-0 z-0">
      <HeroParticles className="h-full w-full opacity-70 dark:opacity-60" />
    </div>
  );
}
