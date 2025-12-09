"use client";

import { QRCodeCanvas } from "qrcode.react";
import { useLargeQRCheck } from "@features/large/hooks/useLargeQRCheck";

export default function LargeQRPage() {
  useLargeQRCheck();

  const uploadUrl =
    "https://frontend-self-delta-10.vercel.app/large/mobile-upload";

  return (
    <div className="relative w-[1080px] h-[1920px] bg-white overflow-hidden">

      {/* 상단 바 */}
      <div className="absolute top-0 left-0 w-full h-[220px] bg-[#36A64A]" />

      {/* 뒤로가기 */}
      <img
        src="/back_icon.png"
        className="absolute top-[60px] left-[40px] w-[90px] h-[90px] cursor-pointer z-50"
        onClick={() => history.back()}
      />

      {/* QR 코드 */}
      <div
        className="
          absolute left-1/2 
          -translate-x-1/2 
          top-[700px]
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
