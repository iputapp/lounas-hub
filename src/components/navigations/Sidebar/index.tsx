"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Navigation link component */
function NavLink({ children, href }: { children?: React.ReactNode; href: string }) {
  const pathname = usePathname();
  const [isCurrent, setIsCurrent] = useState(false);

  useEffect(() => {
    setIsCurrent(pathname === href);
  }, [pathname, href]);

  return (
    <li className={`rounded-lg px-2 py-1.5 ${isCurrent ? "bg-neutral-100 font-medium" : ""}`}>
      <Link href={href}>{children}</Link>
    </li>
  );
}

/** Sidebar component */
export function Sidebar() {
  const pathname = usePathname();
  const [section, setSection] = useState("");

  useEffect(() => {
    const section = pathname.split("/")[2] || "dashboard";
    setSection(section.charAt(0).toUpperCase() + section.slice(1));
  }, [pathname]);

  return (
    <aside className="grid h-full w-72 content-start border-r-1">
      <div className="border-b-1 px-4 py-2">
        <h2 className="text-lg font-semibold">{section}</h2>
      </div>
      <nav className="px-2 py-4">
        {/** @todo ここは、ページによって表示する内容を変える */}
        <ul className={"grid gap-2 text-sm"}>
          <NavLink href="/dashboard/restaurant/new">お店を新規追加</NavLink>
          <NavLink href="/dashboard/restaurant/edit">お店を編集</NavLink>
        </ul>
      </nav>
    </aside>
  );
}
