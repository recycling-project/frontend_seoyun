/**
 * 📌 useWaitForUpload
 * ---------------------------------------------------------
 * ✔ 역할
 *   - 모바일 업로드 페이지에서 사진 업로드가 완료되었는지 지속적으로 감시
 *   - 서버(/recycle/check)에서 업로드된 id가 반환되면 분석 페이지로 이동
 *
 * ✔ 처리 흐름
 *   1) 1초 간격으로 /recycle/check API 호출 (polling)
 *   2) 서버에서 { id } 가 존재하는 순간 → 업로드 완료로 판단
 *   3) interval 중단 후 /general_waste/analyze?id=업로드ID 로 이동
 *
 * ✔ 특징
 *   - 업로드가 완료될 때까지 대기하는 화면에서 자동 실행
 *   - cleanup(return)에서 interval 정리 → 중복 요청/메모리 누수 방지
 *
 * ✔ 반환값
 *   - 없음 (자동 동작하는 side-effect 전용 훅)
 *
 * ✔ 사용 위치
 *   - app/general_waste/wait/page.tsx (QR → 모바일 업로드 후 대기 화면)
 * ---------------------------------------------------------
 */


import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useWaitForUpload = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recycle/check`);
        const data = await res.json();

        if (data.id) {
          clearInterval(timer);
          router.push(`/general_waste/analyze?id=${data.id}`);
        }
      } catch (err) {
        console.log("업로드 체크 오류:", err);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);
};
