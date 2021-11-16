import React from "react";
import { RenderLeafProps } from "slate-react";

export default function Leaf({ leaf, children, attributes }: RenderLeafProps) {
  if (leaf.bold) {
    children = <b>{children}</b>;
  }

  if (leaf.italic) {
    children = <i>{children}</i>;
  }

  if (leaf.underlined) {
    children = <u>{children}</u>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  return <span {...attributes}>{children}</span>;
}
