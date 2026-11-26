import React, { useEffect, useMemo } from "react";
import { Row } from "react-bootstrap";

import { setLoader } from "@/utils/constants/redux/sets";
import { Title } from "@/components/ui";
import { ICategory } from "@/types/configCat";
import { CategoryCard } from "@/components/ui/Store/CategoryCard/CategoryCard";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useAppSelector } from "@/app/providers/redux";

export const Categories: React.FC = () => {
  const { storeCategories } = useAppSelector((state) => state.main.flags);

  const { ref, revealClassName } = useRevealOnScroll<HTMLDivElement>();

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

          <div ref={ref} className={revealClassName}>
            <Row xs={2} md={2} lg={3} className="g-4 mt-2 mb-5">
              {categoriesList.map((item: ICategory, index: number) => (
                <CategoryCard
                  key={item.id}
                  {...item}
                  revealDelay={(index % 3) + 1}
                />
              ))}
            </Row>
          </div>
        </div>
      </>
    )
  );
};
