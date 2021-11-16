import { RenderElementProps } from "slate-react";

export default function DefaultElement({
  attributes,
  children,
}: RenderElementProps) {
  return (
    <p className="mb-2" {...attributes}>
      {children}
    </p>
  );
}
