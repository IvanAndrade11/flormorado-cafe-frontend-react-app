import { Image, Carousel } from "react-bootstrap";
import "./ProductGallery.scss";

export const ProductGallery = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <Carousel variant="dark" className="fmc-product-gallery-carousel">
      <Carousel.Item>
        <div className="product-gallery">
          <Image src={imageUrl} className="product-image" />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="product-gallery">
          <Image src={imageUrl} className="product-image" />
        </div>
      </Carousel.Item>
    </Carousel>
  );
};
