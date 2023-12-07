"use client";

import Search from "@icons/search.svg";
import { Input } from "@nextui-org/react";
import { useCallback } from "react";

/** SearchFilter state */
type SearchFilterState = {
  /** The selected filter (column key) */
  key: string;
  /** The search query */
  value: string;
};

export type { SearchFilterState };

/** SearchFilter component props */
type SearchFilterProps = {
  /** The label of the input */
  label: string;
  /** The header of the table */
  header: {
    /** The key of the object in the column */
    key: string;
    /** The name of the column */
    label: string;
  }[];
  /** The search filter state */
  filterState: {
    state: SearchFilterState;
    setState: React.Dispatch<React.SetStateAction<SearchFilterState>>;
  };
};

/** SearchFilter component */
export function SearchFilter({ label, header, filterState }: SearchFilterProps) {
  /** Handle the change of the input and select */
  const handleChange = useCallback(
    (changed: { [key in keyof SearchFilterState]?: string }) => {
      filterState.setState((prev) => ({ ...prev, ...changed }));
    },
    [filterState]
  );

  return (
    <div className="flex items-center justify-start">
      <Input
        type="text"
        label={label}
        labelPlacement="outside"
        placeholder="検索"
        onValueChange={(value) => handleChange({ value: value })}
        size="sm"
        startContent={
          <span className="text-sm text-neutral-400">
            <Search />
          </span>
        }
        endContent={
          <select
            className="border-l-1 bg-transparent text-sm text-neutral-600 outline-none"
            id="currency"
            name="currency"
            onChange={(e) => handleChange({ key: e.target.value })}
          >
            {header.map(
              (item) =>
                item.key !== "actions" && (
                  <option key={item.key} value={item.key}>
                    {item.label}
                  </option>
                )
            )}
          </select>
        }
      />
    </div>
  );
}
