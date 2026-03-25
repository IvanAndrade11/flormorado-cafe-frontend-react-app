import { ICoffeeProduct } from "@/types/configCat";
import { SelectedFilters } from "@/types/store";

export const scrollToSection = (id: string) => {
  const e = document.getElementById(id);
  e && e.scrollIntoView({ behavior: "smooth" });
};

export const productsByCategory = (
  products: ICoffeeProduct[],
  title: string,
) => {
  return title !== "NUESTROS PRODUCTOS"
    ? products.filter((item) => item.category === title)
    : products;
};
