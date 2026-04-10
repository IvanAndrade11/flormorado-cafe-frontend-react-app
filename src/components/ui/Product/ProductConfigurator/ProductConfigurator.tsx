// ProductConfigurator.jsx
import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { QuantitySelector } from "../QuantitySelector/QuantitySelector";
import "./ProductConfigurator.scss";

export const ProductConfigurator = ({ product }: { product: any }) => {
  const [quantity, setQuantity] = useState(1);
  const [grinding, setGrinding] = useState(product.grinding);

  const handleAddToCart = () => {
    const item = {
      id: product.id,
      quantity,
      grinding,
      price: product.price,
    };

    console.log("Agregar al carrito:", item);
  };

  return (
    <Form className="mt-4 configurator-controls">
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Molienda</Form.Label>
            <Form.Select
              value={grinding}
              onChange={(e) => setGrinding(e.target.value)}
            >
              <option>Fina</option>
              <option>Media</option>
              <option>Gruesa</option>
              <option>En grano</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        </Col>
      </Row>

      <div className="add-to-cart-wrapper">
        <Button
          className="add-to-cart-btn"
          disabled={!product.stock}
          onClick={handleAddToCart}
        >
          {product.stock ? "Añadir al Carrito" : "Producto agotado"}
        </Button>
      </div>
    </Form>
  );
};
