/**
 * 📌 getLargeImage
 * ---------------------------------------------------------
 * ✔ 역할
 *   - QR 업로드 방식으로 전달된 이미지 ID(id)를 이용하여
 *     Spring 서버에서 base64 이미지 데이터를 받아오는 함수
 *
 * ✔ 사용 시나리오
 *   - /large/analyze 페이지에서 QR 업로드 흐름일 때만 호출됨
 *   - 모바일 기기가 사진을 서버로 업로드하면,
 *     서버는 해당 이미지를 id로 저장하고,
 *     키오스크(프론트)는 이 함수를 통해 이미지(base64)를 가져옴
 *
 * ✔ 처리 흐름
 *   1) GET 요청 보내기
 *      - /large/image?id=xxxx 엔드포인트 호출
 *
 *   2) 응답(JSON)
 *      - { image: "base64문자열" }
 *
 *   3) base64 문자열을 반환하여 이미지 화면 표시 가능
 *
 * ✔ 반환값
 *   - base64 문자열 (ex: "/9j/4AAQSkZJRgABAQAAAQABAAD…")
 *
 * ✔ 사용 위치
 *   - useLargeAnalyze 훅 내부
 *     (옵션 선택 전에 사진을 먼저 보여주는 페이지)
 *
 * ---------------------------------------------------------
 */

export async function getLargeImage(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/large/image?id=${id}`);
  const data = await res.json();
  return data.image;
}
