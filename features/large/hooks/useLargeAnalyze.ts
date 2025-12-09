/**
 * 📌 useLargeAnalyze
 * ---------------------------------------------------------
 * ✔ 역할
 *   - 대형폐기물 분석 페이지에서 자동으로 실행되는 훅
 *   - 이미지(base64) 또는 모바일 업로드(QR) id 기반으로 YOLO 분석 수행
 *   - 분석 결과(JSON)를 yolo_result 페이지로 전달
 *
 * ✔ 사용 시나리오
 *   - /large/analyze 페이지에서 자동 실행
 *   - 두 가지 흐름 처리:
 *       1) 키오스크 카메라 촬영 (localStorage에 base64 존재)
 *       2) 모바일 업로드 (Spring 서버에서 base64 받아야 함)
 *
 * ✔ 처리 흐름
 *   1) base64 확인
 *      - localStorage("large_waste_image")가 있으면 그대로 사용
 *      - 없고 id가 있으면 → Spring 서버 /large/image?id=xxx 로 base64 불러옴
 *
 *   2) base64 → FormData 변환
 *      - FastAPI YOLO 모델이 multipart/form-data 입력만 받기 때문에 변환
 *
 *   3) YOLO 분석 요청
 *      - FastAPI( /predict/recycle_item )로 분석 요청
 *      - 결과(JSON)를 /large/yolo_result 로 전달
 *
 * ✔ 반환값
 *   - 없음 (자동 실행되는 사이드 이펙트 훅)
 *
 * ✔ 사용 위치
 *   - app/large/analyze/page.tsx
 * ---------------------------------------------------------
 */

"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const useLargeAnalyze = () => {
    const router = useRouter();
    const params = useSearchParams();

    const id = params.get("id");

    useEffect(() => {
        async function run() {
            let base64 =
                typeof window !== "undefined"
                    ? localStorage.getItem("large_waste_image")
                    : null;

            // 1) 모바일 업로드인 경우 Spring에서 이미지 가져오기
            if (!base64 && id) {
                try {
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/large/image?id=${id}`
                    );
                    const data = await res.json();

                    if (!data?.image) {
                        alert("이미지를 불러올 수 없습니다.");
                        return;
                    }

                    base64 = data.image;
                    if (base64) {
                        localStorage.setItem("large_waste_image", base64);
                    }
                } catch (e) {
                    console.error("이미지 로드 실패", e);
                    alert("이미지를 불러오는 중 오류가 발생했습니다.");
                    return;
                }
            }

            if (!base64) {
                alert("이미지가 없습니다.");
                return;
            }

            // 2) base64 → FormData 변환
            const form = base64ToFormData(base64);

            // 3) FastAPI YOLO 분석 요청
            try {
                const url = `${process.env.NEXT_PUBLIC_FASTAPI_URL}/predict/recycle_item`;
                const res = await fetch(url, {
                    method: "POST",
                    body: form,
                });

                const result = await res.json();

                router.push(
                    "/large/yolo_result?data=" +
                    encodeURIComponent(JSON.stringify(result))
                );
            } catch (e) {
                console.error("YOLO 요청 실패:", e);
                alert("분석 중 오류가 발생했습니다.");
            }
        }

        run();
    }, [id]);

    // base64 → FormData 변환 함수
    function base64ToFormData(base64: string) {
        const arr = base64.split(",");
        const mime = arr[0].match(/:(.*?);/)?.[1] ?? "application/octet-stream";

        const bstr = atob(arr[1]);
        const u8arr = new Uint8Array(bstr.length);

        for (let i = 0; i < bstr.length; i++) {
            u8arr[i] = bstr.charCodeAt(i);
        }

        const ext = mime.split("/")[1] ?? "bin";
        const file = new File([u8arr], `image.${ext}`, { type: mime });

        const form = new FormData();
        form.append("file", file);

        return form;
    }
};
