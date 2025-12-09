"use client";

import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect } from "react";

export default function QRPage() {
  const uploadUrl =
    "https://frontend-self-delta-10.vercel.app/general_waste/mobile-upload";

  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/recycle/reset`, {
      method: "POST",
    });

    const timer = setInterval(async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recycle/check`);
      const data = await res.json();

      if (data.id) {
        clearInterval(timer);
        router.push("/general_waste/wait");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-[1080px] h-[1920px] bg-white overflow-hidden">

      {/* 상단 바 */}
      <div className="absolute top-0 left-0 w-full h-[220px] bg-[#36A64A]" />

      {/* 뒤로가기 아이콘 */}
      <img
        src="/back_icon.png"
        onClick={() => router.back()}
        className="absolute top-[60px] left-[40px] w-[90px] h-[90px] cursor-pointer z-50"
      />

      {/* QR — ⭐ 원하는 위치(두 번째 사진처럼) */}
      <div
        className="
          absolute left-1/2 
          -translate-x-1/2 
          top-[700px]      /* 큐알코드높이조절 */
          flex justify-center items-center
        "
      >
        <QRCodeCanvas value={uploadUrl} size={320} /> 
      </div>

      {/* 안내문 */}
      <p
        className="
          absolute top-[1050px] 
          w-full text-center 
          text-[40px] text-[#444]
        "
      >
        QR을 휴대폰으로 스캔하세요
      </p>
    </div>
  );
}
