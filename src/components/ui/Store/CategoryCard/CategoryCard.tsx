import "./CategoryCard.scss";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import { setCategoryTitle } from "@/utils/constants/redux/sets";
import { URLS } from "@/utils/constants";
import { ICategory } from "@/types/configCat";
import { CategoryTitle } from "@/types/store";

// `revealDelay` lo pone quien la pinta dentro de una sección que aparece, para
// escalonar la entrada; sin él la tarjeta se comporta como siempre.
export const CategoryCard: React.FC<ICategory & { revealDelay?: number }> = ({
  id,
  name,
  imageUrl,
  revealDelay,
}) => {
  const navigate = useNavigate();

  const redirect = (url: string, categoryTitle: CategoryTitle) => {
    setCategoryTitle(categoryTitle);
    navigate(url);
  };
  return (
    <Col key={id} data-fm-delay={revealDelay}>
      <Card
        key={id}
        onClick={() => redirect(URLS.store, name)}
        className="categories-card"
      >
        <Card.Img variant="top" src={imageUrl} className="w-60 mx-auto" />
        <Card.Body className="text-center">
          <Card.Title style={{ fontWeight: "bold", fontSize: "2rem" }}>
            {name}
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};
