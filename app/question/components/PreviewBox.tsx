"use client";

export default function PreviewBox({ text }: { text: string }) {
  return (
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
  );
}
