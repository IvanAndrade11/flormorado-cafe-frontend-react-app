import "./Store.scss";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";

import store from "@/app/providers/redux/store";

import { StoreCard, Title } from "@/components/ui";
import { NavbarStore } from "@/components/layout";

import { setLoader } from "@/utils/constants/redux/sets";
import {
  createEmptyFilters,
  filterProducts,
  productsByCategory,
  orderProducts,
  parseFilterId,
} from "@/utils/constants";

import { OrderId, SelectedFilters } from "@/types/store";
import { ICoffeeProduct } from "@/types/configCat";

export const Store: React.FC = () => {
  const [allProducts, setAllProducts] = useState<ICoffeeProduct[]>([]);
  const [orderId, setOrderId] = useState<OrderId>("older");
  const [selected, setSelected] =
    useState<SelectedFilters>(createEmptyFilters());

  const { categoryTitle } = store.getState().main.session;
  const { storeProducts } = store.getState().main.flags;

  useEffect(() => {
    setLoader(true);
  }, []);

  useEffect(() => {
    if (storeProducts) {
      const { products } = JSON.parse(storeProducts) as {
        products: ICoffeeProduct[];
      };
      const base = productsByCategory(products, categoryTitle);

      base && setAllProducts(base);
      setLoader(false);
    }
  }, [storeProducts, categoryTitle]);

  const visibleProducts = useMemo(() => {
    const filtered = filterProducts(allProducts, selected);
    return orderProducts(orderId, filtered);
  }, [allProducts, selected, orderId]);

  const orderBy = useCallback((id: OrderId) => setOrderId(id), []);

  const filter = useCallback((id: string) => {
    const parsed = parseFilterId(id);
    if (!parsed) return;
    const [group, opt] = parsed;

    setSelected((prev) => {
      const next: SelectedFilters = {
        ...prev,
        [group]: new Set(prev[group]),
      };
      if (next[group].has(opt)) next[group].delete(opt);
      else next[group].add(opt);
      return next;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSelected(createEmptyFilters());
  }, []);

  return (
    <>
      <div className="container">
        <Title title={categoryTitle} bold={true} />

        <Container className="mt-2 mb-5">
          <Row>
            <Col>
              <NavbarStore
                orderBy={orderBy}
                filter={filter}
                clearFilters={clearFilters}
                selected={selected.size.size}
              />
            </Col>
          </Row>

          {visibleProducts.length > 0 ? (
            <Row>
              <Col>
                <Row xs={2} sm={2} md={2} lg={3} xl={4} className="g-4">
                  {visibleProducts.map((item) => (
                    <StoreCard {...item} key={item.id} />
                  ))}
                </Row>
              </Col>
            </Row>
          ) : (
            <Title title="No hay productos disponibles" bold={true} />
          )}
        </Container>
      </div>
    </>
  );
};
