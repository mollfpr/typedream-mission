import { Editor, Text, Transforms } from "slate";
import { CustomEditor } from "../declaration";

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
