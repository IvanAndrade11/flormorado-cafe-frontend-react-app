import "./Store.scss";

import React from "react";
import store from "@/app/providers/redux/store";

import { Title } from "@/components/ui";

import { Container, Row, Col } from "react-bootstrap";
import { NavbarStore } from "@/components/layout";

export const Store: React.FC = () => {
  const { categoryTitle } = store.getState().main.session;

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
            <Col
              className="store-first-column"
              style={{ backgroundColor: "transparent" }}
            />

            <Col>
              <NavbarStore orderBy={orderBy} filter={filter} />
            </Col>
          </Row>

          <Row>
            <Col
              className="store-first-column"
              style={{ backgroundColor: "blue" }}
            >
              Aqui van los filtros
            </Col>

            <Col style={{ backgroundColor: "red" }}>Aqui van los productos</Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
