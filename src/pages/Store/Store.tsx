import "./Store.scss";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Button, Container, Row, Col, Card, ListGroup } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

import store from "@/app/providers/redux/store";

import { Title } from "@/components/ui";
import { NavbarStore } from "@/components/layout";

import { setLoader } from "@/utils/constants/redux/sets";
import {
  createEmptyFilters,
  filterProducts,
  orderProducts,
  parseFilterId,
} from "@/utils/constants";

import { ICoffeeProduct, OrderId, SelectedFilters } from "@/types/store";

export const Store: React.FC = () => {
  // const navigate = useNavigate();

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
      const base =
        categoryTitle !== "NUESTROS PRODUCTOS"
          ? products.filter((item) => item.category === categoryTitle)
          : products;

      base && setAllProducts(base);
      setLoader(false);
    }
  }, [storeProducts, categoryTitle]);

  const visibleProducts = useMemo(() => {
    const filtered = filterProducts(allProducts, selected);
    return orderProducts(orderId, filtered);
  }, [allProducts, selected, orderId]);

  const orderBy = useCallback((id: OrderId) => {
    setOrderId(id);
  }, []);

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
      <div className="container mt-5">
        <Title title={categoryTitle} bold={true} />

        <Container className="my-5">
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
                    <Col key={item.id}>
                      <Card className="store-card">
                        <div className="store-card-image-container">
                          <Card.Img
                            variant="top"
                            src={item.imageUrl}
                            className="store-card-image"
                            width={425}
                            alt={item.name}
                            loading="lazy"
                          />
                        </div>
                        <Card.Body className="store-card-body">
                          <Card.Title className="store-card-body-title">
                            {item.name}
                          </Card.Title>
                          {!item.stock && (
                            <Card.Subtitle className="mb-2 text-muted">
                              <strong>AGOTADO</strong>
                            </Card.Subtitle>
                          )}
                        </Card.Body>
                        <ListGroup className="list-group-flush store-card-list-group">
                          <ListGroup.Item className="store-card-list-group-item">
                            <strong>Molienda:</strong> {item.grinding}
                          </ListGroup.Item>
                          <ListGroup.Item className="store-card-list-group-item">
                            <strong>Tostión:</strong> {item.roastOptions}
                          </ListGroup.Item>
                          <ListGroup.Item className="store-card-list-group-item">
                            <strong>Variedad:</strong> {item.variety}
                          </ListGroup.Item>
                        </ListGroup>
                        <Card.Body className="store-card-body-button">
                          <Card.Text className="store-card-body-title">
                            $ {item.price}
                          </Card.Text>
                          <Button
                            // onClick={() => navigate(`/producto/${item.id}`)}
                            onClick={() =>
                              alert(
                                "¡Próximamente podrás comprar este producto!",
                              )
                            }
                            variant="secondary"
                            className="fmc-button"
                            style={{ minWidth: "100%" }}
                            disabled={!item.stock}
                          >
                            {item.stock ? "Ver producto" : "AGOTADO"}
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
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
