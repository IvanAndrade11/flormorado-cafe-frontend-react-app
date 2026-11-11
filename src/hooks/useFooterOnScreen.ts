import { useEffect, useState } from "react";

/**
 * Dice si el pie de página está a la vista, para esconder los botones
 * flotantes mientras lo esté.
 *
 * Los botones flotan sobre el contenido, así que al final de la página tapaban
 * los enlaces del pie. La alternativa era reservarles una franja vacía abajo de
 * cada página —unos 140 px con los dos botones apilados—, que es espacio muerto
 * permanente para evitar un choque que solo ocurre al final. Esconderlos cuando
 * el pie entra en pantalla resuelve lo mismo sin regalar ese espacio.
 *
 * Si el navegador no tiene `IntersectionObserver` (o no hay pie, como en las
 * pruebas) devuelve `false` y los botones se quedan visibles: el pie conserva
 * un margen inferior suficiente para que, en ese caso, no tapen nada.
 */
export const useFooterOnScreen = (): boolean => {
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) =>
      setOnScreen(entry.isIntersecting),
    );
    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return onScreen;
};
