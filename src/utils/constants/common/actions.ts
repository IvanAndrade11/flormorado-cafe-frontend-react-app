import { NavbarMenuItem } from "@/types/components";
import { IBlog, ICoffeeProduct } from "@/types/configCat";
import { URLS } from "./data";

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

export const getProductPrice = (item: ICoffeeProduct) => {
  const numericPrice = Number(
    typeof item.price === "string" ? item.price.replace(/\./g, "") : item.price,
  );
  const total = numericPrice * Number(item.quantity || 1);
  return formatPrice(total);
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CO").format(price);
};

export const getBlogSubItems = (blog: IBlog): NavbarMenuItem[] => {
  return blog.entries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    url: `${URLS.blog}/${entry.slug}`,
  }));
};
