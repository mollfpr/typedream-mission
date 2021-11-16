import React from "react";
import { RenderElementProps } from "slate-react";

export default function TitleElement({
  attributes,
  children,
}: RenderElementProps) {
  return (
    <h2
      className="text-2xl font-bold leading-7 text-gray-900 mb-2 sm:text-3xl sm:truncate"
      {...attributes}
    >
      {children}
    </h2>
  );
}
