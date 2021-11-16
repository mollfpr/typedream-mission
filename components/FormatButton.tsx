import React from "react";
import { useSlate } from "slate-react";
import { isFormatActive, toggleFormat } from "../utils/utils";
import Button from "./Button";
import Icon from "./Icon";

export interface FormatButtonProps {
  format: string;
  icon: string;
}

export default function FormatButton({ format, icon }: FormatButtonProps) {
  const editor = useSlate();

  return (
    <Button
      active={isFormatActive(editor, format)}
      onMouseDown={(event: Event) => {
        event.preventDefault();
        toggleFormat(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
}
