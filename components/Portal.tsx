import React from "react";
import ReactDOM from "react-dom";

export interface PortalProps {
  children: React.ReactNode;
}

export default function Portal({ children }: PortalProps) {
  return typeof document === "object"
    ? ReactDOM.createPortal(children, document.body)
    : null;
}
