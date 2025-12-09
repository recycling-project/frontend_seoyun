/**
 * 📌 useLargeOptions
 * ---------------------------------------------------------
 * ✔ 역할
 *   - 대형폐기물 품목별 옵션(예: 너비, 높이, 개수, 종류 등) 자동 관리
 *   - 옵션이 변경될 때마다 Spring 서버에 가격 계산 요청
 *   - 최종 가격과 옵션을 결제 페이지로 전달하는 기능 제공
 * 
 * ✔ 사용 시나리오
 *   - /large/select_menu/options/[cls]/page.tsx 옵션 선택 페이지
 *   - 품목별 옵션을 동적으로 생성해야 할 때 사용
 *
 * ✔ 처리 흐름
 *   1) 품목(className = cls) 확인
 *      - useParams()로 현재 품목 키(sofa, jang-long 등) 읽어옴
 *      - OPTION_MAP에서 해당 품목이 가진 옵션 목록(fields) 불러옴
 *
 *   2) 옵션 값 상태 관리
 *      - count, width, height, drawers 등의 옵션을 state로 보관
 *      - update(field, value)를 통해 옵션값 변경 가능
 *      - 숫자 옵션은 자동으로 Number로 변환 처리
 *
 *   3) 가격 자동 계산
 *      - 옵션이 변경될 때마다 useEffect 실행
 *      - 필요한 옵션만 body에 담아 Spring 서버 POST 요청
 *      - 응답받은 price를 화면 상태에 저장
 *
 *   4) 결제 페이지 이동
 *      - goToPayment() 실행 시
 *        → amount, orderName, 옵션 JSON을 /payment 페이지로 전달
 *
 * ✔ 반환값
 *   - cls: 현재 품목 이름
 *   - config: 해당 품목이 가진 옵션(field 목록)
 *   - options: 현재 모든 옵션 값
 *   - price: 계산된 금액
 *   - update(): 옵션 변경 함수
 *   - goToPayment(): 결제 페이지 이동 함수
 *
 * ✔ 사용 위치
 *   - app/large/select_menu/options/[cls]/page.tsx
 * ---------------------------------------------------------
 */


"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

/* ---------------------------------------------------------
   🔥 각 대형폐기물 품목별 필요한 옵션 정의 테이블
   → 이 구조 하나로 10개 옵션 페이지 전부 처리 가능
--------------------------------------------------------- */
type OptionConfig = {
  fields: string[]; // 품목이 가지는 옵션들
};

const OPTION_MAP: Record<string, OptionConfig> = {
  "bab-sang": { fields: ["count"] },
  "bicycle": { fields: ["count"] },
  "chair": { fields: ["count"] },
  "desk": { fields: ["size", "count"] },
  "hang-a-ri": { fields: ["height", "count"] },
  "hwa-jang-dae": { fields: ["type2", "count"] },
  "jang-long": { fields: ["width", "count"] },
  "seo-rap-jang": { fields: ["drawers", "count"] },
  "sofa": { fields: ["person", "count"] },
  "bed": { fields: ["part", "size", "count"] },
};

/* ---------------------------------------------------------
   🔥 통합 훅: useLargeOptions
   → 이 훅 하나로 10개 품목의 옵션/가격/결제 로직 끝
--------------------------------------------------------- */
export const useLargeOptions = () => {
  const { cls } = useParams(); // /options/[cls] → sofa, bed 등
  const router = useRouter();

  // 이 품목이 어떤 옵션을 갖는지 가져오기
  const config = OPTION_MAP[String(cls)];

  // 기본 옵션 값
  const [options, setOptions] = useState<any>({
    count: 1,
    person: 2,
    size: "소형",
    part: "매트리스",
    type2: "일반용",
    width: 80,
    height: 50,
    drawers: 4,
  });

  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  /* ---------------------------------------------------------
     🔥 옵션 변경 함수 (UI에서 바로 사용)
--------------------------------------------------------- */
  const update = (field: string, value: any) => {
    let v = value;

    // 숫자 변환 필드
    if (["count", "person", "height", "width", "drawers"].includes(field)) {
      v = Number(value);
    }

    // 🔥 침대 part 정규화 (프레임 → 틀 로 강제 변환)
    if (field === "part") {
      if (v === "프레임") v = "틀";
      if (typeof v === "string") v = v.trim(); // 공백 제거
    }

    // 🔥 침대 size 정규화 (혹시 UI에서 잘못 들어가는 값 방지)
    if (field === "size") {
      if (typeof v === "string") v = v.trim();
    }

    setOptions((prev: any) => ({
      ...prev,
      [field]: v,
    }));
  };
  /* ---------------------------------------------------------
     🔥 가격 자동 계산 (옵션이 바뀔 때마다 실행)
--------------------------------------------------------- */
  useEffect(() => {
    if (!config) return;

    const body: any = { type: cls };

    // 해당 품목이 가진 옵션만 body에 포함
    config.fields.forEach((f) => {
      body[f] = options[f];
    });

    const fetchPrice = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/large/price`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );

        const data = await res.json();
        setPrice(data.price ?? null);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [options, cls]);

  /* ---------------------------------------------------------
     🔥 결제 페이지 이동 (공통)
--------------------------------------------------------- */
  const goToPayment = () => {
    if (!price) return;

    router.push(
      `/payment?amount=${price}&orderName=${cls} (${JSON.stringify(options)})`
    );
  };

  return {
    cls,
    config,
    options,
    price,
    loading,
    update,
    goToPayment,
  };
};
