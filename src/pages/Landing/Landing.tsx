import React from "react";

import {
  Hero,
  InfiniteCarousel,
  CategoryCarousel,
  ProductCarousel,
} from "@/components/section";

export const Landing: React.FC = () => {
  return (
    <>
      <Hero />

      <ProductCarousel />

      <InfiniteCarousel />

      <CategoryCarousel />
    </>
  );
};
