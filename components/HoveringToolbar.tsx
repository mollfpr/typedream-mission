import { css, cx } from "@emotion/css";
import React, { useEffect, useRef } from "react";
import { Editor, Range } from "slate";
import { ReactEditor, useSlate } from "slate-react";
import FormatButton from "./FormatButton";
import Portal from "./Portal";

export default function HoveringToolbar() {
  const ref = useRef<any | undefined>();
  const editor = useSlate();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) return;

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection!.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();

    el.style.opacity = "1";
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
  });

  return (
    <Portal>
      <div
        ref={ref}
        className={cx(
          "rounded bg-white shadow border border-gray-200 transition-opacity opacity-0",
          css`
            position: absolute;
            z-index: 1;
            top: -10000px;
            left: -10000px;
            margin-top: -6px;

            & > * {
              display: inline-block;
            }
          `
        )}
      >
        <FormatButton format="bold" icon="format_bold" />
        <FormatButton format="italic" icon="format_italic" />
        <FormatButton format="underlined" icon="format_underlined" />
        <FormatButton format="code" icon="code" />
      </div>
    </Portal>
  );
}
