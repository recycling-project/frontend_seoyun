"use client";

export default function Keyboard({ keys, onPress }: any) {
  return (
    <div
      style={{
        background: "#f3f3f3",
        padding: "20px 10px",
        borderRadius: 20,
      }}
    >
      {keys.map((row: string[], idx: number) => (
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
              onClick={() => onPress(k)}
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
    </div>
  );
}
