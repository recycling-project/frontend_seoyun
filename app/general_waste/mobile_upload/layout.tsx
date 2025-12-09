export default function MobileUploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          margin: 0,
          padding: 0,
          overflow: "hidden",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          background: "black",
        }}
      >
        {/* 키오스크 화면 */}
        <div
          style={{
            width: "1080px",
            height: "1920px",
            background: "white",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
