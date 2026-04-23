import { ProductListGroup } from "@/components/ui";
import "./Checkout.scss";

import React, { useEffect, useState } from "react";
import { Accordion, Alert, Col, Container, Image, Row } from "react-bootstrap";
import store from "@/app/providers/redux/store";
import { TotalView } from "@/components/ui/Store/ShoppingCart/TotalView/TotalView";
import { images } from "@/utils/constants";
import { Link } from "react-router-dom";
import { CheckoutForm } from "./CheckoutForm/CheckoutForm";
import { CONTACT_FORM_FIELDS } from "@/utils/constants/common/forms";

export const Checkout: React.FC = () => {
  const { cart } = store.getState().main.session;
  const [activeKey, setActiveKey] = useState<string>("contact");

  const [form, setForm] = useState();

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <Container>
      <Row className="text-center fmc-checkout-logo">
        <Link to="/">
          <Image src={images.LogoNombre} alt="Flormorado Café" />
        </Link>
      </Row>

      <Row>
        <Col md={7} className="mb-3">
          <Accordion activeKey={activeKey}>
            <CheckoutForm
              title="Información de Contacto"
              formFields={CONTACT_FORM_FIELDS}
              eventKey={"contact"}
              setActiveKey={setActiveKey}
              setForm={setForm}
              nextActiveKey="delivery"
              labelBtn="Continuar"
            />
            <CheckoutForm
              title="Datos de Entrega"
              formFields={CONTACT_FORM_FIELDS}
              eventKey={"delivery"}
              setActiveKey={setActiveKey}
              setForm={setForm}
              nextActiveKey="payment"
              labelBtn="Continuar"
            />
            <CheckoutForm
              title="Pago"
              formFields={CONTACT_FORM_FIELDS}
              eventKey={"payment"}
              setActiveKey={setActiveKey}
              setForm={setForm}
              nextActiveKey="end"
              labelBtn="Realizar pedido"
            />
          </Accordion>
        </Col>
        <Col md={5} className="mb-3">
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
