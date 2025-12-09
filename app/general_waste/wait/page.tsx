// app/general_waste/wait/page.tsx
"use client";
import { useWaitForUpload } from "@features/general/hooks/useWaitForUpload";

export default function WaitPage() {
  useWaitForUpload();

  return (
    <div className="relative w-[1080px] h-[1920px] bg-black flex items-center justify-center">
      <p className="text-white text-[48px] font-semibold">
        휴대폰 업로드 대기 중...
      </p>
    </div>
  );
}
