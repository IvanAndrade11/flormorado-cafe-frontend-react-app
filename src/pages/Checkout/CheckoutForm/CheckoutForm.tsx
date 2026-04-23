import React, { useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { ICheckoutForm } from "@/types/components";
import { CheckoutHeader } from "../CheckoutHeader/CheckoutHeader";

export const CheckoutForm: React.FC<ICheckoutForm> = ({
  title,
  formFields,
  eventKey,
  setActiveKey,
  setForm,
  nextActiveKey,
  labelBtn,
}) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const formData = new FormData(form);
    const formValues = formFields.reduce(
      (acc, row) => {
        row.cols.forEach((col) => {
          acc[col.name] = formData.get(col.name) as string;
        });
        return acc;
      },
      {} as Record<string, string>,
    );

    setForm(formValues);
    setValidated(true);
    setActiveKey(nextActiveKey);
  };

  return (
    <Card>
      <CheckoutHeader
        title={title}
        validated={validated}
        setActiveKey={setActiveKey}
        eventKey={eventKey}
      />
      <Accordion.Collapse eventKey={eventKey.toString()}>
        <Card.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="mt-3"
          >
            {formFields.map((row) => (
              <Row key={row.rowId}>
                {row.cols.map((col) => (
                  <Form.Group
                    as={Col}
                    md={col.md}
                    controlId={col.name}
                    className="mb-4"
                  >
                    <FloatingLabel controlId={col.name} label={col.label}>
                      <Form.Control
                        required={col.required}
                        type={col.type}
                        name={col.name}
                        placeholder={col.label}
                        pattern={col.pattern}
                        minLength={col.minLength}
                        maxLength={col.maxLength}
                      />
                      <Form.Control.Feedback type="invalid">
                        {col.feedback}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                ))}
              </Row>
            ))}
            <hr className="mt-1 mb-4" />
            <div className="d-flex justify-content-center">
              <Button type="submit" className="fmc-button">
                {labelBtn}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};
