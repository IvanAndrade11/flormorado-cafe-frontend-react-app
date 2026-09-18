import { Title } from "@/components/ui";
import "./Contact.scss";

import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  FloatingLabel,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { icons, URLS } from "@/utils/constants";
import { IContactPayload, SubmitContactResult } from "@/types/contact";
import { submitContact } from "@/services/contact";

const SUBJECT_OPTIONS = [
  { value: "pedido", label: "Estado de un pedido" },
  { value: "producto", label: "Preguntas sobre un producto" },
  { value: "mayoristas", label: "Ventas al por mayor / aliados" },
  { value: "prensa", label: "Prensa y medios" },
  { value: "otro", label: "Otro" },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const UNAVAILABLE_MESSAGE =
  "No pudimos enviar tu mensaje. Revisa tu conexión e inténtalo de nuevo, o escríbenos directamente por WhatsApp.";

const INVALID_MESSAGE =
  "Algunos datos no pasaron la validación. Revisa el formulario e inténtalo de nuevo.";

export const Contact: React.FC = () => {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitContactResult | null>(null);

  const setField = (name: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.currentTarget.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const phone = form.phone.trim();
    const payload: IContactPayload = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject,
      message: form.message.trim(),
      ...(phone ? { phone } : {}),
    };

    setSubmitting(true);
    setResult(null);
    const outcome = await submitContact(payload);
    setSubmitting(false);
    setResult(outcome);

    if (outcome.kind === "sent") {
      // Formulario vacío otra vez: si el cliente vuelve a escribirnos, no debe
      // quedar rastro del mensaje anterior ni de su validación.
      setForm(EMPTY_FORM);
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  return (
    <div className="container fmc-contact">
      <Title title="¡CONTÁCTANOS!" />

      <p className="fmc-contact__lead">
        ¿Tienes una pregunta sobre tu pedido, nuestros cafés de origen o quieres
        ser aliado? Escríbenos y te respondemos en menos de 24 horas hábiles.
      </p>

      <Row className="fmc-contact__surface">
        <Col md={7} className="mb-4">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <fieldset disabled={submitting}>
              <Row>
                <Form.Group
                  as={Col}
                  md={6}
                  controlId="contact-name"
                  className="mb-4"
                >
                  <FloatingLabel controlId="contact-name" label="Nombre">
                    <Form.Control
                      required
                      type="text"
                      placeholder="Nombre"
                      minLength={3}
                      maxLength={40}
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor, ingresa tu nombre.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md={6}
                  controlId="contact-phone"
                  className="mb-4"
                >
                  <FloatingLabel
                    controlId="contact-phone"
                    label="Teléfono (opcional)"
                  >
                    <Form.Control
                      type="tel"
                      placeholder="Teléfono (opcional)"
                      pattern="^3[0-9]{9}$"
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresa un teléfono válido (ej: 3001234567).
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group
                  as={Col}
                  md={7}
                  controlId="contact-email"
                  className="mb-4"
                >
                  <FloatingLabel
                    controlId="contact-email"
                    label="Correo electrónico"
                  >
                    <Form.Control
                      required
                      type="email"
                      placeholder="Correo electrónico"
                      pattern="^.+@.+\.[a-zA-Z]{2,}$"
                      minLength={5}
                      maxLength={100}
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresa un correo electrónico válido.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md={5}
                  controlId="contact-subject"
                  className="mb-4"
                >
                  <FloatingLabel controlId="contact-subject" label="Asunto">
                    <Form.Select
                      required
                      value={form.subject}
                      onChange={(e) => setField("subject", e.target.value)}
                    >
                      <option value="" disabled>
                        Selecciona una opción
                      </option>
                      {SUBJECT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Selecciona un asunto.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Row>

              <Form.Group controlId="contact-message" className="mb-4">
                <FloatingLabel controlId="contact-message" label="Mensaje">
                  <Form.Control
                    required
                    as="textarea"
                    placeholder="Mensaje"
                    minLength={10}
                    maxLength={1000}
                    className="fmc-contact__textarea"
                    value={form.message}
                    onChange={(e) => setField("message", e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Cuéntanos en qué podemos ayudarte.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </fieldset>

            <p className="fmc-contact__consent">
              Al enviar este formulario aceptas nuestros{" "}
              <Link to={URLS.terms} target="_blank" rel="noopener noreferrer">
                términos y condiciones
              </Link>{" "}
              y autorizas el tratamiento de tus datos para darte respuesta.
            </p>

            {result?.kind === "sent" && (
              <Alert variant="success" className="mb-4" role="alert">
                ¡Gracias por escribirnos! Recibimos tu mensaje y te
                responderemos pronto a tu correo.
              </Alert>
            )}
            {result?.kind === "invalid" && (
              <Alert variant="danger" className="mb-4" role="alert">
                {INVALID_MESSAGE}
              </Alert>
            )}
            {result?.kind === "unavailable" && (
              <Alert variant="danger" className="mb-4" role="alert">
                {UNAVAILABLE_MESSAGE}
              </Alert>
            )}

            <div className="d-flex justify-content-center">
              <Button
                type="submit"
                className="fmc-button"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Enviando…
                  </>
                ) : (
                  "Enviar mensaje"
                )}
              </Button>
            </div>
          </Form>
        </Col>

        <Col md={5} className="mb-4">
          <div className="fmc-contact__info">
            <h2>Otras formas de escribirnos</h2>
            <ul className="fmc-contact__list">
              <li>
                <a href="mailto:info@flormoradocafe.com">
                  <img src={icons.Mail} alt="" />
                  info@flormoradocafe.com
                </a>
              </li>
              <li>
                <a href="tel:3132316080">
                  <img src={icons.Phone} alt="" />
                  +57 313 231 60 80
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/573132316080"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={icons.WhatsApp} alt="" />
                  Escríbenos por WhatsApp
                </a>
              </li>
            </ul>

            <p className="fmc-contact__hours">
              <strong>Horario de atención</strong>
              <br />
              Lunes a viernes, 8:00 a.m. – 5:00 p.m.
            </p>

            <div className="fmc-contact__social">
              <a
                href="https://www.instagram.com/flormoradocafe/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={icons.Instagram} alt="Instagram Flormorado Café" />
              </a>
              <a
                href="https://www.facebook.com/flormoradocafe"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={icons.Facebook} alt="Facebook Flormorado Café" />
              </a>
              <a
                href="https://www.youtube.com/@flormoradocafe"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={icons.YouTube} alt="YouTube Flormorado Café" />
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
