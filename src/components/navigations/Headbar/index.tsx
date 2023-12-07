import Settings from "@icons/settings.svg";
import Image from "next/image";
import Link from "next/link";

/** Headbar component */
export function Headbar() {
  return (
    <header className="sticky flex h-12 w-full items-center justify-between border-b-1 px-4 py-2">
      <Link href={"/dashboard"}>
        <h1>
          <Image src={"/icons/logo-outline-color.svg"} alt="lounas-hub" width={24} height={24} />
        </h1>
      </Link>
      <nav className="flex items-center justify-end space-x-4">
        <Link href={"/dashboard/settings"}>
          <span className="text-sm">
            <Settings />
          </span>
        </Link>
      </nav>
    </header>
  );
}
