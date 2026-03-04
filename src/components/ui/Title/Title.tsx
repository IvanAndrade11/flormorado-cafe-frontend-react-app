/* eslint-disable @typescript-eslint/no-unused-vars */

import "./Title.scss";
import React from "react";

import { Card } from "react-bootstrap";

export const Title: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Card className="title-component">
      <h1>{title}</h1>
    </Card>
  );
};
export default Title;
