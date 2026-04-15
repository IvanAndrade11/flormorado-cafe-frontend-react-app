import "./WithoutProductsMsj.scss";

import { Button } from "react-bootstrap";
import { icons } from "@/utils/constants";
import { setShowCart } from "@/utils/constants/redux/sets";
import { NavigateFunction } from "react-router-dom";
import { URLS } from "@/utils/constants";

export const WithoutProductsMsj = ({
  navigate,
}: {
  navigate: NavigateFunction;
}) => {
  return (
    <div className="mt-3 pt-4 text-center">
      <h1 className="fmc-offcanvas-title">¡Oh no!</h1>
      <h1 className="fmc-offcanvas-title">Carrito sin productos</h1>
      <Button
        onClick={() => {
          navigate(URLS.store);
          setShowCart(false);
        }}
        className="fmc-button mt-3 mx-3"
      >
        <>
          Ir a la tienda
          <span>
            <img
              src={icons.Basket2}
              alt="Tienda - Flormorado Café"
              width="20"
              className="d-inline-block align-top ms-1"
            />
          </span>
        </>
      </Button>
    </div>
  );
};
