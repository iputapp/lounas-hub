import { Headbar } from "@/components/navigations/Headbar";
import { Sidebar } from "@/components/navigations/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Headbar />
      <main className="flex w-full items-start justify-stretch">
        <Sidebar />
        <section className="h-full w-full p-5">{children}</section>
      </main>
      <footer></footer>
    </>
  );
}
