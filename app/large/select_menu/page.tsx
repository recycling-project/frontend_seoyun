"use client";

import { useRouter } from "next/navigation";

const ENG_TO_KOR: Record<string, string> = {
  "bab-sang": "밥상",
  "seo-rap-jang": "서랍장",
  "sofa": "소파",
  "chair": "의자",
  "jang-long": "장롱",
  "desk": "책상",
  "hwa-jang-dae": "화장대",
  "bed": "침대",
  "bike": "자전거",
  "hang-a-ri": "항아리",
};

export default function SelectMenuPage() {
  const router = useRouter();

  const handleSelect = (type: string) => {
    router.push(`/large/select_menu/options/${type}`);
  };

  return (
    <div
      style={{
        width: "1080px",
        height: "1920px",
        background: "linear-gradient(to bottom, #9EE0AE, #36A64A)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ▼ 뒤로가기 버튼 */}
      <img
        src="/back_icon.png"
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: "60px",
          left: "40px",
          width: "90px",
          height: "90px",
          cursor: "pointer",
        }}
      />

      {/* ▼ 상단 타이틀 */}
      <h1
        style={{
          marginTop: "200px",
          textAlign: "center",
          fontSize: "80px",
          fontWeight: 900,
          color: "white",
        }}
      >
        대형폐기물 종류 선택
      </h1>

      {/* ▼ 하단 흰색 박스 */}
      <div
        style={{
          marginTop: "120px",
          background: "white",
          width: "100%",
          height: "1400px",
          borderTopLeftRadius: "50px",
          borderTopRightRadius: "50px",
          paddingTop: "80px",
          display: "flex",
          justifyContent: "center",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            width: "85%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "50px 40px",
          }}
        >
          {Object.entries(ENG_TO_KOR).map(([eng, kor]) => (
            <button
              key={eng}
              onClick={() => handleSelect(eng)}
              style={{
                width: "100%",
                height: "300px",
                background: "white",
                borderRadius: "30px",
                border: "5px solid #8ED49A",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              {/* 이미지 */}
              <img
                src={`/large_icons/${eng}.png`}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain",
                  marginBottom: "20px",
                }}
              />

              {/* 텍스트 */}
              <span
                style={{
                  fontSize: "48px",
                  fontWeight: 800,
                  color: "#2F7239",
                }}
              >
                {kor}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
