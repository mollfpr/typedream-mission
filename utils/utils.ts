import { Editor, Element, Text, Transforms } from "slate";
import { CustomEditor, CustomElement, TypeElement } from "../declaration";

export const isFormatActive = (editor: CustomEditor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n: any) => n[format] === true,
    mode: "all",
  });

  return !!match;
};

export const toggleFormat = (editor: CustomEditor, format: string) => {
  const isActive = isFormatActive(editor, format);

  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
};

export const toggleBlock = (editor: CustomEditor, format: TypeElement) => {
  const newProperties: Partial<Element> = {
    type: format,
  };
  Transforms.setNodes<Element>(editor, newProperties);
};

export const getSelectedElement = (editor: CustomEditor) => {
  const { selection } = editor;
  var selected: CustomElement | undefined;

  if (selection !== null && selection.anchor !== null) {
    selected = editor.children[selection.anchor.path[0]] as CustomElement;
  } else {
    selected = undefined;
  }

  return selected;
};
