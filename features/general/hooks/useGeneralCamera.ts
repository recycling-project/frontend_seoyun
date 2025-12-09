/**
 * 📌 useGeneralCamera
 * ---------------------------------------------------------
 * ✔ 역할
 *   - 브라우저 getUserMedia API를 이용해 카메라 스트림 실행
 *   - videoRef를 통해 <video> 태그에 스트림 연결
 *   - canvas를 사용해 현재 화면을 base64 이미지로 변환
 *
 * ✔ 기능
 *   - startCamera(): 페이지 로드 시 자동 실행
 *   - capturePhoto(): 캔버스에 현재 영상을 그려 base64 반환
 *
 * ✔ 반환값
 *   - videoRef : 카메라 프리뷰용 <video> ref
 *   - capturePhoto : 사진 촬영 함수(base64 반환)
 *
 * ✔ 사용 위치
 *   - useGeneralCapture.ts
 *
 * ✔ 흐름
 *   1. 페이지 로드시 카메라 권한 요청
 *   2. videoRef.current.srcObject = stream
 *   3. 촬영 요청 → canvas에 그려 base64 생성
 * ---------------------------------------------------------
 */


import { useRef, useEffect } from "react";

export const useGeneralCamera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 카메라 실행
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().catch(() => {});
          };
        }
      } catch (err) {
        console.error("카메라 실행 오류:", err);
      }
    };

    startCamera();
  }, []);

  // 촬영
  const capturePhoto = (): string | null => {
    if (!videoRef.current) return null;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64 = canvas.toDataURL("image/png");
    return base64;
  };

  return { videoRef, capturePhoto };
};
