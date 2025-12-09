/**
 * 📌 useMobileUpload
 * ---------------------------------------------------------
 * ✔ 역할
 *   - 모바일에서 사진 파일을 선택하여 base64로 변환
 *   - Spring 서버(/recycle/mobile-upload)로 업로드 요청 수행
 *   - 파일명 및 로딩 상태 관리
 *
 * ✔ 주요 기능
 *   - openFileDialog(): 숨겨진 <input type="file"> 클릭 트리거
 *   - handleUpload(file): 선택된 파일을 base64로 변환 후 서버에 전송
 *
 * ✔ 처리 흐름
 *   1) 사용자가 파일 선택
 *   2) FileReader로 base64 변환
 *   3) Spring 서버로 POST 업로드 요청
 *   4) 업로드 완료 후 alert 표시
 *
 * ✔ 반환값
 *   - loading: 업로드 로딩 여부
 *   - fileName: 현재 선택된 파일명
 *   - fileInputRef: 파일 선택창 제어용 ref
 *   - openFileDialog: 파일 선택창 열기 함수
 *   - handleUpload: 업로드 처리 함수
 *
 * ✔ 사용 위치
 *   - app/general_waste/mobile_upload/page.tsx
 * ---------------------------------------------------------
 */


import { useState, useRef } from "react";

export const useMobileUpload = () => {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("선택된 파일 없음");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 파일 선택창 열기
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // 업로드 로직
  const handleUpload = async (file: File | null) => {
    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;

      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recycle/mobile-upload`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });

        alert("사진 업로드 완료!");
      } catch (err) {
        console.error("업로드 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return {
    loading,
    fileName,
    fileInputRef,
    openFileDialog,
    handleUpload,
  };
};
