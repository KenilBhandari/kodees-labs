"use client";

import { useEffect, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import "lenis/dist/lenis.css";

function ScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    // Instant jump on route change, so no glide carries over from the last page.
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [lenis, pathname]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // Let Lenis drive its own rAF loop (recommended setup).
        autoRaf: true,
        // Buttery but responsive: slightly softer than the 0.1 default.
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        // Native-feeling anchor jumps with clearance for the sticky nav.
        anchors: { offset: -80 },
        // Honors prefers-reduced-motion automatically (smoothing off, instant jumps).
        respectReducedMotion: true,
      }}
    >
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}
