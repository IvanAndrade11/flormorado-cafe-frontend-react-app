import "./NavbarStore.scss";

import { useState } from "react";
import { INavbarStore } from "@/types/components";
import { FilterGroupId } from "@/types/store";
import { CAFE_FILTERS, icons, STORE_ORDER_BY } from "@/utils/constants";
import {
  Button,
  Container,
  Nav,
  Offcanvas,
  Navbar,
  NavDropdown,
  Accordion,
  Form,
} from "react-bootstrap";

const groupsWithSelection = (selected: INavbarStore["selected"]) =>
  new Set(
    (Object.keys(selected) as FilterGroupId[]).filter(
      (group) => selected[group].size > 0,
    ),
  );

export const NavbarStore: React.FC<INavbarStore> = ({
  orderBy,
  filter,
  clearFilters,
  selected,
}) => {
  const [show, setShow] = useState(false);
  const [openGroups, setOpenGroups] = useState<Set<FilterGroupId>>(
    () => new Set(),
  );

  const handleClose = () => setShow(false);
  const toggleShow = () =>
    setShow((s) => {
      const opening = !s;
      if (opening) setOpenGroups(groupsWithSelection(selected));
      return opening;
    });

  return (
    <Navbar expand="false">
      <Container fluid>
        <Navbar.Brand>
          <Button
            variant="link"
            onClick={toggleShow}
            className="fmc-navbar-store-show"
          >
            <>
              <img
                src={icons.FilterPurple}
                alt="Tienda - Flormorado Café"
                width="25"
                className="d-inline-block align-top me-2"
              />
              <span className="fmc-store-filter-text">Filtros</span>
            </>
          </Button>
        </Navbar.Brand>

        <Navbar.Offcanvas
          id={`navbar-filter-store`}
          aria-labelledby={`navbar-label-filter-store`}
          placement="start"
          show={show}
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`navbar-label-filter-store`}>
              <h1 className="fmc-offcanvas-title">Filtros</h1>
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {CAFE_FILTERS.map((item) => {
                const groupId = item.id as FilterGroupId;
                return (
                  <Accordion
                    key={item.id}
                    activeKey={openGroups.has(groupId) ? item.id : null}
                    onSelect={(key) =>
                      setOpenGroups((prev) => {
                        const next = new Set(prev);
                        if (key) next.add(groupId);
                        else next.delete(groupId);
                        return next;
                      })
                    }
                    className="my-2"
                  >
                    <Accordion.Item eventKey={item.id}>
                      <Accordion.Header>{item.value}</Accordion.Header>

                      {item.options.map(({ id, value }) => (
                        <Accordion.Body
                          key={id}
                          className="fmc-store-offcanvas-accordion"
                        >
                          <Form.Check
                            className="me-2"
                            aria-label={value}
                            checked={selected[groupId].has(id)}
                            onChange={() => {
                              filter(`${item.id}:${id}`);
                            }}
                          />
                          <span>{value}</span>
                        </Accordion.Body>
                      ))}
                    </Accordion.Item>
                  </Accordion>
                );
              })}
            </Nav>
          </Offcanvas.Body>

          <div className="d-flex gap-2 mb-5 mx-3">
            <Button variant="outline-secondary" onClick={clearFilters}>
              Limpiar
            </Button>
            <Button onClick={handleClose} className="fmc-button flex-grow-1">
              Aplicar Filtros
            </Button>
          </div>
        </Navbar.Offcanvas>

        <NavDropdown
          className="fmc-store-filter-text"
          title="Ordenar por"
          id="nav-dropdown"
          drop="down"
          align="end"
        >
          {STORE_ORDER_BY.map(({ id, value }) => (
            <NavDropdown.Item
              key={id}
              className="fmc-store-dropdown-item"
              onClick={() => orderBy(id)}
            >
              {value}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </Container>
    </Navbar>
  );
};
