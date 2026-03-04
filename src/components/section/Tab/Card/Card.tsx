import React from "react";
import "./Card.scss";

import { ListItemWithIcon } from "@/components/ui";
import { ICard } from "@/types/components";

import Button from "react-bootstrap/Button";

export const Card: React.FC<ICard> = ({ title, textBtn, action, list }) => {
  return (
    <>
      <h3 className="text-center">{title}</h3>

      {list && (
        <ul className={"ul"}>
          {list.map((item) => (
            <ListItemWithIcon
              icon={item.icon}
              text={<div>{item.text}</div>}
              className={"lists"}
            />
          ))}
        </ul>
      )}

      {textBtn && (
        <Button
          type="button"
          className={`mt-auto fmc-button`}
          onClick={() => action()}
        >
          Botón
        </Button>
      )}
    </>
  );
};
