import React from "react";

import { StoryLead, StoryPage, StorySections } from "@/components/section";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import {
  ORIGINS_LEAD,
  ORIGINS_SECTIONS,
  ORIGINS_SHARE_IMAGE,
} from "@/utils/constants";

import { OriginsExplorer } from "./OriginsExplorer";

export const Origins: React.FC = () => {
  useDocumentMeta({
    title: "Orígenes | Flormorado Café",
    description: ORIGINS_SECTIONS[0].paragraphs[0],
    image: ORIGINS_SHARE_IMAGE,
  });

  return (
    <StoryPage>
      <StoryLead text={ORIGINS_LEAD} />

      <StorySections sections={ORIGINS_SECTIONS} />

      <OriginsExplorer />
    </StoryPage>
  );
};
