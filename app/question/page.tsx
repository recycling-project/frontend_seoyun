"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Hangul from "hangul-js";

export default function QuestionPage() {
  const router = useRouter();
  const [text, setText] = useState("");

  /* ------------------ 키보드 상태 ------------------ */
  const [lang, setLang] = useState<"ko" | "en">("ko");
  const [numMode, setNumMode] = useState(false);
  const [shift, setShift] = useState(false);

  /* ------------------ 키 배열 ------------------ */
  const koRow1 = shift
    ? ["ㅃ", "ㅉ", "ㄸ", "ㄲ", "ㅆ", "ㅛ", "ㅕ", "ㅑ", "ㅒ", "ㅖ"]
    : ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅔ"];

  const koRow2 = ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"];
  const koRow3 = ["Shift", "ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ", "Back"];
  const ko = [koRow1, koRow2, koRow3];

  const en = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Shift","Z","X","C","V","B","N","M","Back"]
  ];

  const num = [
    ["1","2","3","4","5","6","7","8","9","0"],
    ["-","/",":",";","(",")","₩","&","@","\""],
    ["#+=",".",",","?","!","'","Back"]
  ];

  const keys = numMode ? num : (lang === "ko" ? ko : en);

  /* ------------------ 한글 조합 ------------------ */
  const applyHangul = (input: string) => {
    return Hangul.assemble(Hangul.disassemble(input));
  };

  const pressKey = (k: string) => {
    if (k === "Back") {
      const dis = Hangul.disassemble(text);
      dis.pop();
      setText(Hangul.assemble(dis));
      return;
    }
    if (k === "Shift") {
      setShift(!shift);
      return;
    }
    if (k === "#+=") {
      setNumMode(true);
      return;
    }
    if (k === " ") {
      setText(text + " ");
      return;
    }
    setText(applyHangul(text + k));
  };

  return (
    <div
      className="page"
      style={{
        position: "relative",
        width: "1080px",
        height: "1920px",
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      {/* 상단 바 */}
      <div
        style={{
          width: "100%",
          height: "220px",
          background: "#36A64A",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      ></div>

      {/* 🔙 뒤로가기 */}
      <img
        src="/back_icon.png"
        alt="뒤로가기"
        onClick={() => router.push("/menu")}
        style={{
          position: "absolute",
          top: "60px",
          left: "40px",
          width: "90px",
          height: "90px",
          zIndex: 999,
          cursor: "pointer",
        }}
      />

      {/* 입력창 */}
      {/* <input
        readOnly
        value={text}
        placeholder="텍스트로 질문하기"
        style={{
          position: "absolute",
          top: 450,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 150,
          borderRadius: 20,
          fontSize: 42,
          fontWeight: 600,
          textAlign: "center",
          background: "#F5FBF7",
          border: "4px solid #B8E6C0",
          color: "#333",
          zIndex: 10,
        }}
      /> */}

      {/* 질문하기 버튼 */}
      <button
        disabled={!text}
        style={{
          position: "absolute",
          top: 650,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 200,
          background: "#F5FBF7",
          borderRadius: 20,
          border: "4px solid #B8E6C0",
          fontSize: 42,
          color: "#333",
          fontWeight: 700,
          cursor: text ? "pointer" : "default",
          opacity: text ? 1 : 0.5,
          zIndex: 10,
        }}
        onClick={async () => {
          const res = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
          });

          const result = await res.json();
          router.push(
            `/question/answer?data=${encodeURIComponent(JSON.stringify(result))}`
          );
        }}
      >
        질문하기
      </button>

      {/* ---------------- 키보드 전체 ---------------- */}
      <div
        style={{
          position: "absolute",
          top: 1300,
          left: "50%",
          transform: "translateX(-50%) scale(1.2)",
          transformOrigin: "top center",
          width: "800px",
          zIndex: 5000,
        }}
      >
        {/* 미리보기 */}
        <div
          style={{
            background: "#F5FBF7",
            color: "#333",
            fontSize: 32,
            marginBottom: 20,
            textAlign: "center",
            padding: "18px 24px",
            borderRadius: 14,
            border: "3px solid #B8E6C0",
          }}
        >
          {text || "입력중..."}
        </div>

        {/* 패널 */}
        <div
          style={{
            background: "#f3f3f3",
            padding: "20px 10px",
            borderRadius: 20,
          }}
        >
          {keys.map((row, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 12,
                marginBottom: 15,
              }}
            >
              {row.map((k) => (
                <button
                  key={k}
                  onClick={() => pressKey(k)}
                  style={{
                    width: k === "Back" ? 140 : 80,
                    height: 80,
                    background: "white",
                    borderRadius: 12,
                    fontSize: 28,
                    border: "1px solid #ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {k}
                </button>
              ))}
            </div>
          ))}

          {/* 기능 버튼 */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              marginTop: 10,
            }}
          >
            <button
              style={{
                width: 120,
                height: 80,
                background: "white",
                borderRadius: 12,
                fontSize: 26,
              }}
              onClick={() => {
                setNumMode(!numMode);
                setShift(false);
              }}
            >
              {numMode ? "ABC" : "123"}
            </button>

            <button
              style={{
                width: 120,
                height: 80,
                background: "white",
                borderRadius: 12,
                fontSize: 26,
              }}
              onClick={() => {
                setLang(lang === "ko" ? "en" : "ko");
                setNumMode(false);
                setShift(false);
              }}
            >
              한/영
            </button>

            <button
              style={{
                flex: 1,
                height: 80,
                background: "white",
                borderRadius: 12,
                fontSize: 26,
              }}
              onClick={() => pressKey(" ")}
            >
              스페이스
            </button>

            <button
              style={{
                width: 140,
                height: 80,
                background: "#26d542",
                borderRadius: 12,
                color: "white",
                fontSize: 26,
                fontWeight: 700,
              }}
            onClick={async () => {
          const res = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
          });

          const result = await res.json();
          router.push(
            `/question/answer?data=${encodeURIComponent(JSON.stringify(result))}`
          );
        }}
      >
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
