"use client";

import { useLargeOptions } from "@features/large/hooks/useLargeOptions";

export default function LargeOptionPage() {
  const { cls, config, options, price, loading, update, goToPayment } =
    useLargeOptions();

  if (!config) {
    return (
      <div className="flex items-center justify-center w-[1080px] h-[1920px]">
        <h1 className="text-5xl">알 수 없는 품목입니다.</h1>
      </div>
    );
  }

  const KOR: Record<string, string> = {
    "bab-sang": "밥상",
    "bicycle": "자전거",
    "chair": "의자",
    "desk": "책상",
    "hang-a-ri": "항아리",
    "hwa-jang-dae": "화장대",
    "jang-long": "장롱",
    "seo-rap-jang": "서랍장",
    "sofa": "소파",
    "bed": "침대",
  };

  const title = KOR[String(cls)];

  return (
    <div
      className="
        w-[1080px] h-[1920px]
        bg-gradient-to-b from-[#9EE0AE] to-[#36A64A]
        flex flex-col items-center pt-[180px] relative text-[#2F7239]
      "
    >
      {/* 뒤로가기 */}
      <img
        src="/back_icon.png"
        onClick={() => history.back()}
        className="absolute top-[60px] left-[40px] w-[90px] h-[90px] cursor-pointer"
      />

      {/* 제목 */}
      <h1 className="text-[80px] font-extrabold text-white mb-[80px]">
        {title} 옵션 선택
      </h1>

      {/* 옵션 전체 박스 */}
      <div
        className="
          bg-white w-[85%] rounded-[40px] p-[60px] text-center
          shadow-xl
        "
      >
        {/* 🔥 옵션 필드 자동 생성 */}
        {config.fields.map((field: string) => (
          <div key={field} className="mb-[50px]">
            <p className="text-[45px] mb-[20px]">
              {field === "count" && "개수 선택"}
              {field === "person" && "인원 선택"}
              {field === "size" && "사이즈 선택"}
              {field === "part" && "종류 선택"}
              {field === "type2" && "종류 선택"}
              {field === "height" && "높이 (cm)"}
              {field === "width" && "너비 (cm)"}
              {field === "drawers" && "서랍 개수"}
            </p>

            {/* 🔥 자동 UI 렌더링 */}
            {(() => {
              // 숫자 입력 옵션
              if (["count", "height", "width", "drawers"].includes(field)) {
                return (
                  <input
                    type="number"
                    value={options[field]}
                    min={1}
                    onChange={(e) => update(field, Number(e.target.value))}
                    className="
                      w-[180px] h-[80px] text-[40px] text-center
                      border-4 border-[#8ED49A] rounded-[20px]
                    "
                  />
                );
              }

              // 선택 버튼 옵션
              const choices: Record<string, string[]> = {
                person: ["1", "2", "3", "4"],
                size:
                  cls === "bed"
                    ? ["일인용", "이인용"]      // 침대용
                    : ["소형", "대형"],         // 책상 등 다른 품목용

                part: ["매트리스", "틀"],
                type2: ["일반용", "미용실용"],
              };

              if (choices[field]) {
                return (
                  <div className="flex justify-center gap-[20px] flex-wrap">
                    {choices[field].map((v) => (
                      <button
                        key={v}
                        onClick={() => update(field, v)}
                        className={`
                          px-[50px] py-[25px] rounded-[25px] text-[36px]
                          border-4 border-[#8ED49A]
                          ${options[field] == v
                            ? "bg-[#8ED49A] text-white font-bold"
                            : "bg-white text-[#2F7239]"
                          }
                        `}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                );
              }

              return null;
            })()}
          </div>
        ))}

        {/* 가격 */}
        {price !== null && (
          <div
            className="
              bg-[#F4FFF7] border-4 border-[#8ED49A]
              p-[40px] rounded-[30px] mb-[50px]
            "
          >
            <p className="text-[38px] mb-[15px]">총 금액</p>
            <h2 className="text-[60px] font-extrabold">
              {price.toLocaleString()} 원
            </h2>
          </div>
        )}

        {/* 결제 버튼 */}
        <button
          disabled={loading || price === null}
          onClick={goToPayment}
          className="
            w-full h-[140px] rounded-[30px]
            text-[48px] font-extrabold shadow-lg
            bg-[#A0DDAB] text-[#2F7239]
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {loading ? "계산 중..." : "결제하기"}
        </button>
      </div>
    </div>
  );
}
