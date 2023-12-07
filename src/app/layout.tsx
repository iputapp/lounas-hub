import "./globals.scss";

import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "lounas-hub",
  description: "lounasの管理ツールです。",
};

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
