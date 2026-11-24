import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// La página destino se carga con React.lazy, así que al llegar desde otra ruta
// su sección todavía no está en el DOM: hay que esperarla.
const ANCHOR_RETRY_MS = 50;
const ANCHOR_TIMEOUT_MS = 3000;

export const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const id = hash.slice(1);
    const deadline = Date.now() + ANCHOR_TIMEOUT_MS;
    let timer: number | undefined;

    const scrollToAnchor = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      // Un ancla que no existe deja de buscarse y la página se queda donde está.
      if (Date.now() < deadline) {
        timer = window.setTimeout(scrollToAnchor, ANCHOR_RETRY_MS);
      }
    };

    scrollToAnchor();

    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};
