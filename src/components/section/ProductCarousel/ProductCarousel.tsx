import "./ProductCarousel.scss";

import React, { useEffect, useState, useMemo } from "react";
import { isDesktop } from "react-device-detect";
import { Row, Carousel, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import store from "@/app/providers/redux/store";
import { URLS } from "@/utils/constants";
import { ICoffeeProduct } from "@/types/configCat";
import { StoreCard } from "@/components/ui";
import { setCategoryTitle } from "@/utils/constants/redux/sets";

export const ProductCarousel: React.FC = () => {
  const [productsList, setProductsList] = useState<ICoffeeProduct[]>([]);
  const navigate = useNavigate();

  const { storeProducts } = store.getState().main.flags;

  useEffect(() => {
    if (storeProducts) {
      const { products } = JSON.parse(storeProducts) as {
        products: ICoffeeProduct[];
      };

      const cafeProducts = products.filter((item) => item.category === "CAFÉ");

      setProductsList(cafeProducts);
    }
  }, [storeProducts]);

  const chunkSize = isDesktop ? 3 : 1;

  const productChunks = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < productsList.length; i += chunkSize) {
      chunks.push(productsList.slice(i, i + chunkSize));
    }
    return chunks;
  }, [productsList, chunkSize]);

  if (productsList.length === 0) {
    return null;
  }

  const navigateToStore = () => {
    setCategoryTitle("Café");
    navigate(URLS.store);
  };

  return (
    <section id="product-carousel">
      <div className="fmc-carousel-product-section">
        <Container className="pb-5">
          <div className="fmc-carousel-title">
            <a onClick={navigateToStore}>Explora Nuestro Café</a>
          </div>

          <Carousel id="fmc-carousel-product" indicators={false}>
            {productChunks.map((chunk, index) => (
              <Carousel.Item key={index} interval={2500}>
                <div className="d-flex justify-content-center px-4 px-md-5">
                  <Row
                    xs={chunkSize}
                    md={chunkSize}
                    className="g-4 w-100 justify-content-center"
                  >
                    {chunk.map((item: ICoffeeProduct) => (
                      <StoreCard key={item.id} {...item} />
                    ))}
                  </Row>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </div>
    </section>
  );
};
