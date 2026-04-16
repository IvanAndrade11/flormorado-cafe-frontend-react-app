import { useMemo } from "react";
import "./ShoppingCart.scss";

import { Offcanvas, Image } from "react-bootstrap";
import { formatPrice, icons, URLS } from "@/utils/constants";
import { setShowCart } from "@/utils/constants/redux/sets";
import { ICoffeeProduct } from "@/types/configCat";
import { useNavigate, useLocation } from "react-router-dom";
import { CartFloatButton } from "./CartFloatButton/CartFloatButton";
import { ProductListGroup } from "./ProductListGroup/ProductListGroup";
import { WithoutProductsMsj } from "./WithoutProductsMsj/WithoutProductsMsj";

import store from "@/app/providers/redux/store";
import { BottomButtons } from "./BottomButtons/BottomButtons";
import { TotalView } from "./TotalView/TotalView";

export const ShoppingCart = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { cart, showCart } = store.getState().main.session;

  const totalItems = cart.reduce(
    (acc: number, item: ICoffeeProduct) => acc + (item.quantity || 1),
    0,
  );

  return (
    <>
      {(pathname.includes(URLS.store) ||
        (!pathname.includes(URLS.checkout) && totalItems > 0)) && (
        <CartFloatButton totalItems={totalItems} />
      )}
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
              {totalItems} producto{totalItems !== 1 ? "s" : ""}
            </h1>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {totalItems > 0 ? (
            <ProductListGroup cart={cart} />
          ) : (
            <WithoutProductsMsj navigate={navigate} />
          )}
        </Offcanvas.Body>
        {totalItems > 0 && (
          <>
            <TotalView cart={cart} showSub={false} />
            <BottomButtons navigate={navigate} />
          </>
        )}
      </Offcanvas>
    </>
  );
};
