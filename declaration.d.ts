// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export interface BaseProps {
  className: string;
  [key: string]: unknown;
}

export type TypeElement = "title" | "paragraph" | "code";

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type TitleElement = { type: "title"; children: Descendant[] };
export type ParagraphElement = { type: "paragraph"; children: CustomText[] };
export type CodeElement = { type: "code"; children: CustomText[] };

export type CustomElement = TitleElement | ParagraphElement | CodeElement;

export type FormattedText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underlined?: boolean;
  code?: boolean;
};
export type CustomText = FormattedText;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
