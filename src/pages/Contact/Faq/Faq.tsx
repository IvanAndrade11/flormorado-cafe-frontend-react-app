import "./Faq.scss";

import React from "react";
import { Accordion, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { IFaqParagraph, IFaqPoint } from "@/types/components";
import { DATA_CONTROLLER, FAQ_GROUPS, icons } from "@/utils/constants";

const FaqText: React.FC<{ paragraph: IFaqParagraph }> = ({ paragraph }) => (
  <p className="fmc-faq__paragraph">
    {paragraph.map((fragment, index) => (
      <React.Fragment key={index}>
        {typeof fragment === "string" ? (
          fragment
        ) : fragment.url.startsWith("/") ? (
          <Link to={fragment.url}>{fragment.text}</Link>
        ) : (
          <a href={fragment.url} target="_blank" rel="noopener noreferrer">
            {fragment.text}
          </a>
        )}
      </React.Fragment>
    ))}
  </p>
);

const FaqPoints: React.FC<{ points: IFaqPoint[] }> = ({ points }) => (
  <ul className="fmc-faq__points">
    {points.map((point) => (
      <li key={point.id}>
        <img src={icons.GrainCoffee} alt="" width={16} height={16} />
        <span>
          <strong>{point.title}:</strong> {point.description}
        </span>
      </li>
    ))}
  </ul>
);

export const Faq: React.FC = () => (
  <section className="fmc-faq" id="preguntas-frecuentes">
    <h2 className="fmc-faq__title">Preguntas frecuentes</h2>
    <p className="fmc-faq__lead">
      Reunimos lo que más nos preguntan sobre la marca, nuestros cafés de origen
      y la harina de sagú. Abre la pregunta que te interese.
    </p>

    {FAQ_GROUPS.map((group) => (
      <div key={group.id} className="fmc-faq__group">
        <h3 className="fmc-faq__group-title">{group.title}</h3>

        <Accordion className="fmc-faq__accordion">
          {group.items.map((item) => (
            <Accordion.Item key={item.id} eventKey={item.id}>
              {/* `as` porque Bootstrap lo pinta como h2 y rompería el orden. */}
              <Accordion.Header as="h4">{item.question}</Accordion.Header>
              <Accordion.Body>
                {item.paragraphs.map((paragraph, index) => (
                  <FaqText key={index} paragraph={paragraph} />
                ))}
                {item.points && <FaqPoints points={item.points} />}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    ))}

    <div className="fmc-faq__cta">
      <p className="fmc-faq__cta-text">¿Aún tienes dudas?</p>
      <Button
        className="fmc-button fmc-faq__cta-button"
        href={DATA_CONTROLLER.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={icons.WhatsApp} alt="" width={22} height={22} />
        Escríbenos por WhatsApp
      </Button>
    </div>
  </section>
);
