import { css, cx } from "@emotion/css";
import React, { PropsWithChildren, Ref } from "react";
import { BaseProps } from "../declaration";

const Icon = React.forwardRef(function Icon(
  { className, ...props }: PropsWithChildren<BaseProps>,
  ref: Ref<HTMLSpanElement> | undefined
) {
  return (
    <span
      {...props}
      ref={ref}
      className={cx(
        "material-icons",
        className,
        css`
          font-size: 18px;
          vertical-align: text-bottom;
        `
      )}
    ></span>
  );
});

export default Icon;
