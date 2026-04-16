import { ProductListGroup } from "@/components/ui/Store/ShoppingCart/ProductListGroup/ProductListGroup";
import "./Checkout.scss";

import React from "react";
import {
  Accordion,
  Alert,
  Card,
  Col,
  Container,
  Row,
  useAccordionButton,
} from "react-bootstrap";
import store from "@/app/providers/redux/store";
import { TotalView } from "@/components/ui/Store/ShoppingCart/TotalView/TotalView";

export const Checkout: React.FC = () => {
  const { cart } = store.getState().main.session;
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>Información de Contacto</Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <CustomToggle eventKey="1">
                    Pasar al siguiente paso
                  </CustomToggle>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>Datos de Entrega</Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <>
                    <CustomToggle eventKey="0">Volver!</CustomToggle>
                    <CustomToggle eventKey="2">Siguiente!</CustomToggle>
                  </>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>Pago</Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <>
                    <CustomToggle eventKey="1">Volver!</CustomToggle>
                  </>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
        <Col>
          <Alert variant="success">
            <Alert.Heading>
              Tu compra es <strong>100% segura</strong>
            </Alert.Heading>
            <p className="mb-0">
              Al realizar el pago, aceptas nuestros{" "}
              <a href="#">términos y condiciones</a>.
            </p>
          </Alert>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Resumen del pedido</Accordion.Header>
              <Accordion.Body>
                <ProductListGroup cart={cart} />
                <TotalView cart={cart} showSub={true} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

function CustomToggle({
  children,
  eventKey,
}: {
  children: React.ReactNode;
  eventKey: string;
}) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!"),
  );

  return (
    <button
      type="button"
      style={{ backgroundColor: "pink" }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}
