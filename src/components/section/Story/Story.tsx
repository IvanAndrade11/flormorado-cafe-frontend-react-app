import "./Story.scss";

import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import {
  IStoryHighlight,
  IStoryImage,
  IStorySection,
} from "@/types/components";
import { icons } from "@/utils/constants";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

// Decorativo, así que va sin alt.
const CoffeeBean: React.FC<{ size: number }> = ({ size }) => (
  <img
    src={icons.GrainCoffee}
    alt=""
    width={size}
    height={size}
    className="fmc-story-bean"
  />
);

export const StoryPage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="fmc-story">
    <Container>{children}</Container>
  </div>
);

export const StoryLead: React.FC<{ text: string; image?: IStoryImage }> = ({
  text,
  image,
}) => (
  <section className="fmc-story-lead">
    {image ? (
      <Row className="align-items-center g-4">
        <Col xs={12} lg={7}>
          <p className="fmc-story-lead__text">{text}</p>
        </Col>
        <Col xs={12} lg={5} className="fmc-story-lead__media">
          <img src={image.src} alt={image.alt} />
        </Col>
      </Row>
    ) : (
      <p className="fmc-story-lead__text fmc-story-lead__text--solo">{text}</p>
    )}
  </section>
);

const StorySectionBody: React.FC<{ section: IStorySection }> = ({
  section,
}) => (
  <>
    {section.question && (
      <h2 className="fmc-story-question">{section.question}</h2>
    )}

    {section.paragraphs.map((paragraph, index) => (
      <p key={index} className="fmc-story-paragraph">
        {paragraph}
      </p>
    ))}

    {section.quote && (
      <blockquote className="fmc-story-quote">{section.quote}</blockquote>
    )}

    {section.highlightsLayout === "list" && section.highlights && (
      <ul className="fmc-story-list">
        {section.highlights.map((highlight: IStoryHighlight) => (
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

const StorySection: React.FC<{
  section: IStorySection;
  reverse: boolean;
}> = ({ section, reverse }) => {
  const { ref, revealClassName } = useRevealOnScroll<HTMLElement>();

  return (
    <section
      ref={ref}
      id={section.id}
      className={`fmc-story-section${reverse ? " fmc-story-section--reverse" : ""} ${revealClassName}`}
    >
      {section.image ? (
        <Row className="fmc-story-section__row align-items-center g-4 g-lg-5">
          <Col xs={12} lg={6}>
            <figure className="fmc-story-figure">
              <img
                src={section.image.src}
                alt={section.image.alt}
                loading="lazy"
              />
            </figure>

            {section.secondaryImage && (
              <figure className="fmc-story-figure fmc-story-figure--secondary">
                <img
                  src={section.secondaryImage.src}
                  alt={section.secondaryImage.alt}
                  loading="lazy"
                />
              </figure>
            )}
          </Col>

          <Col xs={12} lg={6}>
            <StorySectionBody section={section} />
          </Col>
        </Row>
      ) : (
        <div className="fmc-story-section__text--solo">
          <StorySectionBody section={section} />
        </div>
      )}

      {section.highlightsLayout === "cards" && section.highlights && (
        <Row className="g-4 fmc-story-cards">
          {section.highlights.map(
            (highlight: IStoryHighlight, index: number) => (
              <Col key={highlight.id} xs={12} md={4} data-fm-delay={index + 1}>
                <Card className="h-100 shadow-sm fmc-story-card">
                  <Card.Body>
                    <CoffeeBean size={26} />
                    <Card.Title className="fmc-story-card__title">
                      {highlight.title}
                    </Card.Title>
                    <Card.Text className="fmc-story-card__text">
                      {highlight.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ),
          )}
        </Row>
      )}
    </section>
  );
};

export const StorySections: React.FC<{ sections: IStorySection[] }> = ({
  sections,
}) => {
  // El zigzag cuenta solo las secciones con ilustración, para que una sin ella
  // no deje dos seguidas del mismo lado.
  let withImage = 0;

  return (
    <>
      {sections.map((section) => (
        <StorySection
          key={section.id}
          section={section}
          reverse={Boolean(section.image) && withImage++ % 2 === 1}
        />
      ))}
    </>
  );
};

export const StoryCta: React.FC<{
  title: string;
  text: string;
  children: React.ReactNode;
}> = ({ title, text, children }) => {
  const { ref, revealClassName } = useRevealOnScroll<HTMLElement>();

  return (
    <section ref={ref} className={`fmc-story-cta ${revealClassName}`}>
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="fmc-story-cta__actions">{children}</div>
    </section>
  );
};
