import type { TableHeaderT } from "@/components/widgets/TableEditor";
import { TableEditor } from "@/components/widgets/TableEditor";
import type { Restaurant } from "@/lib/zod";

/** The key of the restaurant schema */
type RestaurantKey = keyof Restaurant;
/** The row object of the table */
type TableHeader = {
  key: RestaurantKey | TableHeaderT["key"];
} & Omit<TableHeaderT, "key">;
/** The header of the table */
const header: TableHeader[] = [
  { key: "name", label: "店名" },
  { key: "travelTime", label: "片道時間(分)", align: "end" },
  { key: "travelDistance", label: "片道距離(m)", align: "end" },
  { key: "address", label: "住所" },
  { key: "actions", label: "操作", align: "center" },
];

export default function Page() {
  return (
    <div className="grid gap-4">
      <h2 className="py-3 text-lg font-semibold">お店の編集</h2>
      <TableEditor<Restaurant>
        resource={{
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v-beta/restaurants`,
        }}
        header={header}
      />
    </div>
  );
}
