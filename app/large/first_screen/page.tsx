"use client";

import { useRouter } from "next/navigation";
import { useLargeCapture } from "@features/large/hooks/useLargeCapture";

export default function LargeCameraPage() {
  const router = useRouter();
  const { videoRef, handleCapture } = useLargeCapture();

  return (
    <div className="relative w-[1080px] h-[1920px] bg-black mx-auto">

      {/* 뒤로가기 */}
      <img
        src="/back_icon.png"
        alt="뒤로가기"
        className="absolute top-[60px] left-[40px] w-[90px] h-[90px] z-50 cursor-pointer"
        onClick={() => router.replace("/menu")}
      />

      {/* 카메라 화면 */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 안내 UI */}
      <div className="absolute top-[350px] left-1/2 -translate-x-1/2 text-center text-white z-50">
        <img
          src="/Green_camera.png"
          className="w-[250px] h-[250px] brightness-0 invert"
        />
        <p className="mt-6 text-[50px] leading-[70px] font-medium">
          분리수거할 품목을 <br /> 카메라에 잘 보이게 <br /> 배치해 주세요.
        </p>
      </div>

      {/* 버튼 */}
      <div className="absolute bottom-[160px] left-1/2 -translate-x-1/2 flex flex-col gap-[110px] z-50">
        <button
          onClick={handleCapture}
          className="w-[500px] h-[200px] bg-[#A0DDAB] rounded-[35px] shadow-xl text-white text-[48px] font-bold"
        >
          촬영하기
        </button>

        <button
          onClick={() => router.push("/large/qr")}
          className="w-[500px] h-[200px] bg-[#A0DDAB] rounded-[35px] shadow-xl text-white text-[48px] font-bold"
        >
          QR로 사진 업로드
        </button>
      </div>
    </div>
  );
}
