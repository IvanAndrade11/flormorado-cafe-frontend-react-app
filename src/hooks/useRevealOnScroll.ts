import { useEffect, useState } from "react";

// Basta con que asome un poco para empezar: esperar más hace que la sección
// aparezca cuando el lector ya está mirándola.
const THRESHOLD = 0.08;
// Deja que entre de verdad en pantalla antes de disparar, en vez de hacerlo
// justo en el filo de abajo.
const ROOT_MARGIN = "0px 0px -10% 0px";

/**
 * Revela un elemento la primera vez que entra en pantalla.
 *
 * Mismo patrón que `useFooterOnScreen`, con una diferencia: aquí el estado
 * inicial es "revelado" cuando no hay `IntersectionObserver` —jsdom,
 * navegadores viejos—, para que el contenido nunca se quede invisible
 * esperando un observador que no va a llegar. Es también lo que hace que las
 * pruebas encuentren el texto sin tener que simular nada.
 *
 * Deja de observar al revelar —el efecto se limpia solo al cambiar `revealed`—
 * así que al volver a subir la sección no se re-anima, que cansa enseguida.
 *
 * El `ref` es una función y no un `useRef` a propósito. Las secciones de la
 * portada no existen hasta que llega su contenido de ConfigCat —antes devuelven
 * `null`—, y con un `useRef` el efecto se ejecutaba una sola vez, cuando
 * todavía no había nodo: no llegaba a observar nada y la sección se quedaba
 * invisible para siempre, con su contenido ya en el DOM. Guardando el nodo en
 * estado, el efecto se vuelve a ejecutar en cuanto aparece.
 */
export const useRevealOnScroll = <T extends HTMLElement>() => {
  const [element, setElement] = useState<T | null>(null);
  const [revealed, setRevealed] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    if (!element || revealed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // Un elemento sin área cuenta como visible por completo para
        // `IntersectionObserver`, así que sin esto las secciones de la portada
        // se revelaban todas de golpe al cargar, antes de tener contenido.
        if (entry.boundingClientRect.height === 0) return;

        setRevealed(true);
      },
      { threshold: THRESHOLD, rootMargin: ROOT_MARGIN },
    );

    observer.observe(element);

    // El contenido de la portada llega de ConfigCat después del primer
    // pintado. Cuando la sección pasa de no tener alto a tenerlo, la
    // intersección cambia pero no cruza ningún umbral —estaba al 100% por ser
    // de área cero y pasa a un 12%—, así que el observador no vuelve a avisar
    // y la sección se quedaba invisible con sus tarjetas ya dentro. Volver a
    // observarla obliga a una notificación nueva con el tamaño real.
    const sizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            observer.unobserve(element);
            observer.observe(element);
          });
    sizeObserver?.observe(element);

    return () => {
      observer.disconnect();
      sizeObserver?.disconnect();
    };
  }, [element, revealed]);

  // La clase va aparte del `ref` para poder sumarla a las que ya tenga el
  // elemento, que casi siempre tiene las suyas.
  return {
    ref: setElement,
    revealClassName: `fm-reveal${revealed ? " fm-reveal--in" : ""}`,
  };
};
