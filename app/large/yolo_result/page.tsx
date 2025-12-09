"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useLargeYoloResult } from "@features/large/hooks/useLargeYoloResult";

function ResultUI() {
  const router = useRouter();
  const { photo, cls, korean } = useLargeYoloResult();

  return (
    <div className="relative w-[1080px] h-[1920px] bg-white overflow-hidden">

      {/* 상단 바 */}
      <div className="absolute top-0 left-0 w-full h-[220px] bg-[#36A64A]" />

      {/* 뒤로가기 */}
      <img
        src="/back_icon.png"
        className="absolute top-[60px] left-[40px] w-[90px] h-[90px] cursor-pointer z-20"
        onClick={() => router.replace("/menu")}
      />

      {/* 메인 영역 */}
      <div className="absolute top-[220px] left-0 w-full flex flex-col items-center pt-[80px]">

        {/* 이미지 박스 */}
        <div className="w-[75%] max-w-[450px] aspect-square bg-[#F5FBF7] border-[4px] border-[#B8E6C0] rounded-[20px] overflow-hidden">
          {photo ? (
            <img src={photo} className="w-full h-full object-cover" />
          ) : (
            <p className="text-[#555] text-[32px] text-center mt-[160px]">
              사진 없음
            </p>
          )}
        </div>

        {/* 자동 분류 버튼 */}
        {cls && (
          <button
            onClick={() => router.push(`/large/select_menu/options/${cls}`)}
            className="mt-[80px] w-[420px] h-[160px] bg-black text-white font-bold text-[46px] rounded-[35px]"
          >
            {korean}
          </button>
        )}

        {/* 직접 선택하기 */}
        <button
          onClick={() => router.push("/large/select_menu")}
          className="mt-[60px] w-[420px] h-[160px] bg-[#A0DDAB] text-white font-bold text-[46px] rounded-[35px]"
        >
          전체 목록에서 선택
        </button>
      </div>
    </div>
  );
}

export default function LargeYoloResultPage() {
  return (
    <Suspense fallback={<div></div>}>
      <ResultUI />
    </Suspense>
  );
}
