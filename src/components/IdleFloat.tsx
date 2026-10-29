"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Gentle continuous bob + sway, independent of AnimatedCard's hover tween
// (which animates the inner element, not this wrapper).
export default function IdleFloat({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const tween = gsap.to(ref.current, {
      y: -10,
      rotate: 0.6,
      duration: 3.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
