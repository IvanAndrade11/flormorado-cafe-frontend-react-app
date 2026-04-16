import "./CartFloatButton.scss";

import { Badge } from "react-bootstrap";
import { icons } from "@/utils/constants";
import { setShowCart } from "@/utils/constants/redux/sets";

export const CartFloatButton = ({ totalItems }: { totalItems: number }) => {
  return (
    <a
      onClick={() => {
        setShowCart(true);
      }}
    >
      <Badge
        className="shopping-cart-button shopping-cart shopping-cart-badge"
        pill
        bg="light"
        text="dark"
      >
        {totalItems}
      </Badge>
      <img
        src={icons.CoffeeBag}
        className={`shopping-cart-button shopping-cart`}
        alt="Carrito de compras Flormorado Café"
      />
    </a>
  );
};
