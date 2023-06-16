import React from "react";
import logoDF from "./logo.svg";
import "./index.css";

export const Logo = () => {
  return (
    <a href="/">
      <img src={logoDF} alt="logo" className="logo-pic" />
    </a>
  );
};
