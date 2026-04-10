import { Badge } from "react-bootstrap";
import "./ShoppingCart.scss";

import { icons } from "@/utils/constants";

export const ShoppingCart = () => {
  return (
    <a onClick={() => alert("Proximamente: Carrito de compras")}>
      <Badge
        className="shopping-cart-button shopping-cart shopping-cart-badge"
        pill
        bg="light"
        text="dark"
      >
        1
      </Badge>
      <img
        src={icons.CoffeeBag}
        className={`shopping-cart-button shopping-cart`}
        alt="Carrito de compras Flormorado Café"
      />
    </a>
  );
};
