import React from "react";
import { Button, DatePicker } from "antd";
import { FastBackwardFilled } from "@ant-design/icons";
import "./icon.css";
import { BaseButton } from "../../components/Button/Button";

export const AntdPage = () => {
  const handleChange = (r) => {};
  return (
    <div className="wrapper">
      <Button onClick={handleChange} size={"large"} type="primary">
        Click
      </Button>
      <BaseButton>Click me</BaseButton>
      <DatePicker></DatePicker>

      <FastBackwardFilled fill="red" className="icon" />
    </div>
  );
};
