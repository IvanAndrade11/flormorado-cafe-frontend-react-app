import "./Purpose.scss";

import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Title } from "@/components/ui";
import { IPurposeHighlight, IPurposeSection } from "@/types/components";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import {
  PURPOSE_HERO,
  PURPOSE_IMAGE_CREDITS,
  PURPOSE_LEAD,
  PURPOSE_SECTIONS,
  URLS,
} from "@/utils/constants";

// Viñeta decorativa, en línea como los iconos del blog.
const CoffeeBean: React.FC = () => (
  <svg
    className="purpose-bean"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    aria-hidden="true"
    focusable="false"
  >
    <ellipse
      cx="8"
      cy="8"
      rx="4.6"
      ry="6.8"
      transform="rotate(-35 8 8)"
      fill="currentColor"
    />
    <path
      d="M5.2 4.9C7.4 6.6 8.6 9.4 10.8 11.1"
      stroke="#fff"
      strokeWidth="1.3"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const PurposeSectionBlock: React.FC<{
  section: IPurposeSection;
  reverse: boolean;
}> = ({ section, reverse }) => (
  <section
    id={section.id}
    className={`purpose-section${reverse ? " purpose-section--reverse" : ""}`}
  >
    <Row className="purpose-section__row align-items-center g-4 g-lg-5">
      <Col xs={12} lg={6} className="purpose-section__media">
        <figure className="purpose-figure">
          <img src={section.image.src} alt={section.image.alt} loading="lazy" />
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
        <Badge className="purpose-badge">{section.eyebrow}</Badge>

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
                <CoffeeBean />
                <span>
                  <strong>{highlight.title}:</strong> {highlight.description}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Col>
    </Row>

    {section.highlightsLayout === "cards" && section.highlights && (
      <Row className="g-4 purpose-cards">
        {section.highlights.map((highlight: IPurposeHighlight) => (
          <Col key={highlight.id} xs={12} md={4}>
            <Card className="h-100 shadow-sm purpose-card">
              <Card.Body>
                <CoffeeBean />
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
    image: PURPOSE_HERO.src,
  });

  return (
    <>
      <div className="container">
        <Title title="NUESTRO PROPÓSITO" />
      </div>

      <Container className="py-5 purpose-page card">
        <figure className="purpose-hero">
          <img src={PURPOSE_HERO.src} alt={PURPOSE_HERO.alt} />
        </figure>

        <p className="purpose-lead">{PURPOSE_LEAD}</p>

        {PURPOSE_SECTIONS.map((section, index) => (
          <PurposeSectionBlock
            key={section.id}
            section={section}
            reverse={index % 2 === 1}
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

        {/* Se borra cuando entren las fotos de la marca. */}
        <aside className="purpose-credits">
          <p>
            Fotografías provisionales de Wikimedia Commons, mientras llegan las
            de la marca:{" "}
            {PURPOSE_IMAGE_CREDITS.map((credit, index) => (
              <React.Fragment key={credit.id}>
                {index > 0 && " · "}
                <a href={credit.url} target="_blank" rel="noopener noreferrer">
                  {credit.work}
                </a>
                {` — ${credit.author} (${credit.license})`}
              </React.Fragment>
            ))}
            .
          </p>
        </aside>
      </Container>
    </>
  );
};
