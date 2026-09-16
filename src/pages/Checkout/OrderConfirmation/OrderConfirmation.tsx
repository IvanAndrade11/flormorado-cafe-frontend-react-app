import "./OrderConfirmation.scss";

import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IBreBInstructions, IOrderConfirmation } from "@/types/orders";
import { formatPrice, icons, images, URLS } from "@/utils/constants";

// Espacio que no parte línea: un precio no debe quedar con el "$" en un renglón
// y el número en el siguiente, cosa que pasa en celular.
const cop = (value: number) => `$ ${formatPrice(value)}`;

type CopyState = "idle" | "copied" | "failed";

const BreBPayment: React.FC<{
  instructions: IBreBInstructions;
  orderId: string;
  total: number;
}> = ({ instructions, orderId, total }) => {
  const [copy, setCopy] = useState<CopyState>("idle");

  useEffect(() => {
    if (copy === "idle") return;
    const timer = setTimeout(() => setCopy("idle"), 2500);
    return () => clearTimeout(timer);
  }, [copy]);

  const copyKey = async () => {
    try {
      await navigator.clipboard.writeText(instructions.key);
      setCopy("copied");
    } catch {
      setCopy("failed");
    }
  };

  return (
    <div className="fmc-breb">
      <div className="fmc-breb__main">
        <p className="fmc-breb__amount">
          Transfiere <strong>{cop(total)}</strong> por BRE-B
        </p>

        {/* En celular copiar la llave es lo único útil: nadie puede escanear
            un QR con el mismo teléfono en el que lo está viendo. */}
        <div className="fmc-breb__key">
          <span className="fmc-breb__key-label">Llave</span>
          <code>{instructions.key}</code>
          <Button
            size="sm"
            className="fmc-button fmc-breb__copy"
            onClick={() => void copyKey()}
          >
            {copy === "copied" ? "¡Copiada!" : "Copiar llave"}
          </Button>
        </div>
        <p className="fmc-breb__feedback" role="status" aria-live="polite">
          {copy === "failed" &&
            "No pudimos copiarla. Selecciónala y cópiala manualmente."}
        </p>

        <ol className="fmc-breb__steps">
          <li>
            Antes de confirmar, tu banco te mostrará el nombre del receptor.
            Verifica que corresponda a <strong>{instructions.holder}</strong>.
          </li>
          <li>
            En el mensaje de la transferencia escribe tu número de pedido,{" "}
            <strong className="fmc-breb__order">{orderId}</strong>.
          </li>
        </ol>
        <p className="fmc-breb__after">
          Empezamos a preparar tu pedido en cuanto confirmemos el pago.
        </p>
      </div>

      <figure className="fmc-breb__qr">
        <Image
          src={images.BreBQr}
          alt="Código QR de la llave BRE-B de Flormorado Café"
        />
        <figcaption>Escanéalo con la app de tu banco</figcaption>
      </figure>
    </div>
  );
};

export const OrderConfirmation: React.FC<{
  confirmation: IOrderConfirmation;
}> = ({ confirmation }) => {
  const navigate = useNavigate();
  const {
    orderId,
    email,
    paymentMethod,
    breKey,
    breB,
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
        ) : breB ? (
          <BreBPayment instructions={breB} orderId={orderId} total={total} />
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
