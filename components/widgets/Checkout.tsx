"use client";

import { useCheckoutWidget } from "@features/payment/hooks/useCheckoutWidget";

interface CheckoutProps {
  amount: number;
  orderName: string;
}

export default function Checkout({ amount, orderName }: CheckoutProps) {
  const { ready, requestPayment } = useCheckoutWidget(amount, orderName);

  return (
    <div className="w-full flex flex-col items-center">

      <h2 className="text-[60px] font-extrabold text-[#36A64A] mb-[40px]">
        주문서
      </h2>

      <div id="payment-method" className="w-full mb-[40px]" />

      <div id="agreement" className="w-full mb-[40px]" />

      <div className="bg-[#F5FBF7] border-[4px] border-[#B8E6C0] rounded-[20px] p-[40px] mb-[40px] w-full text-[46px] font-bold text-[#333] flex justify-between">
        <span>결제 금액</span>
        <span>{amount.toLocaleString()}원</span>
      </div>

      <button
        disabled={!ready}
        onClick={requestPayment}
        className={`w-full h-[140px] rounded-[30px] text-[48px] font-bold ${
          ready ? "bg-[#36A64A] text-white" : "bg-gray-400 text-gray-200"
        }`}
      >
        {ready ? "결제하기" : "로딩중..."}
      </button>

      <style jsx global>{`
        #payment-method > div {
          transform: scale(0.85);
          transform-origin: top center;
        }
        #agreement > div {
          transform: scale(0.85);
          transform-origin: top center;
        }
      `}</style>
    </div>
  );
}
