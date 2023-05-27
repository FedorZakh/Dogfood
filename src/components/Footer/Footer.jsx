/* eslint-disable no-unused-vars */

import React, { useEffect } from "react";
import styled from "styled-components";

const Button = styled.div`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: red;
  color: white;
  border: 2px solid white;
`;

export const Footer = () => {
  const style = { color: "red", marginTop: "100px", marginLeft: "100px" };

  return (
    <div>
      <h1 style={style}></h1>
    </div>
  );
};
