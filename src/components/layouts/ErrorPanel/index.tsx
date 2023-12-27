import { Card, CardBody, CardHeader } from "@nextui-org/react";

/** ErrorPanel component props */
type ErrorPanelProps = {
  /** The header of the card */
  header?: React.ReactNode;
  /** The children of the card */
  children?: React.ReactNode;
};

/** ErrorPanel component */
export function ErrorPanel({ header, children }: ErrorPanelProps) {
  return (
    <Card className="divide-y-1">
      <CardHeader className="flex items-center justify-center px-4">{header}</CardHeader>
      <CardBody className="px-4 py-4">{children}</CardBody>
    </Card>
  );
}
