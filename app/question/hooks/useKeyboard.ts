"use client";

import { useState } from "react";

export function useKeyboard() {
  const [lang, setLang] = useState<"ko" | "en">("ko");
  const [numMode, setNumMode] = useState(false);
  const [shift, setShift] = useState(false);

  const koRow1 = shift
    ? ["ㅃ", "ㅉ", "ㄸ", "ㄲ", "ㅆ", "ㅛ", "ㅕ", "ㅑ", "ㅒ", "ㅖ"]
    : ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅔ"];

  const koRow2 = ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"];
  const koRow3 = ["Shift", "ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ", "Back"];

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

  const keys = numMode ? num : lang === "ko" ? [koRow1, koRow2, koRow3] : en;

  return {
    keys,
    lang,
    numMode,
    shift,
    setLang,
    setNumMode,
    setShift,
  };
}
