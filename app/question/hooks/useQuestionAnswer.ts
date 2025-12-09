"use client";

import { useSearchParams } from "next/navigation";

export function useQuestionAnswer() {
  const params = useSearchParams();
  const raw = params.get("data");

  if (!raw) return { content: null };

  const decoded = decodeURIComponent(raw);
  const parsed = JSON.parse(decoded);

  return {
    content: parsed?.choices?.[0]?.message?.content ?? null,
  };
}
