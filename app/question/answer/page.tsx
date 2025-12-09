"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useQuestionAnswer } from "@/question/hooks/useQuestionAnswer";

function QuestionAnswerUI() {
  const router = useRouter();
  const { content } = useQuestionAnswer();

  return (
    <div className="w-[1080px] h-[1920px] bg-white overflow-hidden relative">

      {/* 상단 바 */}
      <div className="absolute top-0 left-0 w-full h-[220px] bg-[#36A64A]" />

      {/* 뒤로가기 */}
      <img
        src="/back_icon.png"
        onClick={() => router.push("/question")}
        className="absolute top-[60px] left-[40px] w-[90px] h-[90px] cursor-pointer"
      />

      {/* 결과 박스 */}
      <div
        className="
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[90%] max-w-[900px] h-[85vh]
          bg-black/70 text-white
          p-8 rounded-2xl overflow-y-auto text-[32px] leading-[1.6]
          whitespace-pre-wrap shadow-[0_0_20px_rgba(0,0,0,0.6)]
        "
      >
        {content || "결과를 불러올 수 없습니다."}
      </div>

      {/* 다시 질문하기 버튼 */}
      <button
        onClick={() => router.replace("/question")}
        className="
          absolute bottom-[120px] left-1/2 -translate-x-1/2
          w-[420px] h-[160px]
          bg-[#A0DDAB] text-white font-bold text-[46px]
          rounded-[35px] shadow-md
        "
      >
        다시 질문하기
      </button>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <QuestionAnswerUI />
    </Suspense>
  );
}
