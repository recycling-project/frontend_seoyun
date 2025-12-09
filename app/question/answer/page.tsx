"use client";

import { useRouter } from "next/navigation";
import Keyboard from "@/question/components/Keyboard";
import PreviewBox  from "@/question/components/PreviewBox";
import { useQuestion } from "@/question/hooks/useQuestion";
import { useKeyboard } from "@/question/hooks/useKeyboard";
import { useQuestionAnswer } from "@/question/hooks/useQuestionAnswer";

export default function QuestionPage() {
  const router = useRouter();
  const { text, insert, backspace, submit } = useQuestion();
  const { keys, lang, numMode, shift, setLang, setNumMode, setShift } =
    useKeyboard();

  const press = (k: string) => {
    if (k === "Back") return backspace();
    if (k === "Shift") return setShift(!shift);
    if (k === "#+=") return setNumMode(!numMode);
    insert(k);
  };

  return (
    <div
      style={{
        width: "1080px",
        height: "1920px",
        position: "relative",
        background: "#fff",
      }}
    >
      {/* 상단바 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "220px",
          background: "#36A64A",
          top: 0,
          left: 0,
        }}
      />

      <img
        src="/back_icon.png"
        onClick={() => router.push("/menu")}
        style={{
          position: "absolute",
          top: 60,
          left: 40,
          width: 90,
          height: 90,
          cursor: "pointer",
        }}
      />

      {/* 질문하기 버튼 */}
      <button
        disabled={!text}
        onClick={submit}
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
          fontWeight: 700,
          color: "#333",
          opacity: text ? 1 : 0.5,
        }}
      >
        질문하기
      </button>

      {/* 키보드 */}
      <div
        style={{
          position: "absolute",
          top: 1300,
          left: "50%",
          transform: "translateX(-50%) scale(1.2)",
        }}
      >
        <PreviewBox text={text} />
        <Keyboard keys={keys} onPress={press} />
      </div>
    </div>
  );
}
