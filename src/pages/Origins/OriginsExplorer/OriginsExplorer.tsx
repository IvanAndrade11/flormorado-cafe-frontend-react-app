import "./OriginsExplorer.scss";

import React, { useState } from "react";

import { ORIGINS, ORIGINS_EXPLORER_INTRO } from "@/utils/constants";

import { ColombiaMap } from "./ColombiaMap";
import { OriginDetail, OriginFacts } from "./OriginDetail";

export const OriginsExplorer: React.FC = () => {
  const [selectedId, setSelectedId] = useState(ORIGINS[0].id);
  const selected = ORIGINS.find(({ id }) => id === selectedId) ?? ORIGINS[0];

  return (
    // La frase de entrada encabeza las dos columnas. Es `grid` y no `Row`/`Col`
    // porque el orden tiene que cambiar con el tamaño: en escritorio el mapa y
    // los datos curiosos van a la izquierda y los botones con la ficha a la
    // derecha, y en el celular todo se apila en el orden en que se lee.
    <section id="nuestros-origenes" className="fmc-origins">
      <p className="fmc-origins__intro">{ORIGINS_EXPLORER_INTRO}</p>

      {/* Remontar la rejilla reinicia la entrada al cambiar de origen, y la
          región viva anuncia el cambio: al pulsar un botón no hay navegación,
          así que sin ella nada avisaría de que el contenido es otro. */}
      <div key={selected.id} className="fmc-origins__layout" aria-live="polite">
        <div className="fmc-origins__map">
          <ColombiaMap
            origins={ORIGINS}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>

        <div className="fmc-origins__picker">
          {ORIGINS.map((origin) => (
            <button
              key={origin.id}
              type="button"
              className="fmc-origins__tab"
              aria-pressed={origin.id === selectedId}
              onClick={() => setSelectedId(origin.id)}
            >
              <span className="fmc-origins__tab-department">
                {origin.department}
              </span>
              <span className="fmc-origins__tab-town">{origin.town}</span>
            </button>
          ))}
        </div>

        <OriginDetail origin={selected} />

        <OriginFacts origin={selected} />
      </div>
    </section>
  );
};
