import { useEffect, useState } from "react";

/**
 * Responde a una media query desde JavaScript, para lo que el CSS no puede
 * decidir solo: si un video arranca, o si se pinta el menú de escritorio.
 *
 * El valor inicial se calcula al montar y después solo cambia desde el evento
 * `change`. Volver a leerlo dentro del efecto sería escribir estado de forma
 * síncrona en el cuerpo del efecto, que es justo lo que prohíbe la regla
 * `set-state-in-effect`; como la consulta no cambia en vida del componente, no
 * hace falta.
 *
 * Sin `matchMedia` (jsdom) devuelve `false`, así que quien lo use tiene que
 * tratar ese caso como el comportamiento normal, no como la excepción.
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia(query).matches,
  );

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;

    const list = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);

  return matches;
};
