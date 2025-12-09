"use client";

import { useRouter } from "next/navigation";

export default function MenuPage() {
  const router = useRouter();

  return (
    <div className="w-[1080px] h-[1920px] bg-white overflow-hidden relative">

      {/* 상단 바 */}
      <div className="w-full h-[220px] bg-[#36A64A] absolute top-0 left-0">
        
        {/* 뒤로가기 버튼 */}
        <img
          src="/back_icon.png"
          onClick={() => router.push("/")}
          className="absolute top-[60px] left-[40px] w-[90px] h-[90px] cursor-pointer"
        />
      </div>

      {/* 메뉴 버튼 영역 */}
      <div className="absolute top-[650px] left-1/2 -translate-x-1/2 flex flex-col gap-[110px]">
        
        {[
          { text: "일반 재활용 안내", link: "/general_waste" },
          { text: "대형 폐기물\n수거 신청", link: "/large/first_screen" },
          { text: "질문하기", link: "/question" },
        ].map((btn, i) => (
          <button
            key={i}
            onClick={() => router.push(btn.link)}
            className="
              w-[500px] h-[200px]
              bg-[#A0DDAB] rounded-[35px]
              shadow-md border-none
              text-white text-[48px] font-bold
              whitespace-pre-line
            "
          >
            {btn.text}
          </button>
        ))}
      </div>

    </div>
  );
}
