import "./Purpose.scss";

import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { IPurposeHighlight, IPurposeSection } from "@/types/components";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import {
  icons,
  PURPOSE_LEAD,
  PURPOSE_LEAD_IMAGE,
  PURPOSE_SECTIONS,
  URLS,
} from "@/utils/constants";

// El zigzag cuenta solo las secciones con ilustración, para que la que no
// tiene no deje dos seguidas del mismo lado.
let shown = 0;
const SECTIONS = PURPOSE_SECTIONS.map((section) => ({
  section,
  reverse: Boolean(section.image) && shown++ % 2 === 1,
}));

// Decorativo, así que va sin alt.
const CoffeeBean: React.FC<{ size: number }> = ({ size }) => (
  <img
    src={icons.GrainCoffee}
    alt=""
    width={size}
    height={size}
    className="purpose-bean"
  />
);

const PurposeSectionBody: React.FC<{ section: IPurposeSection }> = ({
  section,
}) => (
  <>
    <h2 className="purpose-question">{section.question}</h2>

    {section.paragraphs.map((paragraph, index) => (
      <p key={index} className="purpose-paragraph">
        {paragraph}
      </p>
    ))}

    {section.quote && (
      <blockquote className="purpose-quote">{section.quote}</blockquote>
    )}

    {section.highlightsLayout === "list" && section.highlights && (
      <ul className="purpose-list">
        {section.highlights.map((highlight: IPurposeHighlight) => (
          <li key={highlight.id}>
            <CoffeeBean size={17} />
            <span>
              <strong>{highlight.title}:</strong> {highlight.description}
            </span>
          </li>
        ))}
      </ul>
    )}
  </>
);

const PurposeSectionBlock: React.FC<{
  section: IPurposeSection;
  reverse: boolean;
}> = ({ section, reverse }) => (
  <section
    id={section.id}
    className={`purpose-section${reverse ? " purpose-section--reverse" : ""}`}
  >
    {section.image ? (
      <Row className="purpose-section__row align-items-center g-4 g-lg-5">
        <Col xs={12} lg={6} className="purpose-section__media">
          <figure className="purpose-figure">
            <img
              src={section.image.src}
              alt={section.image.alt}
              loading="lazy"
            />
          </figure>

          {section.secondaryImage && (
            <figure className="purpose-figure purpose-figure--secondary">
              <img
                src={section.secondaryImage.src}
                alt={section.secondaryImage.alt}
                loading="lazy"
              />
            </figure>
          )}
        </Col>

        <Col xs={12} lg={6} className="purpose-section__text">
          <PurposeSectionBody section={section} />
        </Col>
      </Row>
    ) : (
      <div className="purpose-section__text purpose-section__text--solo">
        <PurposeSectionBody section={section} />
      </div>
    )}

    {section.highlightsLayout === "cards" && section.highlights && (
      <Row className="g-4 purpose-cards">
        {section.highlights.map((highlight: IPurposeHighlight) => (
          <Col key={highlight.id} xs={12} md={4}>
            <Card className="h-100 shadow-sm purpose-card">
              <Card.Body>
                <CoffeeBean size={26} />
                <Card.Title className="purpose-card__title">
                  {highlight.title}
                </Card.Title>
                <Card.Text className="purpose-card__text">
                  {highlight.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    )}
  </section>
);

export const Purpose: React.FC = () => {
  useDocumentMeta({
    title: "Nuestro propósito | Flormorado Café",
    description: PURPOSE_LEAD,
    image: PURPOSE_LEAD_IMAGE.src,
  });

  return (
    <div className="purpose-page">
      <Container>
        <section className="purpose-lead">
          <Row className="align-items-center g-4">
            <Col xs={12} lg={7}>
              <p className="purpose-lead__text">{PURPOSE_LEAD}</p>
            </Col>
            <Col xs={12} lg={5} className="purpose-lead__media">
              <img src={PURPOSE_LEAD_IMAGE.src} alt={PURPOSE_LEAD_IMAGE.alt} />
            </Col>
          </Row>
        </section>

        {SECTIONS.map(({ section, reverse }) => (
          <PurposeSectionBlock
            key={section.id}
            section={section}
            reverse={reverse}
          />
        ))}

        <section className="purpose-cta">
          <h2>Cada taza lleva el nombre de quien la cultivó</h2>
          <p>
            Conoce los cafés que nacen de estas fincas y la gente que los hace
            posibles.
          </p>
          <div className="purpose-cta__actions">
            <Link to={URLS.store} className="btn fmc-button">
              Ver nuestros cafés
            </Link>
            <Link to={URLS.contact} className="purpose-cta__link">
              Escríbenos →
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
};
