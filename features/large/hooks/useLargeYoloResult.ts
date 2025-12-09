/**
 * 📌 useLargeYoloResult
 * ---------------------------------------------------------
 * ✔ 역할
 *   - YOLO 분석 결과(JSON)와 이미지(base64)를 페이지에 전달하는 훅
 *   - URL 파라미터(data, img) 또는 localStorage에서 이미지 로드
 *   - YOLO가 예측한 class_name(영문)을 한글 이름으로 변환하여 제공
 *
 * ✔ 사용 시나리오
 *   - /large/yolo_result 페이지에서 사용됨
 *   - analyze 단계에서 YOLO 분석 완료 후 데이터를 전달받아 결과 화면 렌더링
 *
 * ✔ 처리 흐름
 *   1) YOLO 결과 데이터 로드
 *      - URLSearchParams("data") 읽기
 *      - JSON.parse → parsed.best_detection.class_name 추출
 *      - 올바른 class_name이면 cls 상태 저장
 *
 *   2) 이미지 로드
 *      - URLSearchParams("img") → 모바일 업로드 시 사용 가능
 *      - 없으면 localStorage("large_waste_image") 사용
 *      - 둘 중 하나를 photo로 저장
 *
 *   3) 한글 이름 변환
 *      - engToKor 객체를 통해 class명 → 한글 품목명으로 변환
 *
 * ✔ 반환값
 *   - photo: YOLO 분석에 사용된 이미지 base64
 *   - cls: YOLO가 예측한 영어 클래스명
 *   - korean: 한글 변환된 품목명 (UI 출력용)
 *
 * ✔ 사용 위치
 *   - app/large/yolo_result/page.tsx
 * ---------------------------------------------------------
 */


"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export const useLargeYoloResult = () => {
  const params = useSearchParams();

  const [photo, setPhoto] = useState<string | null>(null);
  const [cls, setCls] = useState<string | null>(null);

  // 영어 → 한글 매핑
  const engToKor: Record<string, string> = {
    "bab-sang": "밥상",
    "seo-rap-jang": "서랍장",
    "sofa": "소파",
    "chair": "의자",
    "jang-long": "장롱",
    "desk": "책상",
    "hwa-jang-dae": "화장대",
    "bed": "침대",
    "bicycle": "자전거",
    "hang-a-ri": "항아리",
  };

  useEffect(() => {
    const raw = params.get("data");
    if (raw) {
      const parsed = JSON.parse(raw);
      const className = parsed?.best_detection?.class_name;

      if (className && className !== "null") {
        setCls(className);
      }
    }

    // 이미지 로드
    const imgQuery = params.get("img");
    const imgLocal = localStorage.getItem("large_waste_image");

    if (imgQuery) setPhoto(imgQuery);
    else if (imgLocal) setPhoto(imgLocal);
  }, []);

  const korean = cls ? engToKor[cls] || cls : null;

  return { photo, cls, korean };
};
