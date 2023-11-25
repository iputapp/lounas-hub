import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.scss";

export const metadata: Metadata = {
  title: "lounas-hub",
  description: "The admin tool of lounas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
