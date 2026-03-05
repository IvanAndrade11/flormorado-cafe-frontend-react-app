import "./Categories.scss";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { URLS } from "@/utils/constants";
import { setCategoryTitle, setLoader } from "@/utils/constants/sets";
import { Title } from "@/components/ui";

import { Row, Col, Card } from "react-bootstrap";
import store from "@/app/providers/redux/store";

export const Categories: React.FC = () => {
  const [DATA, setData] = React.useState([]);
  const navigate = useNavigate();

  const { storeCategories } = store.getState().main.flags;

  useEffect(() => {
    setLoader(true);
  }, []);

  useEffect(() => {
    if (storeCategories) {
      const { categories } = JSON.parse(storeCategories);
      setData(categories);
      setLoader(false);
    }
  }, [storeCategories]);

  const redirect = (url: string, categoryTitle: string) => {
    setCategoryTitle(categoryTitle);
    navigate(url);
  };

  return (
    storeCategories &&
    DATA.length > 0 && (
      <>
        <div className="container mt-5">
          <Title title="CATEGORIAS" />

          <Row xs={1} md={2} lg={3} className="g-4 my-5">
            {DATA.map((item: any) => (
              <Col key={item.id}>
                <Card
                  key={item.id}
                  onClick={() => redirect(URLS.store, item.nombre)}
                  className="categories-card"
                >
                  <Card.Img
                    variant="top"
                    src={item.imageUrl}
                    className="w-60 mx-auto"
                  />
                  <Card.Body className="text-center">
                    <Card.Title
                      style={{ fontWeight: "bold", fontSize: "2rem" }}
                    >
                      {item.nombre}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </>
    )
  );
};
