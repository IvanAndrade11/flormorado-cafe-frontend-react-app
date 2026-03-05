import "./Store.scss";

import React, { useEffect } from "react";
import store from "@/app/providers/redux/store";

import { Title } from "@/components/ui";

export const Store: React.FC = () => {
  const { categoryTitle } = store.getState().main.session;

  return (
    <div className="container mt-5">
      <Title title={categoryTitle} bold={true} />
    </div>
  );
};
