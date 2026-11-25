import { useEffect, useState } from "react";

// Por debajo de esto el movimiento es ruido del trackpad, no intención: sin
// umbral la barra parpadea al apoyar los dedos.
const THRESHOLD = 6;
// Mientras la cabecera sigue a la vista no hay nada que esconder.
const REST_ZONE = 120;
// Lo justo para distinguir "arriba del todo" de "ya se movió".
const SCROLLED_FROM = 8;

export interface IScrollState {
  // La cabecera se aparta al bajar y vuelve al subir, sin esperar al tope.
  hidden: boolean;
  // Deja de estar arriba del todo: lo usa quien tenga que volverse sólido.
  scrolled: boolean;
}

/**
 * Sigue el scroll de la página para que la cabecera se aparte al bajar y
 * reaparezca al subir.
 *
 * El trabajo va dentro de un `requestAnimationFrame` con un solo cuadro en
 * vuelo, así que por rápido que lleguen los eventos se mide una vez por cuadro.
 * El estado se escribe desde el callback del scroll y nunca en el cuerpo del
 * efecto, que es lo que prohíbe `react-hooks/set-state-in-effect`.
 *
 * No hace falta reaccionar al cambio de ruta: `ScrollToTop` sube la página en
 * cada navegación y ese movimiento hacia arriba ya muestra la barra.
 */
export const useHideOnScroll = (resetKey?: string): IScrollState => {
  const [state, setState] = useState<IScrollState>({
    hidden: false,
    scrolled: false,
  });

  // Al cambiar de pantalla la barra tiene que estar. Va durante el render y no
  // en un efecto —es el patrón de React para ajustar estado cuando cambia una
  // entrada— porque escribir estado en el cuerpo de un efecto es justo lo que
  // prohíbe `react-hooks/set-state-in-effect`.
  const [lastKey, setLastKey] = useState(resetKey);
  if (lastKey !== resetKey) {
    setLastKey(resetKey);
    // También `scrolled`: toda navegación empieza arriba, y si se quedaba en
    // `true` la barra llegaba al inicio en beige sólido, tapando la portada en
    // vez de dejarla ver.
    if (state.hidden || state.scrolled) {
      setState({ hidden: false, scrolled: false });
    }
  }

  useEffect(() => {
    let previous = window.scrollY;
    let frame = 0;

    const measure = () => {
      frame = 0;

      const current = window.scrollY;
      const atBottom =
        current + window.innerHeight >=
        document.documentElement.scrollHeight - 2;

      // El rebote elástico de iOS da lecturas negativas al principio del
      // documento y ascendentes al final: las dos parecen "subiendo" sin serlo.
      if (current < 0 || atBottom) {
        previous = current;
        return;
      }

      const delta = current - previous;
      const scrolled = current > SCROLLED_FROM;
      const moved = Math.abs(delta) >= THRESHOLD;

      if (moved) previous = current;

      setState((prev) => {
        const next: IScrollState = {
          // Dentro de la zona de reposo se ve siempre, haya llegado o no un
          // evento de movimiento: si no, al llegar a una pantalla corta la
          // barra se quedaba escondida sin nada que la devolviera.
          hidden: !scrolled
            ? false
            : moved
              ? delta > 0 && current > REST_ZONE
              : prev.hidden,
          scrolled,
        };
        return prev.hidden === next.hidden && prev.scrolled === next.scrolled
          ? prev
          : next;
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return state;
};
