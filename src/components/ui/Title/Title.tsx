/* eslint-disable @typescript-eslint/no-unused-vars */

import "./Title.scss";
import React from "react";

import { Card } from "react-bootstrap";

export const Title: React.FC<{ title: string; bold?: boolean }> = ({
  title,
  bold,
}) => {
  return (
    <Card className="title-component">
      {bold ? (
        <h1 style={{ fontWeight: "bold" }}>{title}</h1>
      ) : (
        <h1>{title}</h1>
      )}
    </Card>
  );
};
export default Title;
