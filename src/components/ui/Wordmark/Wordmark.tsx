import "./Wordmark.scss";

import React from "react";

/**
 * El logotipo de la marca escrito, no como imagen: dos líneas, "FLORMORADO" en
 * Economica y "CAFÉ" debajo en la tipografía de cuerpo. En texto hereda el
 * color de donde esté, que es lo que permite usarlo igual sobre beige y sobre
 * morado sin tener un PNG por fondo.
 *
 * El tamaño sale del `font-size` del contexto: las dos líneas se miden en `em`.
 */
export const Wordmark: React.FC<{ className?: string }> = ({ className }) => (
  <span className={`fmc-wordmark${className ? ` ${className}` : ""}`}>
    <span className="fmc-wordmark__name">FLORMORADO</span>
    <span className="fmc-wordmark__kind">CAFÉ</span>
  </span>
);
