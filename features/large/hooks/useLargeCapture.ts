/**
 * 📌 useLargeCapture
 * ---------------------------------------------------------
 * ✔ 역할
 *   - 대형폐기물 촬영 페이지에서 사진을 캡처하고 분석 페이지로 이동시키는 훅
 *   - 카메라(videoRef)는 useLargeCamera 훅을 재사용
 *
 * ✔ 사용 시나리오
 *   - /large/capture/page.tsx 촬영 페이지에서 사용
 *   - 사용자가 "촬영하기" 버튼을 누르면 해당 캡처 함수(handleCapture) 실행
 *
 * ✔ 처리 흐름
 *   1) video 태그에서 현재 프레임 가져오기
 *   2) canvas에 그 프레임을 그림 → base64 이미지 생성
 *   3) localStorage("largeImage")에 저장
 *   4) /large/analyze 페이지로 이동
 *
 * ✔ 반환값
 *   - videoRef : <video> 태그에 연결하는 ref
 *   - handleCapture() : 촬영 실행 함수
 *
 * ✔ 사용 위치
 *   - app/large/capture/page.tsx
 * ---------------------------------------------------------
 */

"use client";

import { useRouter } from "next/navigation";
import { useLargeCamera } from "../../large/hooks/useLargeCamera";

export const useLargeCapture = () => {
  const router = useRouter();
  const { videoRef } = useLargeCamera();

  const handleCapture = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");

    const w = video.videoWidth || 640;
    const h = video.videoHeight || 480;

    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(video, 0, 0, w, h);

    const base64 = canvas.toDataURL("image/png");

    localStorage.setItem("largeImage", base64);
    router.push("/large/analyze");
  };

  return {
    videoRef,
    handleCapture,
  };
};
