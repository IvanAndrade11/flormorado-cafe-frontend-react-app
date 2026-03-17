import React from "react";
import { Card, Col, ListGroup, Button } from "react-bootstrap";

import { ICoffeeProduct } from "@/types/configCat";

export const StoreCard: React.FC<ICoffeeProduct> = ({
  id,
  name,
  imageUrl,
  stock,
  grinding,
  roastOptions,
  variety,
  price,
}) => {
  return (
    <Col key={id}>
      <Card className="store-card">
        <div className="store-card-image-container">
          <Card.Img
            variant="top"
            src={imageUrl}
            className="store-card-image"
            width={425}
            alt={name}
            loading="lazy"
          />
        </div>
        <Card.Body className="store-card-body">
          <Card.Title className="store-card-body-title">{name}</Card.Title>
          {!stock && (
            <Card.Subtitle className="mb-2 text-muted">
              <strong>AGOTADO</strong>
            </Card.Subtitle>
          )}
        </Card.Body>
        <ListGroup className="list-group-flush store-card-list-group">
          <ListGroup.Item className="store-card-list-group-item">
            <strong>Molienda:</strong> {grinding}
          </ListGroup.Item>
          <ListGroup.Item className="store-card-list-group-item">
            <strong>Tostión:</strong> {roastOptions}
          </ListGroup.Item>
          <ListGroup.Item className="store-card-list-group-item">
            <strong>Variedad:</strong> {variety}
          </ListGroup.Item>
        </ListGroup>
        <Card.Body className="store-card-body-button">
          <Card.Text className="store-card-body-title">$ {price}</Card.Text>
          <Button
            // onClick={() => navigate(`/producto/${item.id}`)}
            onClick={() => alert("¡Próximamente podrás comprar este producto!")}
            variant="secondary"
            className="fmc-button"
            style={{ minWidth: "100%" }}
            disabled={!stock}
          >
            {stock ? "Ver producto" : "AGOTADO"}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};
