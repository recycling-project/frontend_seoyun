export async function analyzeWaste(photo?: string | null, text?: string | null) {
  const body = photo ? { image: photo } : { text };
  const api = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${api}/recycle/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return await res.json();
  } catch {
    return { error: "분석 중 오류 발생" };
  }
}
