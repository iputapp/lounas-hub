"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

export { useDisclosure };

/** ConfirmModal component props */
type ConfirmModalProps = {
  /** The header of the modal */
  header?: React.ReactNode;
  /** The body of the modal */
  children?: React.ReactNode;
  /**
   * The disclosure props of the modal
   * @example
   * ```tsx
   * // Need "use client" at the top of the file
   * import { Button } from "@nextui-org/react";
   * import { useDisclosure, ConfirmModal } from "@/components/overlays/ConfirmModal";
   * function Component() {
   *   const { isOpen, onOpenChange, onOpen } = useDisclosure();
   *   return (
   *     <Button Button onPress={onOpen}>Open</Button>
   *     <ConfirmModal useDisclosureProps={{ isOpen, onOpenChange }} />
   *   );
   * }
   * ```
   */
  useDisclosureProps: Pick<ReturnType<typeof useDisclosure>, "isOpen" | "onOpenChange">;
  /**
   * The settings of the buttons (confirm and cancel)
   * @example
   * ```tsx
   * <ConfirmModal
   *   buttonSettings={{
   *     confirm: { label: "Action", props: { onPress: () => console.log("Action!") } },
   *     cancel: { label: "Close" },
   *   }}
   * />
   * ```
   */
  buttonSettings: {
    /** The settings of the confirm button */
    confirm: {
      /** The label of the confirm button */
      label: string;
      /**
       * The props of the NextUI Button component
       * @see {@link https://nextui.org/docs/components/button}
       */
      props?: React.ComponentProps<typeof Button>;
    };
    /** The settings of the cancel button */
    cancel: {
      /** The label of the cancel button */
      label: string;
      /**
       * The props of the NextUI Button component
       * @see {@link https://nextui.org/docs/components/button}
       */
      props?: Omit<React.ComponentProps<typeof Button>, "onPress">;
    };
  };
  /**
   * The size of the modal
   * @see {@link https://nextui.org/docs/components/modal}
   */
  size?: React.ComponentProps<typeof Modal>["size"];
};

/** ConfirmModal component */
export function ConfirmModal({
  header,
  children,
  useDisclosureProps,
  buttonSettings,
  size,
}: ConfirmModalProps) {
  const { isOpen, onOpenChange } = useDisclosureProps;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" size={size}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{header}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter className="justify-center gap-4">
              <Button
                {...buttonSettings.cancel.props}
                color={buttonSettings.cancel.props?.color ?? "danger"}
                variant={buttonSettings.cancel.props?.variant ?? "flat"}
                onPress={onClose}
                className="flex-1"
              >
                {buttonSettings.cancel.label}
              </Button>
              <div className="border-l-2"></div>
              <Button
                {...buttonSettings.confirm.props}
                color={buttonSettings.confirm.props?.color ?? "primary"}
                onPress={buttonSettings.confirm.props?.onPress ?? onClose}
                className="flex-1"
              >
                {buttonSettings.confirm.label}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
