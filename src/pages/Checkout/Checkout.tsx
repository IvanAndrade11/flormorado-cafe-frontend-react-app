import { ProductListGroup } from "@/components/ui";
import "./Checkout.scss";

import React, { useRef, useState } from "react";
import {
  Accordion,
  Alert,
  Button,
  Col,
  Container,
  Image,
  Row,
} from "react-bootstrap";
import { TotalView } from "@/components/ui/Store/ShoppingCart/TotalView/TotalView";
import { images, URLS } from "@/utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { CheckoutForm } from "./CheckoutForm/CheckoutForm";
import { OrderConfirmation } from "./OrderConfirmation/OrderConfirmation";
import {
  CONTACT_FORM_FIELDS,
  DELIVERY_FORM_FIELDS,
  PAYMENT_FORM_FIELDS,
} from "@/utils/constants/common/forms";
import { IFormFields } from "@/types/components";
import { ICoffeeProduct } from "@/types/configCat";
import { IOrderConfirmation } from "@/types/orders";
import {
  CHECKOUT_STORAGE_KEY,
  LAST_ORDER_STORAGE_KEY,
} from "@/utils/constants/storage/data";
import { useAppSelector } from "@/app/providers/redux";
import { setCart } from "@/utils/constants/redux/sets";
import { reconcileCart } from "@/utils/constants/store/cart";
import {
  buildConfirmation,
  buildOrderPayload,
  createIdempotencyKey,
  submitOrder,
} from "@/services/orders";

type FormValues = Record<string, string | boolean>;

const persistableFieldNames = (fields: IFormFields[]) =>
  fields.flatMap((row) =>
    row.cols.filter((col) => col.type !== "note").map((col) => col.name),
  );

const CONTACT_FIELD_NAMES = persistableFieldNames(CONTACT_FORM_FIELDS);
const DELIVERY_FIELD_NAMES = persistableFieldNames(DELIVERY_FORM_FIELDS);

