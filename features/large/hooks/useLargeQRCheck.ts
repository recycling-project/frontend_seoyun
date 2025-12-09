/**
 * 📌 useLargeQRCheck
 * ---------------------------------------------------------
 * ✔ 역할
 *   - 대형폐기물 QR 업로드를 감지하는 훅
 *   - 카메라로 촬영하지 않고, QR코드를 통해 모바일에서 업로드한 경우
 *     Spring 서버가 업로드 ID(lastUploadedId)를 저장함
 *   - 이 훅은 그 ID가 생성되는지 주기적으로 체크하는 역할
 *
 * ✔ 사용 시나리오
 *   - /large/qr/page.tsx 등 QR 코드 화면에서 자동 실행
 *   - 사용자가 QR을 스캔 → 모바일에서 사진 업로드
 *   - 서버에서 업로드가 감지되면 다음 페이지로 자동 이동
 *
 * ✔ 처리 흐름
 *   1) 페이지 진입 시 서버 초기화
 *      - POST /large/reset 호출로 이전 업로드 기록 제거
 *
 *   2) 업로드 감지 Polling
 *      - 1초마다 /large/check GET 요청
 *      - 서버가 { id: 업로드ID } 를 반환하면 업로드 완료로 판단
 *      - 즉시 타이머 종료하고 /large/wait 페이지로 이동
 *
 *   3) cleanup
 *      - 페이지 이동 또는 언마운트 시 setInterval 제거
 *
 * ✔ 반환값
 *   - 없음 (사이드 이펙트 목적 훅)
 *
 * ✔ 사용 위치
 *   - app/large/qr/page.tsx
 *   - QR 업로드 대기 페이지에서 항상 실행됨
 * ---------------------------------------------------------
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useLargeQRCheck = () => {
    const router = useRouter();

    useEffect(() => {
        // 서버 초기화
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/reset`, {
            method: "POST",
        });

        // 업로드 감지
        const timer = setInterval(async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/large/check`
                );
                const data = await res.json();

                if (data.id) {
                    clearInterval(timer);
                    router.push(`/large/wait`);
                }
            } catch (err) {
                console.error("대형 QR 체크 오류:", err);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);
};
