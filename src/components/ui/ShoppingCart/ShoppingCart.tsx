import { Badge, Offcanvas, Image, ListGroup, Button } from "react-bootstrap";
import "./ShoppingCart.scss";

import { getProductPrice, icons } from "@/utils/constants";
import { setShowCart, setCart } from "@/utils/constants/redux/sets";
import store from "@/app/providers/redux/store";
import { ICoffeeProduct } from "@/types/configCat";
import { QuantitySelector } from "../Product/QuantitySelector/QuantitySelector";

export const ShoppingCart = () => {
  const { cart, showCart } = store.getState().main.session;

  return (
    <>
      <a onClick={() => setShowCart(true)}>
        <Badge
          className="shopping-cart-button shopping-cart shopping-cart-badge"
          pill
          bg="light"
          text="dark"
        >
          {cart.length}
        </Badge>
        <img
          src={icons.CoffeeBag}
          className={`shopping-cart-button shopping-cart`}
          alt="Carrito de compras Flormorado Café"
        />
      </a>

      <Offcanvas
        show={showCart}
        onHide={() => setShowCart(false)}
        style={{ zIndex: "10003" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h1 className="fmc-offcanvas-title">
              <Image
                src={icons.CoffeeBag}
                className="fmc-cart-icon me-3"
                alt="Carrito de compras Flormorado Café"
              />
              {cart.length} producto{cart.length !== 1 ? "s" : ""}
            </h1>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
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
                    setQuantity={(newQty) => {
                      const newCart = cart.map((cartItem) =>
                        cartItem.id === item.id
                          ? { ...cartItem, quantity: newQty }
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
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Offcanvas.Body>
        <div className="fmc-store-cart-buttons mt-3 pt-4">
          <Button
            onClick={() => setShowCart(false)}
            variant="secondary"
            className="mb-3 mx-3"
          >
            Seguir comprando
          </Button>
          <Button
            onClick={() =>
              alert("Próximamente podrás finalizar la compra de tus productos!")
            }
            className="fmc-button mb-3 mx-3"
          >
            Finalizar compra
          </Button>
        </div>
      </Offcanvas>
    </>
  );
};
