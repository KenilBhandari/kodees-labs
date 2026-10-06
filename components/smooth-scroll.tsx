"use client";

import { useEffect, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import "lenis/dist/lenis.css";

function ScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [lenis, pathname]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.09,
        smoothWheel: true,
        anchors: { offset: -80 },
      }}
    >
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}
