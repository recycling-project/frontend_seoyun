"use client";

import { Suspense } from "react";
import { useGeneralAnalyze } from "@/features/general/hooks/useGeneralAnalyze";

export default function WasteAnalyzePage() {
  return (
    <Suspense fallback={<div></div>}>
      <AnalyzeUI />
    </Suspense>
  );
}

function AnalyzeUI() {
  // 로직은 훅이 전부 처리
  useGeneralAnalyze();

  return (
    <div className="relative w-[1080px] h-[1920px] overflow-hidden bg-gradient-to-b from-[#A0DDAB] to-[#36A64A]">

      {/*  뒤로가기 */}
      <img
        src="/back_icon.png"
        className="absolute top-[60px] left-[40px] w-[90px] h-[90px] cursor-pointer z-50"
        onClick={() => history.back()}
      />

      {/*  로딩 GIF  */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
        <img src="/Loding.gif" alt="로딩" className="w-[260px] h-[260px]" />
      </div>
    </div>
  );
}
