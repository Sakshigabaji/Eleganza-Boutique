// app/layout.tsx
import "./globals.css";
import LayoutWrapper from "./component/LayoutWrapper";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* DO NOT wrap in CartProvider here, let LayoutWrapper do it */}
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}