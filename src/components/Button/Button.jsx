import React from "react";
import cn from "classnames";
import "./index.css";

export const BaseButton = ({
  type = "primary",
  children,
  onClick = () => {},
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={cn("btn", {
        primary: type === "primary",
        secondary: type === "secondary",
      })}
    >
      {children}
    </button>
  );
};
