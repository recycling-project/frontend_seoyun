/**
 * 📌 useQRCheck
 * ---------------------------------------------------------
 * ✔ 역할
 *   - QR 업로드를 기다리는 동안 주기적으로 서버에 업로드 상태를 조회
 *   - 업로드가 감지되면(wait 조건 충족) 대기 화면(/general_waste/wait)으로 이동
 *
 * ✔ 처리 흐름
 *   1) 페이지 진입 시 Spring 서버의 업로드 상태 초기화(reset)
 *   2) setInterval로 1초마다 /recycle/check 요청
 *   3) 서버에서 { id } 값이 오면 → 업로드 완료로 판단
 *   4) 타이머 중지 후 /general_waste/wait 페이지로 이동
 *
 * ✔ 특징
 *   - cleanup(return)에서 interval을 확실하게 정리하여 메모리 누수 방지
 *   - QR 코드 페이지에서만 실행되는 polling 기반 체크 훅
 *
 * ✔ 반환값
 *   - 없음 (사이드 이펙트 기반 자동 동작)
 *
 * ✔ 사용 위치
 *   - app/general_waste/qr/page.tsx (QR로 업로드 대기 화면)
 * ---------------------------------------------------------
 */



"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useQRCheck = () => {
  const router = useRouter();

  useEffect(() => {
    // 서버 초기화
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/recycle/reset`, {
      method: "POST",
    });

    // 업로드 감지
    const timer = setInterval(async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/recycle/check`
        );
        const data = await res.json();

        if (data.id) {
          clearInterval(timer);
          router.push("/general_waste/wait");
        }
      } catch (err) {
        console.error("QR 체크 오류:", err);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);
};
