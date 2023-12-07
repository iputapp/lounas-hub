"use client";

import type { Selection, SortDescriptor } from "@nextui-org/react";
import {
  getKeyValue,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import useSWR from "swr";

import { ErrorPanel } from "@/components/layouts/ErrorPanel";
import { ConfirmModal, useDisclosure } from "@/components/overlays/ConfirmModal";
import { fetcher } from "@/lib/swr/fetcher";
import type { PaginationApi } from "@/types/pagination";
import type { PaginationParams } from "@/types/pagination/params";

import type { ActionType } from "./ActionExpander";
import { ActionExpander } from "./ActionExpander";
import type { SearchFilterState } from "./SearchFilter";
import { SearchFilter } from "./SearchFilter";

/** TableHeader type */
type TableHeaderT = {
  /**
   * The key of the object in the column
   * @description If the key is `actions`, the column of `ActionExpander` will be rendered.
   */
  key: "actions" | (string & NonNullable<unknown>);
  /** The name of the column */
  label: string;
  /** The alignment of the column */
  align?: React.ComponentProps<typeof TableColumn>["align"];
};

export type { TableHeaderT };

/** TableEditor component props */
type TableEditorProps = {
  /** The resource to fetch */
  resource: {
    /** The resource URL to fetch */
    url: string;
  };
  /** The header of the table */
  header: TableHeaderT[];
};

/**
 * TableEditor component
 * @example
 * ```tsx
 * <TableEditor<TypeOfSchema> />
 * ```
 */
export function TableEditor<T extends { id: string }>({ resource, header }: TableEditorProps) {
  /** Pagination query */
  const [pagination, setPagination] = useState<PaginationParams>({ page: 1, limit: 50 });
  /** Search filter */
  const [search, setSearch] = useState<SearchFilterState>({
    key: header[0].key ?? "",
    value: "",
  });
  /** Selected keys */
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  /** Sort descriptor */
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: header[0].key ?? "",
    direction: "ascending",
  });

  /** Fetch the data */
  const { data, error, isLoading } = useSWR<PaginationApi<T>, Error>(
    `${resource.url}?page=${pagination.page}&limit=${pagination.limit}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  /** Has input in the search filter */
  const hasSearchFilter = !!search.value;

  /** The filtered items */
  const filteredItems = useMemo(() => {
    /** Pick the results from the data */
    const results = data?.results ?? [];

    /** Sort the results by the sort descriptor */
    results.sort((a, b) => {
      const aKey = a[sortDescriptor.column as keyof T];
      const bKey = b[sortDescriptor.column as keyof T];
      // const cmp = aKey < bKey ? -1 : aKey > bKey ? 1 : 0; // Fastest, String: UTF-16
      /** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#sensitivity} */
      const cmp = String(aKey).localeCompare(String(bKey), "ja", {
        numeric: true,
        sensitivity: "base",
      });
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });

    /** If non of filters are active, return the fetch result */
    if (!hasSearchFilter) return results;

    /** Filter the results by the search filter */
    const searchedFiltered = results.filter(
      (item) =>
        item[search.key as keyof T]?.toString().toLowerCase().includes(search.value.toLowerCase())
    );

    /**
     * @todo If more filters are added, add them here
     */

    return searchedFiltered;
  }, [data?.results, hasSearchFilter, sortDescriptor, search]);

  /** The total pages of the data */
  const pages = useMemo(() => {
    /** If fetched data is empty, return 0 */
    if (!data?.count) return 0;
    /** If search filter is active, return the total pages of the filtered items */
    // if (hasSearchFilter) return Math.ceil(filteredItems.length / pagination.limit);
    /** Otherwise, return the `count` of the fetched data */
    return Math.ceil(data.count / pagination.limit);
  }, [data?.count, pagination.limit]);

  /** The loading state of fetching data */
  // const loadingState = isLoading ? "loading" : "idle";

  /** The confirm modal state of the actions */
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  /** Return the error component if the data fetching failed */
  if (error) {
    return (
      <ErrorPanel header={<span className="font-semibold">エラー</span>}>
        <span>読み込みに失敗しました。</span>
      </ErrorPanel>
    );
  }

  /** Handle the actions */
  const actionHandler = (key: ActionType) => {
    switch (key) {
      case "detail":
        return alert("detail");
      case "edit":
        return alert("edit");
      case "delete":
        return onOpen();
    }
  };

  return (
    <>
      <Table
        aria-label=""
        isHeaderSticky
        isStriped
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        topContent={
          <div className="flex items-center justify-between">
            <SearchFilter
              label="絞り込み(ページごと)"
              header={header}
              filterState={{ state: search, setState: setSearch }}
            />
            <div></div>
          </div>
        }
        bottomContent={
          <div className="mx-auto flex w-[calc(100%-2rem)] items-center justify-between">
            {data?.count && (
              <div className="flex w-32 flex-wrap items-center justify-start space-x-1 text-sm text-neutral-500">
                <span>選択:</span>
                <span>{selectedKeys === "all" ? data.count : selectedKeys.size}</span>
                <span>件</span>
                <span>/</span>
                <span>{data.count}</span>
                <span>件</span>
              </div>
            )}
            {pages > 0 && (
              <Pagination
                isCompact
                showControls
                color="primary"
                page={pagination.page}
                total={pages}
                onChange={(page) => setPagination((prev) => ({ ...prev, page: page }))}
              />
            )}
            <div className="w-32">{/* Dummy element for layout */}</div>
          </div>
        }
        topContentPlacement="outside"
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[calc(100dvh-18rem)]",
          table: "min-h-[5rem]",
          tbody: "relative",
        }}
      >
        <TableHeader>
          {header.map((column) => (
            <TableColumn
              key={column.key}
              align={column.align}
              allowsSorting={column.key === "actions" ? false : true}
            >
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          items={filteredItems}
          emptyContent={isLoading ? null : "データなし"}
          loadingContent={<Spinner />}
          isLoading={isLoading}
          // loadingState={loadingState}
        >
          {(item) => (
            <TableRow key={item.id ?? crypto.randomUUID()}>
              {(columnKey) =>
                columnKey === "actions" ? (
                  <TableCell>
                    <ActionExpander handleAction={(key) => actionHandler(key as ActionType)} />
                  </TableCell>
                ) : (
                  <TableCell>{getKeyValue(item, columnKey) ?? "N/A"}</TableCell>
                )
              }
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ConfirmModal
        useDisclosureProps={{ isOpen, onOpenChange }}
        buttonSettings={{
          confirm: {
            label: "削除",
            props: { color: "danger", variant: "light", onPress: (e) => alert(e) },
          },
          cancel: {
            label: "キャンセル",
            props: { color: "primary", variant: "light" },
          },
        }}
        size="xs"
      >
        <div className="grid place-content-center py-2">
          <p>削除しますか？</p>
        </div>
      </ConfirmModal>
    </>
  );
}