const loadSavedInfo = (): FormValues => {
  try {
    const raw = localStorage.getItem(CHECKOUT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveInfoIfRequested = (values: FormValues) => {
  try {
    if (!values.saveInfo) {
      localStorage.removeItem(CHECKOUT_STORAGE_KEY);
      return;
    }

    const toPersist: FormValues = {
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

const loadLastOrder = (): IOrderConfirmation | null => {
  try {
    const raw = sessionStorage.getItem(LAST_ORDER_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as IOrderConfirmation) : null;
  } catch {
    return null;
  }
};

const saveLastOrder = (confirmation: IOrderConfirmation) => {
  try {
    sessionStorage.setItem(
      LAST_ORDER_STORAGE_KEY,
      JSON.stringify(confirmation),
    );
  } catch {
    // sessionStorage unavailable — a reload just won't show the confirmation
  }
};

const parseCatalog = (storeProducts?: string): ICoffeeProduct[] => {
  if (!storeProducts) return [];
  try {
    return (
      (JSON.parse(storeProducts) as { products?: ICoffeeProduct[] }).products ??
      []
    );
  } catch {
    return [];
  }
};

const UNAVAILABLE_MESSAGE =
  "No pudimos confirmar tu pedido. Tu carrito sigue guardado: revisa tu conexión e inténtalo de nuevo en un momento.";

const INVALID_MESSAGE =
  "Algunos datos no pasaron la validación. Revisa tu información de contacto, entrega y pago, y vuelve a intentarlo.";

const staleCartMessage = (
  repriced: string[],
  removed: string[],
  cartIsEmpty: boolean,
): React.ReactNode => {
  if (cartIsEmpty) {
    return (
      <>
        Los productos de tu carrito ya no están disponibles.{" "}
        <Link to={URLS.store}>Vuelve a la tienda</Link> para elegir otros.
      </>
    );
  }

  if (repriced.length === 0 && removed.length === 0) {
    // El catálogo del navegador ya estaba al día y el del servidor todavía no.
    return "Los precios cambiaron hace un momento. Espera un par de minutos y vuelve a confirmar tu pedido.";
  }

  return (
    <>
      Actualizamos tu carrito porque algunos productos cambiaron desde que lo
      armaste:
      <ul className="mb-2 mt-2">
        {repriced.map((name) => (
          <li key={`p-${name}`}>
            <strong>{name}</strong> cambió de precio
          </li>
        ))}
        {removed.map((name) => (
          <li key={`r-${name}`}>
            <strong>{name}</strong> ya no está disponible
          </li>
        ))}
      </ul>
      Revisa el nuevo total en el resumen y vuelve a confirmar tu pedido.
    </>
  );
};

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.main.session.cart);
  const storeProducts = useAppSelector(
    (state) => state.main.flags.storeProducts,
  );

  const [activeKey, setActiveKey] = useState<string>("contact");
  const [form, setForm] = useState<FormValues>(() => loadSavedInfo());
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<React.ReactNode>(null);
  // Si el carrito está vacío al entrar, lo más probable es que el cliente haya
  // recargado la confirmación: se la volvemos a mostrar.
  const [confirmation, setConfirmation] = useState<IOrderConfirmation | null>(
    () => (cart.length === 0 ? loadLastOrder() : null),
  );

  // La llave de idempotencia identifica un intento con un contenido concreto.
  // Si el envío falla, reintentar el mismo pedido reusa la llave y el backend
  // devuelve el que ya creó; pero si el cliente cambia algo, es otro pedido.
  const attempt = useRef<{ key: string; fingerprint: string } | null>(null);

  const handleStepSubmit = (formValues: FormValues) => {
    setForm((prev) => {
      const merged = { ...prev, ...formValues };
      saveInfoIfRequested(merged);
      return merged;
    });
  };

  const handlePlaceOrder = async (formValues: FormValues) => {
    const merged = { ...form, ...formValues };
    handleStepSubmit(formValues);

    const draft = buildOrderPayload(merged, cart, "");
    const fingerprint = JSON.stringify(draft);
    if (attempt.current?.fingerprint !== fingerprint) {
      attempt.current = { key: createIdempotencyKey(), fingerprint };
    }
    const payload = { ...draft, idempotencyKey: attempt.current.key };

    setSubmitting(true);
    setSubmitError(null);
    const result = await submitOrder(payload);
    setSubmitting(false);

    switch (result.kind) {
      case "created": {
        const snapshot = buildConfirmation(payload, cart, result);
        saveLastOrder(snapshot);
        setConfirmation(snapshot);
        // El carrito se vacía solo aquí, con el pedido ya confirmado: si algo
        // falla antes, el cliente conserva su carrito para reintentar.
        setCart([]);
        attempt.current = null;
        window.scrollTo({ top: 0 });
        return;
      }
      case "stale_cart": {
        const reconciled = reconcileCart(cart, parseCatalog(storeProducts));
        if (reconciled.repriced.length || reconciled.removed.length) {
          setCart(reconciled.cart);
        }
        setSubmitError(
          staleCartMessage(
            reconciled.repriced,
            reconciled.removed,
            reconciled.cart.length === 0,
          ),
        );
        return;
      }
      case "invalid":
        setSubmitError(INVALID_MESSAGE);
        return;
      default:
        setSubmitError(UNAVAILABLE_MESSAGE);
    }
  };

  return (
    <Container>
      <Row className="text-center fmc-checkout-logo">
        <Link to="/">
          <Image src={images.LogoNombre} alt="Flormorado Café" />
        </Link>
      </Row>

      {confirmation ? (
        <OrderConfirmation confirmation={confirmation} />
      ) : cart.length === 0 ? (
        <div className="fmc-checkout-empty">
          <h1>Tu carrito está vacío</h1>
          <p>Agrega productos desde la tienda para hacer tu pedido.</p>
          <Button className="fmc-button" onClick={() => navigate(URLS.store)}>
            Ir a la tienda
          </Button>
        </div>
      ) : (
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
                setForm={(values) => {
                  void handlePlaceOrder(values);
                }}
                labelBtn="Realizar pedido"
                submitting={submitting}
                submitError={submitError}
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
                <Link to={URLS.terms} target="_blank" rel="noopener noreferrer">
                  términos y condiciones
                </Link>
                .
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
      )}
    </Container>
  );
};
