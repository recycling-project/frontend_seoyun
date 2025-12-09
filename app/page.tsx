"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-[1080px] h-[1920px] bg-white flex flex-col items-center justify-start">

      {/* 제목 영역 */}
      <div className="mt-[250px] text-center">
        <span className="text-[120px] font-extrabold text-[#36A64A]">순</span>
        <span className="text-[120px] font-extrabold text-[#A0DDAB]">
          환<br />마루
        </span>

        <p className="text-[40px] text-[#666] mt-[40px]">
          분리수거 도움 키오스크
        </p>
      </div>

      {/* 안내문 */}
      <p className="text-[50px] text-[#444] mt-[80px]">
        시작하기 버튼을 눌러주세요
      </p>

      {/* 버튼 영역 (absolute 제거!) */}
      <div className="mt-auto mb-[240px]">
        <button
          onClick={() => router.push("/menu")}
          className="
            w-[450px] h-[150px]
            bg-[#A0DDAB] rounded-[20px]
            text-[60px] font-bold text-black
          "
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
