import React from "react";

export const Logo: React.FC<{ src: string; width: number }> = ({
  src,
  width,
}) => {
  return (
    <img
      alt="Flormorado Café"
      src={src}
      width={width}
      className="d-inline-block align-top"
    />
  );
};
