"use client";

import { useRouter } from "next/navigation";

/*품목 리스트 yolo랑 이름 동일하게 했음 */
const ITEM_LIST = [
  { key: "bab-sang", label: "밥상" },
  { key: "seo-rap-jang", label: "서랍장" },
  { key: "sofa", label: "소파" },
  { key: "chair", label: "의자" },
  { key: "jang-long", label: "장롱" },
  { key: "desk", label: "책상" },
  { key: "hwa-jang-dae", label: "화장대" },
  { key: "bed", label: "침대" },
  { key: "bicycle", label: "자전거" },
  { key: "hang-a-ri", label: "항아리" },
];

export default function SelectMenuPage() {
  const router = useRouter();

  /*
   *  품목 버튼 클릭 시:
   * - /large/select_menu/options/{item} 페이지로 이동
   * - 예: /large/select_menu/options/chair
   */
  const goToItemPage = (item: string) => {
    router.push(`/large/select_menu/options/${item}`);
  };

  return (
    <div className="container">
      <h2>대형 폐기물 전체 목록</h2>

      <div className="grid">
        {ITEM_LIST.map((item) => (
          <button
            key={item.key}
            className="itemBtn"
            onClick={() => goToItemPage(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* CSS */}
      <style jsx>{`
        .container {
          padding: 20px;
          text-align: center;
          color: white;
        }

        .grid {
          margin-top: 30px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          padding: 0 10px;
        }

        .itemBtn {
          padding: 16px;
          background: black;
          border: none;
          color: white;
          font-size: 18px;
          border-radius: 12px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
