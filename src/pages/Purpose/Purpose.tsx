import React from "react";
import { Link } from "react-router-dom";

import {
  StoryCta,
  StoryLead,
  StoryPage,
  StorySections,
} from "@/components/section";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import {
  PURPOSE_LEAD,
  PURPOSE_LEAD_IMAGE,
  PURPOSE_SECTIONS,
  URLS,
} from "@/utils/constants";

export const Purpose: React.FC = () => {
  useDocumentMeta({
    title: "Nuestro propósito | Flormorado Café",
    description: PURPOSE_LEAD,
    image: PURPOSE_LEAD_IMAGE.src,
  });

  return (
    <StoryPage>
      <StoryLead text={PURPOSE_LEAD} image={PURPOSE_LEAD_IMAGE} />

      <StorySections sections={PURPOSE_SECTIONS} />

      <StoryCta
        title="Cada taza lleva el nombre de quien la cultivó"
        text="Conoce los cafés que nacen de estas fincas y la gente que los hace posibles."
      >
        <Link to={URLS.store} className="btn fmc-button">
          Ver nuestros cafés
        </Link>
        <Link to={URLS.contact} className="fmc-story-cta__link">
          Escríbenos →
        </Link>
      </StoryCta>
    </StoryPage>
  );
};
