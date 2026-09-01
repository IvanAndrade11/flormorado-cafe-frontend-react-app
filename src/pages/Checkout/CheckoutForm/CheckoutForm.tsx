import React, { useState } from "react";
import {
  Accordion,
  Alert,
  Button,
  Card,
  Col,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { ICheckoutForm, IFormCols } from "@/types/components";
import { CheckoutHeader } from "../CheckoutHeader/CheckoutHeader";

export const CheckoutForm: React.FC<ICheckoutForm> = ({
  title,
  formFields,
  eventKey,
  setActiveKey,
  setForm,
  nextActiveKey,
  labelBtn,
  defaultValues,
}) => {
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState<Record<string, string | boolean>>(
    () => ({ ...defaultValues }),
  );

  const setFieldValue = (name: string, value: string | boolean) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  const isVisible = (col: IFormCols) => {
    const showOk =
      !col.showWhen || values[col.showWhen.field] === col.showWhen.equals;
    const hideOk =
      !col.hideWhen || values[col.hideWhen.field] !== col.hideWhen.equals;
    return showOk && hideOk;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.currentTarget.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const formValues = formFields.reduce(
      (acc, row) => {
        row.cols.forEach((col) => {
          if (col.type === "note" || !isVisible(col)) return;
          acc[col.name] =
            values[col.name] ?? (col.type === "checkbox" ? false : "");
        });
        return acc;
      },
      {} as Record<string, string | boolean>,
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
                {row.cols.map((col) => {
                  if (!isVisible(col)) return null;

                  if (col.type === "note") {
                    return (
                      <Col key={col.colId} md={col.md} className="mb-4">
                        <Alert variant="info" className="mb-0">
                          {col.label}
                        </Alert>
                      </Col>
                    );
                  }

                  if (col.type === "checkbox") {
                    return (
                      <Col key={col.colId} md={col.md} className="mb-4">
                        <Form.Check
                          type="checkbox"
                          id={col.name}
                          label={col.label}
                          checked={!!values[col.name]}
                          onChange={(e) =>
                            setFieldValue(col.name, e.target.checked)
                          }
                        />
                      </Col>
                    );
                  }

                  return (
                    <Form.Group
                      key={col.colId}
                      as={Col}
                      md={col.md}
                      controlId={col.name}
                      className="mb-4"
                    >
                      <FloatingLabel controlId={col.name} label={col.label}>
                        {col.type === "select" ? (
                          <Form.Select
                            required={col.required}
                            name={col.name}
                            value={(values[col.name] as string) ?? ""}
                            onChange={(e) =>
                              setFieldValue(col.name, e.target.value)
                            }
                          >
                            <option value="" disabled>
                              Selecciona una opción
                            </option>
                            {col.options?.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Form.Select>
                        ) : (
                          <Form.Control
                            required={col.required}
                            type={col.type}
                            name={col.name}
                            placeholder={col.label}
                            pattern={col.pattern}
                            minLength={col.minLength}
                            maxLength={col.maxLength}
                            value={(values[col.name] as string) ?? ""}
                            onChange={(e) =>
                              setFieldValue(col.name, e.target.value)
                            }
                          />
                        )}
                        <Form.Control.Feedback type="invalid">
                          {col.feedback}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                  );
                })}
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
