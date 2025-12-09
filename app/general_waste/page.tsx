"use client";
import { useRouter } from "next/navigation";
import { useGeneralCapture } from "@/features/general/hooks/useGeneralCapture";

export default function GeneralWastePage() {  
  const router = useRouter();
  const { videoRef, handleCapture } = useGeneralCapture();

  return (
    <div className="relative w-[1080px] h-[1920px] overflow-hidden bg-black">

      <img
        src="/back_icon.png"
        className="absolute top-[60px] left-[40px] w-[90px] h-[90px] cursor-pointer z-50"
        onClick={() => history.back()}
      />

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute top-[350px] left-1/2 -translate-x-1/2 text-center text-white z-20">
        <img
          src="/Green_camera.png"
          className="w-[250px] h-[250px] brightness-0 invert"
        />
        <p className="mt-6 text-[50px] leading-[70px] font-medium">
          분리수거할 품목을 <br /> 카메라에 잘 보이게 <br /> 배치해 주세요.
        </p>
      </div>

      <div className="absolute bottom-[160px] left-1/2 -translate-x-1/2 flex flex-col gap-[110px] z-20">
        <button
          onClick={handleCapture}
          className="w-[500px] h-[200px] bg-[#A0DDAB] rounded-[35px] text-white text-[48px] font-bold"
        >
          촬영하기
        </button>

        <button
          onClick={() => router.push("/general_waste/qr")}
          className="w-[500px] h-[200px] bg-[#A0DDAB] rounded-[35px] text-white text-[48px] font-bold"
        >
          QR로 사진 업로드
        </button>
      </div>
    </div>
  );
}
