import "./Store.scss";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import store from "@/app/providers/redux/store";

import { Title } from "@/components/ui";

import { Button, Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { NavbarStore } from "@/components/layout";
import { images } from "@/utils/constants";
import { setLoader } from "@/utils/constants/redux/sets";

export const Store: React.FC = () => {
  const navigate = useNavigate();

  const [productsList, setProductsList] = React.useState([]);

  const { categoryTitle } = store.getState().main.session;
  const { storeProducts } = store.getState().main.flags;

  useEffect(() => {
    setLoader(true);
  }, []);

  useEffect(() => {
    if (storeProducts) {
      const { products } = JSON.parse(storeProducts);
      setProductsList(products);
      setLoader(false);
    }
  }, [storeProducts]);

  const orderBy = (id: string) => {
    console.log(id);
  };

  const filter = (id: string) => {
    console.log(id);
  };

  return (
    <>
      <div className="container mt-5">
        <Title title={categoryTitle} bold={true} />

        <Container className="my-5">
          <Row>
            {/* <Col
              className="store-first-column"
              style={{ backgroundColor: "transparent" }}
            /> */}

            <Col>
              <NavbarStore orderBy={orderBy} filter={filter} />
            </Col>
          </Row>

          <Row>
            {/* <Col
              className="store-first-column"
              style={{ backgroundColor: "blue" }}
            >
              Aqui van los filtros
            </Col> */}

            <Col>
              <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
                {productsList.map((item: any) => (
                  <Col key={item.id}>
                    <Card className="store-card">
                      <Card.Img
                        variant="top"
                        src={item.imageUrl}
                        className="store-card-image"
                      />
                      <Card.Body className="store-card-body">
                        <Card.Title className="store-card-body-title">
                          {item.name}
                        </Card.Title>
                        {!item.stock && (
                          <Card.Subtitle className="mb-2 text-muted">
                            AGOTADO
                          </Card.Subtitle>
                        )}
                      </Card.Body>
                      <ListGroup className="list-group-flush store-card-list-group">
                        <ListGroup.Item className="store-card-list-group-item">
                          <strong>Molienda:</strong> {item.grinding}
                        </ListGroup.Item>
                        <ListGroup.Item className="store-card-list-group-item">
                          <strong>Tostión:</strong> {item.roastOptions[0]}
                        </ListGroup.Item>
                        <ListGroup.Item className="store-card-list-group-item">
                          <strong>Variedad:</strong> {item.varieties[3]}
                        </ListGroup.Item>
                      </ListGroup>
                      <Card.Body className="store-card-body-button">
                        <Card.Text className="store-card-body-title">
                          $ {item.price}
                        </Card.Text>
                        <Button
                          onClick={() => console.log("Ver producto")}
                          className="fmc-button"
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
        </Container>
      </div>
    </>
  );
};
