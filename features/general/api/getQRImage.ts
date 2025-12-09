export async function getQRImage(id: string) {
  try {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${api}/recycle/image?id=${id}`);
    const data = await res.json();
    return data.image || null;
  } catch {
    console.error("QR 이미지 로드 실패");
    return null;
  }
}