"use client";

import { useState, useRef } from "react";

export default function MobileUploadPage() {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("선택된 파일 없음");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileOpen = () => {
    fileInputRef.current?.click();
  };

  const handleMobileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result as string;

      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recycle/mobile-upload`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });

        alert("사진 업로드 완료!");
      } catch (err) {
        console.error("업로드 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full h-full bg-white">
      {/* 상단 녹색 바 */}
      <div className="w-full h-[220px] bg-[#36A64A] relative">
        <img
          src="/back_icon.png"
          className="absolute top-[60px] left-[40px] w-[90px] h-[90px] cursor-pointer"
          onClick={() => history.back()}
        />
      </div>

      {/* 제목 */}
      <h2 className="text-center text-[55px] font-bold text-[#333] mt-[100px]">
        휴대폰에서 사진 선택
      </h2>

      {/* 업로드 카드 */}
      <div className="
          mx-auto mt-[60px] w-[85%] max-w-[800px]
          bg-[#F5FBF7] rounded-[20px] border-[4px] border-[#B8E6C0]
          p-[40px] text-center
        "
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleMobileUpload}
          className="hidden"
        />

        <button
          onClick={handleFileOpen}
          className="
            w-full h-[120px] bg-white rounded-[14px]
            text-[32px] font-semibold border border-[#B8E6C0]
          "
        >
          파일 선택
        </button>

        <p className="mt-6 text-[30px] text-[#333]">{fileName}</p>

        {loading && (
          <div className="mt-8 text-[40px] font-semibold text-[#333] animate-pulse">
            업로드 중입니다...
          </div>
        )}
      </div>
    </div>
  );
}
