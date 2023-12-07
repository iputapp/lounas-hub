import Link from "next/link";

export default function Page() {
  return (
    <main>
      <div className="grid gap-4">
        <h1>多分ここはログイン画面になる。</h1>
        <Link className="text-blue-600" href={"/dashboard"}>
          ダッシュボード
        </Link>
      </div>
    </main>
  );
}
