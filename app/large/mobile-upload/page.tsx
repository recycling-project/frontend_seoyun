"use client";

import { useLargeMobileUpload } from "@features/large/hooks/useLargeMobileUpload";

export default function LargeMobileUploadPage() {
  const {
    loading,
    fileName,
    fileInputRef,
    openFileDialog,
    handleUpload,
  } = useLargeMobileUpload();

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpload(e.target.files?.[0] ?? null);
  };

  return (
    <div className="w-full h-full bg-white">
      {/* 상단 바 */}
      <div className="w-full h-[220px] bg-[#36A64A] relative">
        <img
          src="/back_icon.png"
          className="absolute top-[60px] left-[40px] w-[90px] h-[90px] cursor-pointer"
          onClick={() => history.back()}
        />
      </div>

      <h2 className="text-center text-[55px] font-bold text-[#333] mt-[100px]">
        휴대폰에서 사진 선택
      </h2>

      <div
        className="
          mx-auto mt-[60px] w-[85%] max-w-[800px]
          bg-[#F5FBF7] rounded-[20px] border-[4px] border-[#B8E6C0]
          p-[40px] text-center
        "
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onChangeFile}
        />

        <button
          onClick={openFileDialog}
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
