import "./ProductConfigurator.scss";

import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { QuantitySelector } from "../QuantitySelector/QuantitySelector";
import { GRINDING_OPTIONS } from "@/utils/constants";
import { setCart, setShowCart } from "@/utils/constants/redux/sets";
import { ICoffeeProduct } from "@/types/configCat";
import store from "@/app/providers/redux/store";

export const ProductConfigurator = ({
  product,
}: {
  product: ICoffeeProduct;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [grinding, setGrinding] = useState(product.grinding);
  const [productCount, setProductCount] = useState(0);

  const { cart } = store.getState().main.session;

  const handleAddToCart = () => {
    const item = { ...product, id: `${productCount + 1}`, quantity, grinding };
    const newCart = [...cart, item];
    setCart(newCart);
    setShowCart(true);
    setProductCount((prev) => prev + 1);
  };

  useEffect(() => {
    console.log("Nuevo Carrito", cart);
  }, [cart]);

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
              {GRINDING_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.value}
                </option>
              ))}
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
