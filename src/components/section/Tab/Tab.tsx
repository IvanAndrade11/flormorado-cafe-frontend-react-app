import React, { useState } from "react";
import "./Tab.scss";

import { TAB_ITEMS } from "@/types/components/TAB_ITEMS";

import { Card } from "./Card/Card";

export const Tab: React.FC = () => {
  const [tabActive, setTabActive] = useState(TAB_ITEMS[0]);

  const handleTabClick = (
    id: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setTabActive(TAB_ITEMS[id]);
    if (window.innerWidth <= 991) {
      event.currentTarget.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  return (
    <section id="tab" className="tab-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 mb-0">
            <h1 className={`text-center mb-4 title`}>
              <span>Titulo de la sección</span>
            </h1>
          </div>
          <div className="col-xxl-10 col-lg-12 col-md-12">
            <div className={"tab-container"}>
              <div className={"tabs"}>
                {TAB_ITEMS.map((tab) => (
                  <button
                    key={tab.id}
                    className={`${"tab-button"} ${tabActive.id === tab.id ? "active" : ""}`}
                    onClick={(e) => handleTabClick(tab.id, e)}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
              <div className={"tab-content"}>
                <div className={"image-container"}>
                  <img
                    src={tabActive.image}
                    alt={tabActive.title}
                    className={"image"}
                  />
                </div>
                <div className={"text-container"}>
                  <div className={"tab-tab-content"}>
                    <Card {...tabActive.content} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
