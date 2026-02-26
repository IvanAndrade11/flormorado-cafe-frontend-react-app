import "./Image.scss";
import { IImage } from "@/types/ui";

export const Image = ({ className, src, alt, width, height, id }: IImage) => {
  return (
    <img
      src={src}
      id={id}
      alt={alt ? alt : ""}
      width={width}
      height={height}
      className={className ? className : ""}
    />
  );
};
