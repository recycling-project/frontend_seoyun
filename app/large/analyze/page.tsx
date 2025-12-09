"use client";

import { Suspense } from "react";
import { useLargeAnalyze } from "@features/large/hooks/useLargeAnalyze";

function AnalyzeUI() {
  useLargeAnalyze();

  return (
    <div className="relative w-[1080px] h-[1920px] overflow-hidden bg-gradient-to-b from-[#A0DDAB] to-[#36A64A]">
      
      {/* 뒤로가기 */}
      <img
        src="/back_icon.png"
        className="absolute top-[60px] left-[40px] w-[90px] h-[90px] cursor-pointer z-50"
        onClick={() => history.back()}
      />

      {/* 로딩 GIF */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <img src="/Loding.gif" className="w-[260px] h-[260px]" />
      </div>
    </div>
  );
}

export default function AnalyzePage() {
  return (
    <Suspense fallback={<div></div>}>
      <AnalyzeUI />
    </Suspense>
  );
}
