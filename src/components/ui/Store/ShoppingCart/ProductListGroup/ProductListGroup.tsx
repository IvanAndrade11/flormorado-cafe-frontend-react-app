import "./ProductListGroup.scss";

import { Image, ListGroup } from "react-bootstrap";
import { getProductPrice, icons } from "@/utils/constants";
import { ICoffeeProduct } from "@/types/configCat";
import { QuantitySelector } from "../../Product/QuantitySelector/QuantitySelector";
import {
  setCart,
  setShowToast,
  setToastMessage,
} from "@/utils/constants/redux/sets";

export const ProductListGroup = ({ cart }: { cart: ICoffeeProduct[] }) => {
  const deleteItem = (item: ICoffeeProduct) => {
    setCart(cart.filter((cartItem) => cartItem.id !== item.id));
    setShowToast(true);
    setToastMessage("Producto eliminado del carrito");
  };
  return (
    <ListGroup>
      {cart.map((item: ICoffeeProduct) => (
        <ListGroup.Item
          key={item.id}
          className="d-flex justify-content-between align-items-start fmc-cart-item"
        >
          <Image
            src={item.imageUrl}
            className="fmc-cart-img-product"
            alt={item.name}
          />
          <div className="ms-2 me-auto">
            <div className="fw-bold">{item.name}</div>
            Molienda: {item.grinding}
            <br />$ {item.price} Und
            <QuantitySelector
              quantity={item.quantity}
              setQuantity={(quantity) => {
                if (quantity === 0) {
                  deleteItem(item);
                  return;
                }
                const newCart = cart.map((cartItem) =>
                  cartItem.id === item.id
                    ? { ...cartItem, quantity }
                    : cartItem,
                );
                setCart(newCart);
              }}
              isCart={true}
            />
          </div>
          <div className="product-price is-product-detail">
            $ {getProductPrice(item)}
          </div>
          <button
            className="fmc-cart-delete-btn"
            onClick={() => deleteItem(item)}
            title="Eliminar producto"
          >
            <Image src={icons.DeletePurple} alt="Eliminar" />
          </button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
