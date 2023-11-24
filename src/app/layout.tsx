import type { Metadata } from "next";
/** @see {@link https://nextui.org/docs/guide/installation#provider-setup} */
import { NextUIProvider } from "@nextui-org/react";
import "./globals.scss";

export const metadata: Metadata = {
  title: "lounas-hub",
  description: "The admin tool of lounas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
