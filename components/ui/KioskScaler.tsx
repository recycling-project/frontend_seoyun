"use client";

import { useEffect, useRef } from "react";

export default function KioskScaler({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function resize() {
      const baseWidth = 1080;
      const baseHeight = 1920;

      const screenW = window.innerWidth;
      const screenH = window.innerHeight;

      const scale = Math.min(screenW / baseWidth, screenH / baseHeight);

      if (rootRef.current) {
        rootRef.current.style.transform = `scale(${scale})`;
      }
    }

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
      <div
        ref={rootRef}
        style={{
          width: "1080px",
          height: "1920px",
          transformOrigin: "center",   // ⭐ 중앙 기준으로 변경
          background: "white",
        }}
      >
        {children}
      </div>
    </div>
  );
}