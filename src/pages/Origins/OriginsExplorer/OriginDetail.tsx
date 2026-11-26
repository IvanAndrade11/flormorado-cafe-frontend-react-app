import React from "react";

import { IOrigin } from "@/types/components";
import { icons } from "@/utils/constants";

/**
 * Los datos curiosos van aparte del resto de la ficha porque se pintan en otra
 * columna, debajo del mapa: son el bloque que mejor acompaña a la silueta del
 * departamento, y sacarlos de la columna de lectura la deja a la altura del
 * mapa sin obligar a bajar tanto.
 */
export const OriginFacts: React.FC<{ origin: IOrigin }> = ({ origin }) => (
  <div className="fmc-origins-facts">
    <h4 className="fmc-origins-detail__subtitle">Datos curiosos</h4>
    <ul className="fmc-story-list">
      {origin.facts.map((fact) => (
        <li key={fact.id}>
          <img
            src={icons.GrainCoffee}
            alt=""
            width={17}
            height={17}
            className="fmc-story-bean"
          />
          <span>
            <strong>{fact.title}:</strong> {fact.description}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export const OriginDetail: React.FC<{ origin: IOrigin }> = ({ origin }) => (
  <article className="fmc-origins-detail">
    <p className="fmc-origins-detail__nickname">{origin.nickname}</p>

    <h3 className="fmc-origins-detail__title">
      {origin.town}, {origin.department}
    </h3>

    <p className="fmc-origins-detail__headline">{origin.headline}</p>

    <p className="fmc-story-paragraph">{origin.summary}</p>

    <dl className="fmc-origins-detail__data">
      <div>
        <dt>Altura</dt>
        <dd>{origin.altitude}</dd>
      </div>
      <div>
        <dt>Piso térmico</dt>
        <dd>{origin.thermalFloor}</dd>
      </div>
    </dl>

    <h4 className="fmc-origins-detail__subtitle">Perfil de taza</h4>
    <p className="fmc-story-paragraph">{origin.cupProfile}</p>

    <p className="fmc-origins-detail__choose">{origin.chooseIf}</p>
  </article>
);
