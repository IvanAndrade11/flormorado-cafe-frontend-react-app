import "./Categories.scss";

import React from "react";
import { useNavigate } from "react-router-dom";

import { images, URLS } from "@/utils/constants";
import { Title } from "@/components/ui";

import { Row, Col, Card } from "react-bootstrap";

export const Categories: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container mt-5">
        <Title title="CATEGORIAS" />

        <Row xs={1} md={2} lg={3} className="g-4 my-5">
          <Col>
            <Card
              onClick={() => navigate(URLS.store)}
              className="categories-card"
            >
              <Card.Img
                variant="top"
                src={images.GirlCollecting}
                className="w-50 mx-auto my-3"
              />
              <Card.Body className="text-center">
                <Card.Title>
                  <strong>CAFÉ</strong>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card
              onClick={() => navigate(URLS.store)}
              className="categories-card"
            >
              <Card.Img
                variant="top"
                src={images.GirlCollecting}
                className="w-50 mx-auto my-3"
              />
              <Card.Body className="text-center">
                <Card.Title>
                  <strong>SAGÚ</strong>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card
              onClick={() => navigate(URLS.store)}
              className="categories-card"
            >
              <Card.Img
                variant="top"
                src={images.GirlCollecting}
                className="w-50 mx-auto my-3"
              />
              <Card.Body className="text-center">
                <Card.Title>
                  <strong>OTROS PRODUCTOS</strong>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
