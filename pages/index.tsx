/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { Fragment, useCallback, useRef, useState } from "react";
import { createEditor, Descendant, Editor } from "slate";
import { Editable, RenderElementProps, Slate, withReact } from "slate-react";

import DefaultElement from "../components/DefaultElement";
import HoveringToolbar from "../components/HoveringToolbar";
import Leaf from "../components/Leaf";
import TitleElement from "../components/TitleElement";

const Home: NextPage = () => {
  const initialValue: Descendant[] = [
    {
      type: "title",
      children: [{ text: "Enforce Your Layout!" }],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "This example shows how to enforce your layout with domain-specific constraints. This document will always have a title block at the top and at least one paragraph in the body. Try deleting them and see what happens!",
        },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "This also have a hover toolbar!",
          code: true,
        },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "They found Mary, as usual, deep in the study of thorough-bass and human nature; and had some extracts to admire, and some new observations of threadbare morality to listen to. Catherine and Lydia had information for them of a different sort.",
        },
      ],
    },
  ];
  const [value, setValue] = useState(initialValue);
  const editorRef = useRef<Editor>();
  if (!editorRef.current) editorRef.current = withReact(createEditor());
  const editor = editorRef.current;

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "title":
        return <TitleElement {...props} />;

      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Typedream Frontend Project</title>
      </Head>

      <div
        className="min-w-screen min-h-screen"
        style={{
          backgroundColor: "#f7f6f2",
        }}
      >
        <div className="max-w-5xl min-h-screen mx-auto bg-white p-10">
          <a
            href="https://typedream.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center mb-12"
          >
            <img
              src="https://api.typedream.com/v0/document/public/e7ee5f1e-b703-486f-950f-33cd6f5328b5_block_cloud_8bit_compressed_png.png"
              style={{
                height: 28,
              }}
              alt="website logo"
            />

            <span className="ml-2 font-bold text-2xl">Typedream</span>
          </a>

          <Slate editor={editor} value={value} onChange={setValue}>
            <div>
              <HoveringToolbar />
            </div>
            <Editable
              renderElement={renderElement}
              renderLeaf={(props) => <Leaf {...props} />}
              placeholder="Start typing..."
              autoFocus
            />
          </Slate>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
