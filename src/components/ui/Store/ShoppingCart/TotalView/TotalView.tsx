import "./TotalView.scss";

import { computeCartTotals, formatPrice } from "@/utils/constants";
import { ICoffeeProduct } from "@/types/configCat";
import { useMemo } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export const TotalView = ({
  cart,
  showSub,
}: {
  cart: ICoffeeProduct[];
  showSub: boolean;
}) => {
  const {
    subtotal: subTotal,
    shipping: shippingCost,
    total: finalTotal,
  } = useMemo(() => computeCartTotals(cart), [cart]);

  return (
    <div className="mt-4 pt-3 border-top px-3">
      {showSub && (
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted fw-bold">Subtotal:</span>
          <span className="fw-bold fs-5 text-dark">
            ${formatPrice(subTotal)}
          </span>
        </div>
      )}
      <div className="d-flex justify-content-between mb-2">
        <span className="text-muted" style={{ fontSize: "1.1rem" }}>
          Envío:
        </span>
        <span style={{ display: "inline-flex" }}>
          <OverlayTrigger
            overlay={
              <Tooltip
                id="shipping-tooltip"
                className="fmc-offcanvas-title fs-5 fw-bold fmc-tooltip"
              >
                Envios únicamente a Bogotá y municipios aledaños
              </Tooltip>
            }
          >
            {/* <span className="fmc-character-alert fw-bold">&#9888;</span> */}
            {shippingCost === 0 ? (
              <span className="text-success fw-bold fs-5">¡Gratis!</span>
            ) : (
              <span className="text-dark fmc-offcanvas-title fs-5">{`$ ${formatPrice(shippingCost)}`}</span>
            )}
          </OverlayTrigger>
        </span>
      </div>
      <div className="d-flex justify-content-between mt-3 mb-2">
        <span className="text-dark fw-bold fs-5">Total:</span>
        <span className="fmc-offcanvas-title" style={{ fontSize: "2rem" }}>
          $ {formatPrice(finalTotal)}
        </span>
      </div>
    </div>
  );
};
