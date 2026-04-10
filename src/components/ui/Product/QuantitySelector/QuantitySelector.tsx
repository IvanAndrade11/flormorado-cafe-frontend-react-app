// QuantitySelector.jsx
import { Button, Form } from "react-bootstrap";
import "./QuantitySelector.scss";

export const QuantitySelector = ({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (quantity: number) => void;
}) => {
  return (
    <Form.Group>
      <Form.Label>Cantidad</Form.Label>

      <div className="quantity-wrapper">
        <Button
          className="qty-btn"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          −
        </Button>

        <span className="qty-value">{quantity}</span>

        <Button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>
          +
        </Button>
      </div>
    </Form.Group>
  );
};
