import "./Categories.scss";

import React, { useEffect, useMemo } from "react";
import { Row } from "react-bootstrap";

import store from "@/app/providers/redux/store";
import { setLoader } from "@/utils/constants/redux/sets";
import { Title } from "@/components/ui";
import { ICategory } from "@/types/configCat";
import { CategoryCard } from "@/components/ui/Store/CategoryCard/CategoryCard";

export const Categories: React.FC = () => {
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
    storeCategories &&
    categoriesList.length > 0 && (
      <>
        <div className="container">
          <Title title="CATEGORIAS" />

          <Row xs={2} md={2} lg={3} className="g-4 mt-2 mb-5">
            {categoriesList.map((item: ICategory) => (
              <CategoryCard key={item.id} {...item} />
            ))}
          </Row>
        </div>
      </>
    )
  );
};
