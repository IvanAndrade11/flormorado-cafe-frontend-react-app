import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import { setCategoryTitle } from "@/utils/constants/redux/sets";
import { URLS } from "@/utils/constants";
import { ICategory } from "@/types/configCat";
import { CategoryTitle } from "@/types/store";

export const CategoryCard: React.FC<ICategory> = ({ id, name, imageUrl }) => {
  const navigate = useNavigate();

  const redirect = (url: string, categoryTitle: CategoryTitle) => {
    setCategoryTitle(categoryTitle);
    navigate(url);
  };
  return (
    <Col key={id}>
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
