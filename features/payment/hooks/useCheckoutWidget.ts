/**
 * 📌 useCheckoutWidget (Toss Payments 결제 위젯 통합 훅)
 * ---------------------------------------------------------
 * ✔ 역할
 *   - Toss Payments 결제 위젯을 로드하고 결제수단/약관 UI를 렌더링
 *   - 금액(amount)과 주문명(orderName)을 기반으로 결제 요청 실행
 *   - 화면에서는 결제하기 버튼만 연결하면 바로 작동하도록 설계됨
 *
 * ✔ 사용 시나리오
 *   - /payment/page.tsx 의 Checkout 컴포넌트 내부에서 사용
 *   - "Toss 결제 수단 선택 UI + 약관 UI"를 자동으로 로드해야 할 때
 *
 * ✔ 처리 흐름
 *   1) 위젯 초기화
 *      - loadPaymentWidget(clientKey, customerKey)을 호출하여 위젯 객체 생성
 *      - renderPaymentMethods("#payment-method")로 결제수단 UI 렌더링
 *      - renderAgreement("#agreement")로 약관 UI 렌더링
 *      - 모든 UI가 준비되면 ready = true
 *
 *   2) 금액(amount)이 변경될 경우
 *      - useEffect가 다시 실행되어 위젯을 재렌더링
 *      - 결제 버튼 비활성화 → 위젯 렌더 후 다시 활성화
 *
 *   3) 결제 요청(requestPayment)
 *      - orderName, amount 기반으로 결제 요청
 *      - 결제 성공 시 /payment/success
 *      - 결제 실패 시 /payment/fail
 *
 * ✔ 반환값
 *   - ready: 결제 UI가 모두 렌더링되어 버튼 활성화 가능한 상태
 *   - requestPayment(): "결제하기" 버튼 클릭 시 실행할 함수
 *
 * ✔ 사용 위치
 *   - app/payment/components/Checkout.tsx
 *   - Checkout UI에서 이 훅만 불러 쓰면 Toss 결제 연동 완성
 *
 * ✔ 주의사항
 *   - #payment-method, #agreement 두 div가 반드시 화면에 존재해야 함
 *   - layout이나 부모 컴포넌트에서 display:none이면 렌더링 불가
 * ---------------------------------------------------------
 */


"use client";

import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;
const generateOrderId = () =>
  `order-${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const useCheckoutWidget = (amount: number, orderName: string) => {
  const paymentWidgetRef = useRef<any>(null);
  const paymentMethodsRef = useRef<any>(null);
  const agreementRef = useRef<any>(null);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);

    const init = async () => {
      try {
        const customerKey = generateOrderId();

        const widget = await loadPaymentWidget(clientKey, customerKey);
        paymentWidgetRef.current = widget;

        // 결제수단 위젯
        paymentMethodsRef.current =
          await widget.renderPaymentMethods("#payment-method", {
            value: amount,
          });

        // 약관 위젯
        agreementRef.current = await widget.renderAgreement("#agreement");

        setReady(true);
      } catch (err) {
        console.error("Toss 위젯 초기화 오류", err);
      }
    };

    init();
  }, [amount]);

  // 결제 실행
  const requestPayment = async () => {
    if (!paymentWidgetRef.current) return;

    try {
      await paymentWidgetRef.current.requestPayment({
        orderId: generateOrderId(),
        orderName,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (err) {
      console.error("결제 요청 오류:", err);
    }
  };

  return {
    ready,
    requestPayment,
  };
};
