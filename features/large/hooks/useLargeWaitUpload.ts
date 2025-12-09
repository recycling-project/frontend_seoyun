/**
 * 📌 useLargeWaitUpload
 * ---------------------------------------------------------
 * ✔ 역할
 *   - 모바일이 대형폐기물 사진을 업로드했는지 감지하는 훅
 *   - QR 업로드 이후 "대기 화면"에서 실행되며 업로드 완료 ID를 기다림
 *
 * ✔ 사용 시나리오
 *   - /large/wait 페이지에서 사용됨
 *   - 사용자가 QR을 스캔 → 모바일에서 사진 업로드
 *   - 서버가 PHOTO 업로드되면 lastUploadedId를 저장
 *   - 이 훅은 그걸 1초마다 체크해서 자동으로 다음 단계로 이동함
 *
 * ✔ 처리 흐름
 *   1) 1초마다 /large/check 호출
 *      - GET /large/check → { id: 업로드ID } 또는 { id: null }
 *
 *   2) 업로드 감지
 *      - data.id가 존재하면 업로드가 완료된 것
 *      - 즉시 타이머 종료 → /large/analyze?id=업로드ID 로 이동
 *
 *   3) cleanup
 *      - 페이지 이동 또는 언마운트 시 setInterval 제거
 *
 * ✔ 반환값
 *   - 없음 (자동 동작하는 감시 훅)
 *
 * ✔ 사용 위치
 *   - app/large/wait/page.tsx
 * ---------------------------------------------------------
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useLargeWaitUpload = () => {
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/check`);
                const data = await res.json();

                if (data.id) {
                    clearInterval(timer);
                    router.push(`/large/analyze?id=${data.id}`);
                }
            } catch (err) {
                console.error("대형 업로드 체크 오류:", err);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);
};
