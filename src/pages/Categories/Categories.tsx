import "./Categories.scss";

import React, { useEffect } from "react";

import { setLoader } from "@/utils/constants/redux/sets";
import { Title } from "@/components/ui";

import { Row } from "react-bootstrap";
import store from "@/app/providers/redux/store";
import { ICategory } from "@/types/configCat";
import { CategoryCard } from "@/components/ui/CategoryCard/CategoryCard";

export const Categories: React.FC = () => {
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
    storeCategories &&
    categoriesList.length > 0 && (
      <>
        <div className="container mt-5">
          <Title title="CATEGORIAS" />

          <Row xs={1} md={2} lg={3} className="g-4 my-5">
            {categoriesList.map((item: ICategory) => (
              <CategoryCard {...item} />
            ))}
          </Row>
        </div>
      </>
    )
  );
};
