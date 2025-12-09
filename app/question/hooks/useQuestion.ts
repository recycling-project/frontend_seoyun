"use client";

import { useState } from "react";
import Hangul from "hangul-js";
import { useRouter } from "next/navigation";

export function useQuestion() {
  const router = useRouter();
  const [text, setText] = useState("");

  const applyHangul = (input: string) =>
    Hangul.assemble(Hangul.disassemble(input));

  const insert = (k: string) => {
    if (k === " ") return setText(text + " ");

    setText(applyHangul(text + k));
  };

  const backspace = () => {
    const dis = Hangul.disassemble(text);
    dis.pop();
    setText(Hangul.assemble(dis));
  };

  const submit = async () => {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const result = await res.json();
    router.push(
      `/question/answer?data=${encodeURIComponent(JSON.stringify(result))}`
    );
  };

  return { text, setText, insert, backspace, submit };
}
