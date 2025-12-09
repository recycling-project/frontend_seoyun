/**
 * 📌 useLargeMobileUpload
 * ---------------------------------------------------------
 * ✔ 역할
 *   - 사용자가 휴대폰에서 대형폐기물 사진을 업로드할 때 사용하는 훅
 *   - 업로드한 이미지를 base64로 변환하여 Spring 서버로 전송
 *
 * ✔ 사용 시나리오
 *   - /large/mobile-upload 페이지
 *   - 사용자가 파일 선택 → 즉시 서버에 업로드하는 방식
 *
 * ✔ 처리 흐름
 *   1) openFileDialog()
 *      - 숨겨진 <input type="file">을 클릭시켜 파일 선택창 열기
 *
 *   2) handleUpload(file)
 *      - 선택된 파일을 FileReader로 읽어 base64 변환
 *      - base64 문자열을 Spring API(`/large/mobile-upload`)로 POST 전송
 *      - 서버는 업로드된 이미지를 저장하고 업로드 ID를 생성
 *
 *   3) 상태 관리
 *      - loading: 업로드 진행 중 여부
 *      - fileName: 선택한 파일 이름 표시
 *      - fileInputRef: 파일 input DOM 접근용
 *
 * ✔ 반환값
 *   - loading: true/false (로딩 스피너 표시 등에 사용)
 *   - fileName: 유저에게 보여줄 파일명
 *   - fileInputRef: <input type="file"> 연결용 ref
 *   - openFileDialog(): 파일 선택창 열기
 *   - handleUpload(): 업로드 실행
 *
 * ✔ 사용 위치
 *   - app/large/mobile-upload/page.tsx
 * ---------------------------------------------------------
 */

"use client";

import { useState, useRef } from "react";

export const useLargeMobileUpload = () => {
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState("선택된 파일 없음");
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // 파일 선택창 열기
    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    // 업로드 처리
    const handleUpload = async (file: File | null) => {
        if (!file) return;

        setFileName(file.name);
        setLoading(true);

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result as string;

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/large/mobile-upload`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ image: base64 }),
                    }
                );

                console.log("대형 업로드 완료:", await res.json());
                alert("사진 업로드 완료!");
            } catch (err) {
                console.error("대형 업로드 실패:", err);
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
