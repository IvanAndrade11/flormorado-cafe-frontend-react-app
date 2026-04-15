import "./BottomButtons.scss";

import { Button } from "react-bootstrap";
import { URLS } from "@/utils/constants";
import { setShowCart } from "@/utils/constants/redux/sets";
import { NavigateFunction } from "react-router-dom";

export const BottomButtons = ({ navigate }: { navigate: NavigateFunction }) => {
  return (
    <div className="fmc-store-cart-buttons mt-3 pt-4">
      <Button
        onClick={() => {
          navigate(URLS.store);
          setShowCart(false);
        }}
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
  );
};
