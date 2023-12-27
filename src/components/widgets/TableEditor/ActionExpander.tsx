"use client";

import MoreVert from "@icons/more-vert.svg";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

/** Action type of the dropdown menu */
type ActionType = "detail" | "edit" | "delete";

export type { ActionType };

/** ActionExpander component props */
type ActionExpanderProps = {
  /**
   * The handler of the action
   * @param key The key of the action
   * @description The key is one of the `ActionType` type. (`detail`, `edit`, and `delete`)
   * @example
   * ```tsx
   * import type { ActionType } from "./ActionExpander";
   * import { ActionExpander } from "./ActionExpander";
   * <ActionExpander handleAction={(key: ActionType) => console.log(key)} />
   * ```
   */
  handleAction: React.ComponentProps<typeof DropdownMenu>["onAction"];
};

/** ActionExpander component */
export function ActionExpander({ handleAction }: ActionExpanderProps) {
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <span className="text-neutral-500">
              <MoreVert />
            </span>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="" onAction={handleAction}>
          <DropdownItem key="detail">詳細</DropdownItem>
          <DropdownItem key="edit" showDivider>
            編集
          </DropdownItem>
          <DropdownItem key="delete" color="danger" className="text-danger">
            削除
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
