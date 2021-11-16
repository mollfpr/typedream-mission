import { css, cx } from "@emotion/css";
import React, { PropsWithChildren, Ref } from "react";
import { BaseProps } from "../declaration";

const Button = React.forwardRef(function Button(
  {
    className,
    active,
    ...props
  }: PropsWithChildren<
    {
      active: boolean;
    } & BaseProps
  >,
  ref: Ref<HTMLSpanElement> | undefined
) {
  return (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        "cursor-pointer flex items-center justify-center p-1.5 transition-colors hover:bg-gray-200",
        active ? "text-blue-500" : "text-black"
      )}
    ></span>
  );
});

export default Button;
