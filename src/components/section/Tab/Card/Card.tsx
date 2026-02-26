import React from "react";
import "./Card.scss";

import { Button, ListItemWithIcon, Title } from "@/components/ui";
import { icons } from "@/utils/constants";

interface ICard {
  title: string;
  textBtn: string | boolean;
  action: () => any;
  list: {
    icon: any;
    text: string;
  }[];
}

export const Card: React.FC<ICard> = ({ title, textBtn, action, list }) => {
  return (
    <>
      <Title message={title} className={"title"} />

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
          label={"Botón"}
          data-testid={"button"}
          className={`mt-auto btnSubmit`}
          onClick={() => action()}
        ></Button>
      )}
    </>
  );
};
