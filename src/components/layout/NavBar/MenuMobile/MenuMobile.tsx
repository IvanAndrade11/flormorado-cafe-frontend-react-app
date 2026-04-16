import "./MenuMobile.scss";

import React from "react";
import { Accordion, Nav } from "react-bootstrap";
import { NavbarMenuItem } from "@/types/components";
import { icons } from "@/utils/constants";

export const MenuMobile: React.FC<{
  item: NavbarMenuItem;
  redirect: (url: string) => void;
}> = ({ item, redirect }) => {
  return (
    <Accordion key={item.id}>
      <Accordion.Item eventKey={item.title}>
        <Accordion.Header className="fmc-navbar-accordion-mobile">
          <span onClick={() => redirect(item.url)}>
            <img
              src={icons.GrainCoffee}
              alt="Grano de Café Flormorado"
              width="17"
              className="d-inline-block align-top mx-2"
            />
            {item.title}
          </span>
        </Accordion.Header>
        <Accordion.Body style={{ padding: "0rem 1.5rem !important" }}>
          {item.subItems?.map((subItem) => (
            <Nav.Link
              key={subItem.id}
              onClick={() => redirect(subItem.url)}
              className="fmc-navbar-link nav-link mx-2 text-center"
            >
              {subItem.title}
            </Nav.Link>
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
