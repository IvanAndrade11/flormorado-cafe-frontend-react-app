import "./CategoryCarousel.scss";

import React, { useEffect, useMemo } from "react";
import { isDesktop } from "react-device-detect";
import { Row, Carousel, Container } from "react-bootstrap";

import store from "@/app/providers/redux/store";
import { setLoader } from "@/utils/constants/redux/sets";
import { scrollToSection } from "@/utils/constants";
import { ICategory } from "@/types/configCat";
import { CategoryCard } from "@/components/ui";

export const CategoryCarousel: React.FC = () => {
  const { storeCategories } = store.getState().main.flags;

  const categoriesList = useMemo<ICategory[]>(() => {
    if (!storeCategories) return [];
    const { categories } = JSON.parse(storeCategories) as {
      categories: ICategory[];
    };
    return categories;
  }, [storeCategories]);

  useEffect(() => {
    setLoader(!storeCategories);
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
                <CategoryCard key={item.id} {...item} />
              ))}
            </Row>
          ) : (
            <Carousel
              id="fmc-carousel-category"
              className="px-5"
              data-bs-theme="dark"
              indicators={false}
              fade
            >
              {categoriesList.map((item: ICategory, index: number) => (
                <Carousel.Item key={index} interval={2000}>
                  <CategoryCard key={item.id} {...item} />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Container>
      </div>
    </section>
  );
};
