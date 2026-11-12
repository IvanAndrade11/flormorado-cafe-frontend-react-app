import "./CartFloatButton.scss";

import { useEffect, useRef, useState } from "react";
import { Badge } from "react-bootstrap";
import { icons } from "@/utils/constants";
import { setShowCart } from "@/utils/constants/redux/sets";
import { useFooterOnScreen } from "@/hooks/useFooterOnScreen";

/** Dos latidos de 0.45s. Debe coincidir con la animación de la hoja de estilos. */
const PULSE_MS = 900;

export const CartFloatButton = ({ totalItems }: { totalItems: number }) => {
  const footerOnScreen = useFooterOnScreen();
  const [pulsing, setPulsing] = useState(false);
  const lastCount = useRef<number | null>(null);

  // El botón es pequeño y vive en una esquina, así que un producto agregado
  // puede pasar desapercibido. Late cuando el contador cambia —y al entrar con
  // un carrito de una visita anterior— y se queda quieto el resto del tiempo.
  useEffect(() => {
    if (lastCount.current === totalItems) return;
    lastCount.current = totalItems;
    if (totalItems === 0) return;

    // Diferido a un microtask por `react-hooks/set-state-in-effect`, igual que
    // en el panel: fijar estado tiene que ocurrir en un callback.
    void Promise.resolve().then(() => setPulsing(true));
    const timer = setTimeout(() => setPulsing(false), PULSE_MS);

    return () => clearTimeout(timer);
  }, [totalItems]);

  return (
    // `button` y no `a`: sin `href` un enlace no recibe foco ni responde al
    // teclado, así que el carrito solo se podía abrir con el ratón.
    <button
      type="button"
      className={`fmc-cart-fab${pulsing ? " fmc-cart-fab--pulse" : ""}${
        footerOnScreen ? " fmc-fab-hidden" : ""
      }`}
      onClick={() => setShowCart(true)}
      aria-label={`Abrir el carrito (${totalItems} ${
        totalItems === 1 ? "producto" : "productos"
      })`}
    >
      <img src={icons.CoffeeBag} alt="" />
      <Badge className="fmc-cart-fab__badge" pill bg="light" text="dark">
        {totalItems}
      </Badge>
    </button>
  );
};
