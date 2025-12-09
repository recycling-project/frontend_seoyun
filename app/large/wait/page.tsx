"use client";

import { useLargeWaitUpload } from "@/features/large/hooks/useLargeWaitUpload";

export default function LargeWaitPage() {
  useLargeWaitUpload();

  return (
    <div className="relative w-[1080px] h-[1920px] bg-black flex items-center justify-center">
      <p className="text-white text-[48px] font-semibold">
        휴대폰 업로드 대기 중...
      </p>
    </div>
  );
}
