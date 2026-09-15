import { Image, Carousel } from "react-bootstrap";
import "./ProductGallery.scss";

export const ProductGallery = ({
  imageUrl,
  productName,
}: {
  imageUrl: string;
  productName: string;
}) => {
  return (
    <Carousel variant="dark" className="fmc-product-gallery-carousel">
      <Carousel.Item>
        <div className="product-gallery">
          <Image src={imageUrl} alt={productName} className="product-image" />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="product-gallery">
          <Image src={imageUrl} alt={productName} className="product-image" />
        </div>
      </Carousel.Item>
    </Carousel>
  );
};
