import "./Isotype.scss";

import React from "react";

/**
 * El símbolo de la marca —el grano dentro del círculo, con las hojas— pintado
 * del color del contexto.
 *
 * No es un `<img>`: el PNG trae el grano en morado y las hojas en verde, así
 * que sobre un fondo morado se perdería. Se usa como máscara, que toma solo la
 * silueta; el archivo tiene el fondo y las líneas interiores en transparente,
 * así que esos huecos se conservan y dejan ver el fondo.
 *
 * Decorativo: donde aparece, el nombre de la marca ya está escrito al lado.
 */
export const Isotype: React.FC<{ className?: string }> = ({ className }) => (
  <span
    className={`fmc-isotype${className ? ` ${className}` : ""}`}
    aria-hidden="true"
  />
);
