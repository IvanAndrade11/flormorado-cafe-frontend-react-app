import "./CategoryCarousel.scss";

import React, { useEffect } from "react";
import { isDesktop } from "react-device-detect";
import { Row, Carousel, Container } from "react-bootstrap";

import store from "@/app/providers/redux/store";
import { setLoader } from "@/utils/constants/redux/sets";
import { scrollToSection } from "@/utils/constants";
import { ICategory } from "@/types/configCat";
import { CategoryCard } from "@/components/ui";

export const CategoryCarousel: React.FC = () => {
  const [categoriesList, setCategoriesList] = React.useState<ICategory[]>([]);

  const { storeCategories } = store.getState().main.flags;

  useEffect(() => {
    setLoader(true);
  }, []);

  useEffect(() => {
    if (storeCategories) {
      const { categories } = JSON.parse(storeCategories) as {
        categories: ICategory[];
      };
      setCategoriesList(categories);
      setLoader(false);
    }
  }, [storeCategories]);

  return (
    <section id="category-carousel">
      <div className="fmc-carousel-category-section">
        <Container className="pb-5">
          <div className="fmc-carousel-title">
            <a onClick={() => scrollToSection("fmc-carousel-category")}>
              Categorías
            </a>
          </div>

          {isDesktop ? (
            <Row xs={2} md={3} lg={3} className="g-4">
              {categoriesList.map((item: ICategory) => (
                <CategoryCard {...item} />
              ))}
            </Row>
          ) : (
            <Carousel
              id="fmc-carousel-category"
              data-bs-theme="dark"
              indicators={false}
              fade
            >
              {categoriesList.map((item: ICategory, index: number) => (
                <Carousel.Item key={index} interval={2000}>
                  <CategoryCard {...item} />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Container>
      </div>
    </section>
  );
};
