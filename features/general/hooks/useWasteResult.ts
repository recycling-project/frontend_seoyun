/**
 * 📌 useWasteResult
 * ---------------------------------------------------------
 * ✔ 역할
 *   - 결과 페이지에서 사진(base64)과 분석 결과 텍스트를 불러와 화면에 표시할 수 있도록 제공
 *   - localStorage에 저장된 wasteImage를 로드하여 photo 상태에 저장
 *   - URL query(data)에 포함된 분석 결과 JSON을 파싱하여 content로 저장
 *
 * ✔ 처리 흐름
 *   1) 사진 로드
 *      - localStorage("wasteImage")를 가져옴
 *      - base64 prefix가 없다면 "data:image/jpeg;base64," 자동 추가
 *      - photo state에 저장한 후 localStorage에서 삭제
 *
 *   2) 분석 결과 파싱
 *      - URLSearchParams에서 data 값을 가져옴
 *      - decodeURIComponent → JSON.parse 순서로 복호화
 *      - GPT 응답 구조(parsed.choices[0].message.content)에서 텍스트 추출
 *
 * ✔ 반환값
 *   - photo: 최종 표시할 base64 이미지
 *   - content: 분석된 텍스트 결과
 *
 * ✔ 사용 위치
 *   - app/general_waste/result/page.tsx
 * ---------------------------------------------------------
 */

"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export const useWasteResult = () => {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  const [photo, setPhoto] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);

  // 사진 로드
  useEffect(() => {
    let stored = localStorage.getItem("wasteImage");
    if (stored) {
      if (!stored.startsWith("data:image")) {
        stored = "data:image/jpeg;base64," + stored;
      }
      setPhoto(stored);
    }
    localStorage.removeItem("wasteImage");
  }, []);

  // 결과 파싱
  useEffect(() => {
    if (!data) return;

    try {
      const decoded = decodeURIComponent(data);
      const parsed = JSON.parse(decoded);
      const msg = parsed?.choices?.[0]?.message?.content || null;
      setContent(msg);
    } catch {
      setContent(null);
    }
  }, [data]);

  return { photo, content };
};
