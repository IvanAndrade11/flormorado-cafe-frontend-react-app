import "./OrderConfirmation.scss";

import React from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IOrderConfirmation } from "@/types/orders";
import { formatPrice, icons, URLS } from "@/utils/constants";

// Espacio que no parte línea: un precio no debe quedar con el "$" en un renglón
// y el número en el siguiente, cosa que pasa en celular.
const cop = (value: number) => `$ ${formatPrice(value)}`;

export const OrderConfirmation: React.FC<{
  confirmation: IOrderConfirmation;
}> = ({ confirmation }) => {
  const navigate = useNavigate();
  const {
    orderId,
    email,
    paymentMethod,
    breKey,
    items,
    subtotal,
    shipping,
    total,
    delivery,
  } = confirmation;

  return (
    <section
      className="fmc-order-confirmation"
      aria-labelledby="fmc-order-confirmation-title"
    >
      <header className="fmc-order-confirmation__header">
        <Image src={icons.Success} width={56} height={56} alt="" />
        <p className="fmc-order-confirmation__eyebrow">Pedido recibido</p>
        <h1 id="fmc-order-confirmation-title">¡Gracias por tu compra!</h1>
        <p className="fmc-order-confirmation__number">
          Tu número de pedido es <strong>{orderId}</strong>
        </p>
        <p className="fmc-order-confirmation__email">
          Te enviamos la confirmación a <strong>{email}</strong>. Si no la ves
          en unos minutos, revisa la carpeta de spam.
        </p>
      </header>

      <div className="fmc-order-confirmation__next">
        <h2>Qué sigue</h2>
        {paymentMethod === "cash_on_delivery" ? (
          <p>
            Pagas al recibir tu pedido. Ten listos <strong>{cop(total)}</strong>{" "}
            en efectivo cuando llegue el domiciliario.
          </p>
        ) : (
          <p>
            Registramos tu llave BRE-B <strong>{breKey}</strong>. Te
            contactaremos para completar el pago, y empezamos a preparar tu
            pedido en cuanto lo confirmemos.
          </p>
        )}
      </div>

      <div className="fmc-order-confirmation__details">
        <div className="fmc-order-confirmation__block">
          <h2>Lo que pediste</h2>
          <ul className="fmc-order-confirmation__items">
            {items.map((item) => (
              <li key={item.key}>
                <span>
                  {item.name}
                  <small>
                    Molienda: {item.grinding} · {item.quantity}{" "}
                    {item.quantity === 1 ? "unidad" : "unidades"}
                  </small>
                </span>
                <span className="fmc-order-confirmation__amount">
                  {cop(item.lineTotal)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="fmc-order-confirmation__totals">
            <div>
              <dt>Subtotal</dt>
              <dd>{cop(subtotal)}</dd>
            </div>
            <div>
              <dt>Envío</dt>
              <dd>{shipping === 0 ? "¡Gratis!" : cop(shipping)}</dd>
            </div>
            <div className="fmc-order-confirmation__total">
              <dt>Total</dt>
              <dd>{cop(total)}</dd>
            </div>
          </dl>
        </div>

        <div className="fmc-order-confirmation__block">
          <h2>Dónde lo entregamos</h2>
          <address>
            {delivery.address}
            <br />
            {delivery.neighborhood}, {delivery.city}
            {delivery.additionalInfo && (
              <>
                <br />
                <span className="text-muted">{delivery.additionalInfo}</span>
              </>
            )}
          </address>
        </div>
      </div>

      <div className="fmc-order-confirmation__actions">
        <Button className="fmc-button" onClick={() => navigate(URLS.store)}>
          Seguir comprando
        </Button>
      </div>
    </section>
  );
};
