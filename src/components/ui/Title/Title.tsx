/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import "./Title.scss";

export const Title: React.FC<{
  message: string;
  center?: boolean;
  className?: string;
}> = ({ message, center, className }) => {
  const stylesTitle = center ? `Title center` : "Title";
  return (
    <>
      <div className={`${stylesTitle} ${className}`}>{message}</div>
    </>
  );
};
export default Title;
