import "./OriginsExplorer.scss";

import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

import { ORIGINS } from "@/utils/constants";

import { ColombiaMap } from "./ColombiaMap";
import { OriginDetail } from "./OriginDetail";

export const OriginsExplorer: React.FC = () => {
  const [selectedId, setSelectedId] = useState(ORIGINS[0].id);
  const selected = ORIGINS.find(({ id }) => id === selectedId) ?? ORIGINS[0];

  return (
    <section id="nuestros-origenes" className="fmc-origins">
      <Row className="g-4 g-lg-5">
        <Col xs={12} lg={5}>
          <div className="fmc-origins__map">
            <ColombiaMap
              origins={ORIGINS}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </Col>

        <Col xs={12} lg={7}>
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

          {/* Remontar la ficha reinicia la entrada al cambiar de origen. */}
          <OriginDetail key={selected.id} origin={selected} />
        </Col>
      </Row>
    </section>
  );
};
