import "./InfiniteCarousel.scss";

import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";

import store from "@/app/providers/redux/store";
import { setLoader } from "@/utils/constants/redux/sets";
import { scrollToSection } from "@/utils/constants";
import { ICoffeeGrower } from "@/types/configCat";

export const InfiniteCarousel: React.FC = () => {
  const [growersList, setGrowersList] = React.useState<ICoffeeGrower[]>([]);
  const [growersLength, setGrowersLength] = React.useState<number>(0);

  const { coffeeGrowers } = store.getState().main.flags;

  useEffect(() => {
    setLoader(true);
  }, []);

  useEffect(() => {
    if (coffeeGrowers) {
      const { growers } = JSON.parse(coffeeGrowers) as {
        growers: ICoffeeGrower[];
      };
      setGrowersList([...growers, ...growers]);
      setGrowersLength(growers.length * 2);
      setLoader(false);
    }
  }, [coffeeGrowers]);

  return (
    <section id="infinite-carousel">
      <div className="banner-carousel-title">
        <a onClick={() => scrollToSection("tab")}>
          Conoce nuestros caficultores aliados
        </a>
      </div>

      <div className={"carousel-container"}>
        <div className={"carousel-track"}>
          <Row md={growersLength} className="g-4">
            {growersList.map((item: ICoffeeGrower, index: number) => (
              <Col
                key={index}
                onClick={() =>
                  alert(
                    `Proximamente podrás conocer más acerca de ${item.name}`,
                  )
                }
              >
                <Card className="fmc-carousel-card ms-4">
                  <Card.Img
                    variant="top"
                    src={item.img}
                    className="fmc-carousel-card-img"
                  />
                </Card>
                <Card className="fmc-carousel-card-text ms-4 mt-2">
                  <Card.Body>
                    <Card.Text>{item.name}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </section>
  );
};
