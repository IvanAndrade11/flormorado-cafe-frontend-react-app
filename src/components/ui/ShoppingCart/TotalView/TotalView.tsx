import "./TotalView.scss";

import { formatPrice } from "@/utils/constants";
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
  const subTotal = useMemo(() => {
    return cart.reduce((acc: number, item: ICoffeeProduct) => {
      const numericPrice = Number(
        typeof item.price === "string"
          ? item.price.replace(/\./g, "")
          : item.price,
      );
      return acc + numericPrice * (item.quantity || 1);
    }, 0);
  }, [cart]);

  const shippingCost = useMemo(() => {
    if (cart.length === 0) return 0;
    return subTotal >= 150000 ? 0 : cart[0].shippingPrice || 0;
  }, [cart, subTotal]);

  const finalTotal = subTotal + shippingCost;

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
          {shippingCost === 0 ? (
            <span className="text-success fw-bold fs-5">¡Gratis!</span>
          ) : (
            <span className="text-dark fmc-offcanvas-title fs-5">{`$ ${formatPrice(shippingCost)}`}</span>
          )}
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
            <span className="fmc-character-alert fw-bold">&#9888;</span>
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
