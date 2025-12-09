//layout.tsx — “모든 페이지를 감싸는 최상위 레이아웃”

import "../styles/globals.css";
import KioskScaler from "@components/ui/KioskScaler";

export const metadata = {
  title: "순환마루 키오스크",
  description: "AI 분리수거 키오스크",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <KioskScaler>
          {children}
        </KioskScaler>
      </body>
    </html>
  );
}
