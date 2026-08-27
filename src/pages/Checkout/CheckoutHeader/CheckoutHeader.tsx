import React from "react";
import { Card, Image } from "react-bootstrap";
import { icons } from "@/utils/constants";

export const CheckoutHeader: React.FC<{
  title: string;
  validated: boolean;
  setActiveKey: (key: string) => void;
  eventKey: string;
}> = ({ title, validated, setActiveKey, eventKey }) => {
  return (
    <Card.Header className="fmc-checkout-card-header d-flex justify-content-between">
      <>
        <div>
          {title}
          {validated && (
            <Image
              src={icons.Success}
              width={20}
              alt="Success"
              className="ms-2"
            />
          )}
        </div>
        <div>
          {validated && (
            <span
              className="ms-2 fs-5"
              onClick={() => setActiveKey(eventKey)}
              style={{ cursor: "pointer" }}
            >
              Editar
            </span>
          )}
        </div>
      </>
    </Card.Header>
  );
};
