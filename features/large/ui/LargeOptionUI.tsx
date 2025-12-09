/**
 * 📌 useLargeOptions
 * ---------------------------------------------------------
 * ✔ 역할
 *   - 대형폐기물 '각 품목'이 어떤 옵션을 가지는지 자동 처리
 *   - 옵션 변경 시 자동으로 Spring 서버에 가격 계산 요청
 *   - 최종 가격과 옵션 정보를 결제 페이지로 전달
 *
 * ✔ 사용 시나리오
 *   - /large/select_menu/options/[cls]/page.tsx
 *   - 품목(sofa, bed, chair 등)에 따라 옵션 UI를 동적으로 구성해야 할 때 사용
 *
 * ✔ 처리 흐름
 *   1) 현재 품목 가져오기
 *      - useParams() → cls 값을 가져옴 (예: "sofa", "desk")
 *      - OPTION_MAP에서 해당 품목이 가진 옵션(`fields`)을 조회
 *
 *   2) 옵션 값 상태 관리
 *      - options에 모든 옵션 기본값(count, size, width 등)을 저장
 *      - update(key, value)로 옵션을 변경
 *      - UI에서는 옵션 변경 시 update() 호출만 하면 됨
 *
 *   3) 가격 자동 계산
 *      - 옵션 또는 cls가 변경될 때 useEffect 실행
 *      - 필요한 옵션만 body에 담아 Spring 서버에 POST 요청
 *          → body = { type: cls, 옵션1, 옵션2... }
 *      - 응답받은 price를 state에 저장하여 UI 렌더링
 *
 *   4) 결제 페이지 이동
 *      - goToPayment() 호출 시
 *          → 결제 금액(amount)
 *          → 품목명(orderName = cls)
 *          → 선택된 옵션(JSON)
 *        URL 파라미터로 /payment 페이지에 전달
 *
 * ✔ 반환값
 *   - cls: 현재 품목 이름
 *   - config: 품목이 가진 옵션 목록
 *   - options: 현재 모든 옵션 값
 *   - update(): 옵션 변경 함수
 *   - price: 계산된 금액
 *   - loading: 서버 요청 로딩 상태
 *   - goToPayment(): 결제 페이지 이동 함수
 *
 * ✔ 사용 위치
 *   - app/large/select_menu/options/[cls]/page.tsx
 * ---------------------------------------------------------
 */


"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

type OptionConfig = {
  fields: string[]; // 어떤 옵션을 가지는 품목인지 정의
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

export const useLargeOptions = () => {
  const { cls } = useParams(); // ex) "sofa"
  const router = useRouter();

  const config = OPTION_MAP[String(cls)];

  // 옵션 값 기본 세팅
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

  const update = (key: string, value: any) => {
    setOptions((prev: any) => ({ ...prev, [key]: value }));
  };

  // 가격 계산
  useEffect(() => {
    if (!config) return;

    const body: any = { type: cls };

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

  const goToPayment = () => {
    if (!price) return;

    const text = JSON.stringify(options);
    router.push(
      `/payment?amount=${price}&orderName=${cls} (${text})`
    );
  };

  return {
    cls,
    config,
    options,
    update,
    price,
    loading,
    goToPayment,
  };
};
