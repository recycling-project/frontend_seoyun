/**
 * 📌 useGeneralCapture
 * ---------------------------------------------------------
 * ✔ 역할
 *   - 카메라 훅(useGeneralCamera)로부터 videoRef + capturePhoto를 가져옴
 *   - 촬영 버튼 클릭 시 사진을 캡처하여 base64로 저장
 *   - localStorage("wasteImage")에 이미지 저장
 *   - 일반 분석 페이지(/general_waste/analyze)로 이동
 *
 * ✔ 반환값
 *   - videoRef : <video>에 연결되는 ref 객체
 *   - handleCapture : 촬영 + 저장 + 라우팅 처리
 *
 * ✔ 사용 위치
 *   - app/general_waste/page.tsx (촬영 화면)
 *
 * ✔ 흐름
 *   1. capturePhoto() 실행하여 base64 획득
 *   2. wasteImage로 localStorage에 저장
 *   3. analyze 페이지로 이동
 * ---------------------------------------------------------
 */


"use client";

import { useRouter } from "next/navigation";
import { useGeneralCamera } from "./useGeneralCamera";

export const useGeneralCapture = () => {
  const router = useRouter();
  const { videoRef, capturePhoto } = useGeneralCamera();

  const handleCapture = () => {
    const base64 = capturePhoto();
    if (!base64) return;

    localStorage.setItem("wasteImage", base64);
    router.push("/general_waste/analyze");
  };

  return { videoRef, handleCapture };
};
