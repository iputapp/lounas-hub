"use client";

import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function Page() {
  const [image, setImage] = useState<{ file: File; path: string } | null>(null);

  /** Load an image from files */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;
    const file = e.target.files[0];
    const path = URL.createObjectURL(file);
    setImage({ file, path });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!image) return;
    e.preventDefault();
    console.log(image.file, image.path);
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-4">
      <h2 className="py-3 text-lg font-semibold">お店の追加</h2>
      <form className="grid gap-10" onSubmit={handleSubmit}>
        <section className="mx-auto grid w-full gap-4">
          <div className="relative h-96 w-full overflow-clip rounded-xl bg-neutral-200">
            <div className="absolute inset-0 grid place-content-center">
              <span className="text-xl">画像なし</span>
            </div>
            {image?.path && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                className="absolute inset-0 h-full w-full object-contain"
                src={`${image?.path ?? ""}`}
                alt={image?.file.name}
              />
            )}
          </div>
          <div className="grid gap-2">
            <input
              className="place-self-center"
              type="file"
              accept="image/webp"
              onChange={handleImageChange}
            />
          </div>
        </section>
        <section className="grid place-content-center">
          <Button type="submit" size="lg" color="primary">
            登録
          </Button>
        </section>
      </form>
    </div>
  );
}
