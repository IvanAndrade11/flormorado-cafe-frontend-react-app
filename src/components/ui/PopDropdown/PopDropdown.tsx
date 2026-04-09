import "./PopDropdown.scss";
import React, { useState } from "react";

import { OverlayTrigger, Popover, ListGroup, Nav } from "react-bootstrap";
import { NavbarMenuItem } from "@/types/components";

export const PopDropdown: React.FC<{
  item: NavbarMenuItem;
  redirect: (url: string) => void;
}> = ({ item, redirect }) => {
  const [hoveredDropdown, setHoveredDropdown] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const { id, title, url, subItems } = item;

  const popDropdown = (
    <Popover
      id="popover-basic"
      onPointerEnter={() => setHoveredDropdown(true)}
      onPointerLeave={() => setHoveredDropdown(false)}
    >
      <ListGroup>
        {subItems?.map((subItem) => (
          <ListGroup.Item
            className="fmc-dropdown-item py-3"
            action
            onClick={() => redirect(subItem.url)}
          >
            {subItem.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Popover>
  );

  return (
    <OverlayTrigger
      placement="bottom"
      show={hoveredDropdown || showDropdown}
      delay={{ show: 200, hide: 300 }}
      overlay={popDropdown}
      onToggle={(nextShow) => setShowDropdown(nextShow)}
    >
      <Nav.Link
        key={id}
        onClick={() => redirect(url)}
        className="fmc-navbar-link nav-link mx-2"
      >
        {title}
      </Nav.Link>
    </OverlayTrigger>
  );
};
