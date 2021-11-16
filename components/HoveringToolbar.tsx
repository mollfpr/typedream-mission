/* eslint-disable react-hooks/exhaustive-deps */
import { css, cx } from "@emotion/css";
import { Popover, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Editor, Range } from "slate";
import { ReactEditor, useSlate } from "slate-react";
import { CustomElement } from "../declaration";
import { getSelectedElement } from "../utils/utils";
import Button from "./Button";
import FormatButton from "./FormatButton";
import FormatElementButton from "./FormatElementButton";
import Icon from "./Icon";
import Portal from "./Portal";

export default function HoveringToolbar() {
  const ref = useRef<any | undefined>();
  const editor = useSlate();
  const [selectedElement, setSelectedElement] = useState<
    CustomElement | undefined
  >(undefined);

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;
    setSelectedElement(getSelectedElement(editor));

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
        <Popover>
          {({ open }) => (
            <Fragment>
              <Popover.Button
                as={Button}
                className="border-r border-gray-200 text-sm capitalize"
              >
                {selectedElement?.type}
                <Icon className="text-gray-300 ml-1">keyboard_arrow_down</Icon>
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 w-auto max-w-sm px-4 mt-3 transform left-0/2 sm:px-0 lg:max-w-3xl">
                  <div className="overflow-hidden p-2 bg-white rounded bg-white shadow border border-gray-200 flex flex-col">
                    <div className="text-sm font-medium text-gray-500 py-2">
                      Turn Into
                    </div>
                    <FormatElementButton icon="text_format" type="paragraph" />
                    <FormatElementButton icon="title" type="title" />
                  </div>
                </Popover.Panel>
              </Transition>
            </Fragment>
          )}
        </Popover>
        <FormatButton format="bold" icon="format_bold" />
        <FormatButton format="italic" icon="format_italic" />
        <FormatButton format="underlined" icon="format_underlined" />
        <FormatButton format="code" icon="code" />
      </div>
    </Portal>
  );
}
