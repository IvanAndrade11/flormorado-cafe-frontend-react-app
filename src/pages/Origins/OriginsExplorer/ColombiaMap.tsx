import React from "react";

import { IOrigin } from "@/types/components";

import {
  COLOMBIA_PATH,
  DEPARTMENT_PATHS,
  MAP_VIEWBOX,
  ORIGIN_MARKERS,
} from "./colombia";

// A la izquierda del país hay océano y la etiqueta cabe; Boyacá queda tan al
// oriente que sacarla por ahí la dejaría fuera del lienzo.
const LABEL_SIDE: Record<string, "left" | "right"> = {
  boyaca: "right",
  caldas: "left",
  tolima: "left",
};

const LABEL_FONT = 4;
const LABEL_HEIGHT = LABEL_FONT * 1.7;
const LABEL_GAP = 3.2;

interface ColombiaMapProps {
  origins: IOrigin[];
  selectedId: string;
  onSelect: (id: string) => void;
}

// Decorativo: el teclado y los lectores de pantalla pasan por los botones.
export const ColombiaMap: React.FC<ColombiaMapProps> = ({
  origins,
  selectedId,
  onSelect,
}) => (
  <svg
    className="fmc-origins-map"
    viewBox={MAP_VIEWBOX}
    role="presentation"
    focusable="false"
  >
    <path className="fmc-origins-map__country" d={COLOMBIA_PATH} />

    {origins.map((origin) => {
      const marker = ORIGIN_MARKERS[origin.id];
      const toRight = LABEL_SIDE[origin.id] === "right";
      const width = origin.department.length * LABEL_FONT * 0.45 + LABEL_FONT;
      const x = toRight ? marker.x + LABEL_GAP : marker.x - LABEL_GAP - width;

      return (
        <g
          key={origin.id}
          className={`fmc-origins-map__origin${
            origin.id === selectedId ? " is-selected" : ""
          }`}
          onClick={() => onSelect(origin.id)}
        >
          <path
            className="fmc-origins-map__department"
            d={DEPARTMENT_PATHS[origin.id]}
          />

          <circle
            className="fmc-origins-map__halo"
            cx={marker.x}
            cy={marker.y}
            r={3}
          />
          <circle
            className="fmc-origins-map__marker"
            cx={marker.x}
            cy={marker.y}
            r={1.4}
          />

          <rect
            className="fmc-origins-map__pill"
            x={x}
            y={marker.y - LABEL_HEIGHT / 2}
            width={width}
            height={LABEL_HEIGHT}
            rx={LABEL_HEIGHT / 2}
          />
          <text
            className="fmc-origins-map__label"
            x={x + width / 2}
            y={marker.y}
            fontSize={LABEL_FONT}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {origin.department}
          </text>
        </g>
      );
    })}
  </svg>
);
