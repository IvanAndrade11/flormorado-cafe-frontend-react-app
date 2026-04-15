import "./ProductConfigurator.scss";

import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { QuantitySelector } from "../QuantitySelector/QuantitySelector";
import { GRINDING_OPTIONS } from "@/utils/constants";
import {
  setCart,
  setShowCart,
  setShowToast,
  setToastMessage,
} from "@/utils/constants/redux/sets";
import { ICoffeeProduct } from "@/types/configCat";
import store from "@/app/providers/redux/store";

export const ProductConfigurator = ({
  product,
}: {
  product: ICoffeeProduct;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [grinding, setGrinding] = useState(GRINDING_OPTIONS[0].id);

  const { cart } = store.getState().main.session;

  const handleAddToCart = () => {
    const cartItemId = `${product.id}-${grinding}`;
    const existingItemIndex = cart.findIndex(
      (item: ICoffeeProduct) => item.id === cartItemId,
    );

    let newCart = [...cart];

    if (existingItemIndex >= 0) {
      newCart[existingItemIndex] = {
        ...newCart[existingItemIndex],
        quantity: (newCart[existingItemIndex].quantity || 1) + quantity,
      };
    } else {
      const item = { ...product, id: cartItemId, quantity, grinding };
      newCart.push(item);
    }

    setCart(newCart);
    setShowCart(true);
    setShowToast(true);
    setToastMessage("Producto agregado al carrito");
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
