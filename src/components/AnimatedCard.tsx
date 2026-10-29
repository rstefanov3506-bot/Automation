"use client";

import { useRef } from "react";
import gsap from "gsap";

export default function AnimatedCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      y: -6,
      rotate: 0.5,
      boxShadow: "0 16px 40px -12px rgba(16, 185, 129, 0.35)",
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      y: 0,
      rotate: 0,
      boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </div>
  );
}
