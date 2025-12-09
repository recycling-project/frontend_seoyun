export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch("http://15.164.169.146:8080/recycle/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    return new Response(JSON.stringify({ error: "EC2 연결 실패" }), { status: 500 });
  }
}
