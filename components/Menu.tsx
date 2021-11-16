import { css, cx } from "@emotion/css";
import React, { PropsWithChildren, Ref } from "react";
import { BaseProps } from "../declaration";

const Menu = React.forwardRef(function Menu(
  { className, ...props }: PropsWithChildren<BaseProps>,
  ref: Ref<HTMLDivElement> | undefined
) {
  return (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          & > * {
            display: inline-block;
          }
        `
      )}
    ></div>
  );
});

export default Menu;
