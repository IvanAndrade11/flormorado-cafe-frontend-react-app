import "./QuantitySelector.scss";

import { Button, Form } from "react-bootstrap";

export const QuantitySelector = ({
  quantity,
  setQuantity,
  isCart = false,
}: {
  quantity: number | undefined;
  setQuantity: (quantity: number) => void;
  isCart?: boolean;
}) => {
  const safeQuantity = quantity || 1;

  const content = (
    <div className={`quantity-wrapper ${isCart ? "is-cart" : ""}`}>
      <Button
        className="qty-btn"
        onClick={() => setQuantity(Math.max(1, safeQuantity - 1))}
      >
        −
      </Button>

      <span className="qty-value">{safeQuantity}</span>

      <Button className="qty-btn" onClick={() => setQuantity(safeQuantity + 1)}>
        +
      </Button>
    </div>
  );

  if (isCart) {
    return content;
  }

  return (
    <Form.Group>
      <Form.Label>Cantidad</Form.Label>
      {content}
    </Form.Group>
  );
};
