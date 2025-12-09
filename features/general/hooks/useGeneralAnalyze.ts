/**
 * 📌 useGeneralAnalyze
 * ---------------------------------------------------------
 * ✔ 역할
 *   - wasteImage(base64) 또는 QR 업로드 ID(id)를 기반으로 분석 실행
 *   - QR 업로드라면 Spring 서버에서 base64 이미지 불러옴
 *   - 분석 API(analyzeWaste)를 호출하여 결과를 받아옴
 *   - 분석 결과를 JSON 문자열로 인코딩하여 result 페이지로 이동
 *
 * ✔ 사용 시나리오
 *   - /general_waste/analyze 페이지에서 자동 실행되는 훅
 *   - 카메라 촬영 / QR 업로드 두 흐름 모두 처리
 *
 * ✔ 처리 흐름
 *   1) 초기 image 로드
 *      - localStorage("wasteImage")가 있으면 그대로 사용
 *      - 없고 id가 있으면 → getQRImage(id) 호출하여 base64 가져옴
 *      - 가져온 base64는 state(photo) + localStorage에 저장
 *
 *   2) 분석 실행
 *      - photo 또는 text 값이 하나라도 존재하면 analyzeWaste 호출
 *      - 분석 API 결과(res)를 JSON으로 인코딩하여
 *        → /general_waste/result 페이지로 이동
 *
 * ✔ 반환값
 *   - 없음 (페이지 내 자동 실행을 위한 사이드 이펙트 훅)
 *
 * ✔ 사용 위치
 *   - app/general_waste/analyze/page.tsx
 * ---------------------------------------------------------
 */

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getQRImage } from "@features/general/api/getQRImage";
import { analyzeWaste } from "@features/general/api/analyzeWaste";

export function useGeneralAnalyze() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const text = searchParams.get("text");

  const stored = typeof window !== "undefined" ? localStorage.getItem("wasteImage") : null;
  const [photo, setPhoto] = useState(stored);

  // QR 이미지 로드
  useEffect(() => {
    if (!id || photo) return;

    (async () => {
      const base64 = await getQRImage(id);
      if (base64) {
        setPhoto(base64);
        localStorage.setItem("wasteImage", base64);
      }
    })();
  }, [id, photo]);

  // 분석 실행
  useEffect(() => {
    if (!photo && !text) return;
    if (photo && photo.length < 50) return;

    (async () => {
      const res = await analyzeWaste(photo, text);

      router.push(
        `/general_waste/result?data=${encodeURIComponent(JSON.stringify(res))}`
      );
    })();
  }, [photo, text]);
}
