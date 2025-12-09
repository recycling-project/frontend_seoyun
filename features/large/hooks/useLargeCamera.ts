/**
 * 📌 useLargeCamera
 * ---------------------------------------------------------
 * ✔ 역할
 *   - 대형폐기물 촬영 페이지에서 카메라 실행을 담당하는 훅
 *   - 후면 카메라(facingMode: environment) 우선 사용
 *   - videoRef를 반환하여 <video> 태그에 연결해 실시간 화면을 보여줌
 *
 * ✔ 사용 시나리오
 *   - /large/capture 페이지에서 사진 촬영 기능 구현 시 사용
 *
 * ✔ 처리 흐름
 *   1) navigator.mediaDevices.getUserMedia 요청
 *      - 후면 카메라 우선 실행
 *      - 영상 스트림을 videoRef.current.srcObject에 연결
 *
 *   2) onloadedmetadata 이벤트에서 재생(play) 시도
 *      - 일부 브라우저 자동재생 정책 대응
 *
 * ✔ 반환값
 *   - videoRef : <video> 태그에 연결할 ref
 *
 * ✔ 사용 위치
 *   - app/large/capture/page.tsx
 * ---------------------------------------------------------
 */

"use client";

import { useRef, useEffect } from "react";

export const useLargeCamera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } }, // 후면 카메라 우선
          audio: false,
        });

        // 🎥 비디오 태그에 스트림 연결
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          // 메타데이터 로드 후 자동재생
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().catch(() => {});
          };
        }
      } catch (err) {
        console.error("카메라 실행 오류:", err);
      }
    }

    start();
  }, []);

  return { videoRef };
};
