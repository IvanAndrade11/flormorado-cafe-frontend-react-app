import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import { setCategoryTitle } from "@/utils/constants/redux/sets";
import { URLS } from "@/utils/constants";

export const CategoryCard: React.FC<{
  id: string;
  name: string;
  imageUrl: string;
}> = ({ id, name, imageUrl }) => {
  const navigate = useNavigate();

  const redirect = (url: string, categoryTitle: string) => {
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
