import React from "react";
import { Node } from "slate";
import { useSlate } from "slate-react";
import { TypeElement } from "../declaration";
import { toggleBlock } from "../utils/utils";
import Button from "./Button";
import Icon from "./Icon";

export interface FormatElementButtonProps {
  icon: string;
  type: TypeElement;
}

export default function FormatElementButton({
  icon,
  type,
}: FormatElementButtonProps) {
  const editor = useSlate();
  const { selection, children } = editor;

  return (
    <Button
      className="text-sm capitalize"
      onMouseDown={(event: Event) => {
        event.preventDefault();

        const path = selection?.anchor.path;

        if (path != undefined && path[0] > -1) {
          toggleBlock(editor, type);
        }
      }}
    >
      <Icon className="mr-4">{icon}</Icon>
      {type}
    </Button>
  );
}
