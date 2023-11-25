"use client";

import { NextUIProvider } from "@nextui-org/react";

/** @see {@link https://nextui.org/docs/frameworks/nextjs#setup-provider} */
export function Providers({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
