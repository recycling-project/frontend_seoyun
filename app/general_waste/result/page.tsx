"use client";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useWasteResult } from "@/features/general/hooks/useWasteResult";

function WasteResultContent() {
  const router = useRouter();
  const { photo, content } = useWasteResult();

  return (
    <div className="relative w-[1080px] h-[1920px] bg-white overflow-hidden">
      {/* TOP BAR */}
      <div className="absolute top-0 left-0 w-full h-[220px] bg-[#36A64A]" />

      {/* 뒤로가기 버튼 */}
      <img
        src="/back_icon.png"
        className="absolute top-[60px] left-[40px] w-[90px] h-[90px] cursor-pointer z-20"
        onClick={() => router.replace("/menu")}
      />

      {/* MAIN CONTENT */}
      <div className="absolute top-[220px] left-0 w-full h-[1700px] flex flex-col items-center pt-[80px]">
        <div className="w-[75%] max-w-[450px] aspect-square bg-[#F5FBF7] border-[4px] border-[#B8E6C0] rounded-[20px] overflow-hidden flex items-center justify-center">
          {photo ? <img src={photo} className="w-full h-full object-cover" /> : <p className="text-[#555] text-[32px]">사진 없음</p>}
        </div>

        <div className="mt-[80px] w-[85%] max-w-[800px] h-[900px] bg-[#F5FBF7] border-[4px] border-[#B8E6C0] rounded-[20px] p-[26px] overflow-y-auto text-[#333] text-[35px] leading-[1.6]">
          {content ? (
            <>
              <h3 className="text-center text-[30px] mb-[16px] font-semibold">재활용 분석 결과</h3>
              <pre className="whitespace-pre-wrap break-words">{content}</pre>
            </>
          ) : (
            <p className="text-center text-[32px]">결과 데이터를 불러올 수 없습니다.</p>
          )}
        </div>

        <button
          onClick={() => router.replace("/general_waste")}
          className="mt-[80px] w-[420px] h-[160px] bg-[#A0DDAB] text-white font-bold text-[46px] rounded-[35px] shadow-md"
        >
          다시 촬영하기
        </button>
      </div>
    </div>
  );
}

export default function WasteResultPage() {
  return (
    <Suspense fallback={<div></div>}>
      <WasteResultContent />
    </Suspense>
  );
}
