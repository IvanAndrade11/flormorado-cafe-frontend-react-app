import { setShowToast, setToastMessage } from "@/utils/constants/redux/sets";
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

  const updateQuantity = (increase: boolean) => {
    let value;
    if (increase) {
      value = safeQuantity + 1;
    } else {
      value = isCart ? safeQuantity - 1 : Math.max(1, safeQuantity - 1);
    }
    setQuantity(value);
    if (isCart) {
      setShowToast(true);
      setToastMessage(
        `Producto ${increase ? "agregado al" : "eliminado del"} carrito`,
      );
    }
  };

  const content = (
    <div className={`quantity-wrapper ${isCart ? "is-cart" : ""}`}>
      <Button className="qty-btn" onClick={() => updateQuantity(false)}>
        −
      </Button>

      <span className="qty-value">{safeQuantity}</span>

      <Button className="qty-btn" onClick={() => updateQuantity(true)}>
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
