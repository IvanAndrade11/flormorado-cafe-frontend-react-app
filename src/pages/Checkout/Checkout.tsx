import { ProductListGroup } from "@/components/ui";
import "./Checkout.scss";

import React, { useState } from "react";
import { Accordion, Alert, Col, Container, Image, Row } from "react-bootstrap";
import store from "@/app/providers/redux/store";
import { TotalView } from "@/components/ui/Store/ShoppingCart/TotalView/TotalView";
import { images } from "@/utils/constants";
import { Link } from "react-router-dom";
import { CheckoutForm } from "./CheckoutForm/CheckoutForm";
import {
  CONTACT_FORM_FIELDS,
  DELIVERY_FORM_FIELDS,
  PAYMENT_FORM_FIELDS,
} from "@/utils/constants/common/forms";
import { IFormFields } from "@/types/components";
import { CHECKOUT_STORAGE_KEY } from "@/utils/constants/storage/data";

const persistableFieldNames = (fields: IFormFields[]) =>
  fields.flatMap((row) =>
    row.cols.filter((col) => col.type !== "note").map((col) => col.name),
  );

const CONTACT_FIELD_NAMES = persistableFieldNames(CONTACT_FORM_FIELDS);
const DELIVERY_FIELD_NAMES = persistableFieldNames(DELIVERY_FORM_FIELDS);

const loadSavedInfo = (): Record<string, string | boolean> => {
  try {
    const raw = localStorage.getItem(CHECKOUT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveInfoIfRequested = (values: Record<string, string | boolean>) => {
  try {
    if (!values.saveInfo) {
      localStorage.removeItem(CHECKOUT_STORAGE_KEY);
      return;
    }

    const toPersist: Record<string, string | boolean> = {
      saveInfo: true,
      whtsppOptIn: !!values.whtsppOptIn,
    };
    [...CONTACT_FIELD_NAMES, ...DELIVERY_FIELD_NAMES].forEach((name) => {
      if (values[name] !== undefined) toPersist[name] = values[name];
    });

    localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(toPersist));
  } catch {
    // localStorage unavailable — info just won't be remembered
  }
};

export const Checkout: React.FC = () => {
  const { cart } = store.getState().main.session;
  const [activeKey, setActiveKey] = useState<string>("contact");
  const [form, setForm] = useState<Record<string, string | boolean>>(() =>
    loadSavedInfo(),
  );

  const handleStepSubmit = (formValues: Record<string, string | boolean>) => {
    setForm((prev) => {
      const merged = { ...prev, ...formValues };
      saveInfoIfRequested(merged);
      return merged;
    });
  };

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
              setForm={handleStepSubmit}
              nextActiveKey="delivery"
              labelBtn="Continuar"
              defaultValues={form}
            />
            <CheckoutForm
              title="Datos de Entrega"
              formFields={DELIVERY_FORM_FIELDS}
              eventKey={"delivery"}
              setActiveKey={setActiveKey}
              setForm={handleStepSubmit}
              nextActiveKey="payment"
              labelBtn="Continuar"
              defaultValues={form}
            />
            <CheckoutForm
              title="Pago"
              formFields={PAYMENT_FORM_FIELDS}
              eventKey={"payment"}
              setActiveKey={setActiveKey}
              setForm={handleStepSubmit}
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
