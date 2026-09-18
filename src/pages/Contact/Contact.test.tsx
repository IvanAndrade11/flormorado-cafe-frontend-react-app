import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Contact } from "./Contact";

const response = (status: number, body: unknown = {}) =>
  ({ status, json: async () => body }) as Response;

const fetchMock = jest.fn();

const renderContact = () =>
  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>,
  );

const fillForm = () => {
  fireEvent.change(screen.getByLabelText("Nombre"), {
    target: { value: "María" },
  });
  fireEvent.change(screen.getByLabelText("Correo electrónico"), {
    target: { value: "maria@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Asunto"), {
    target: { value: "producto" },
  });
  fireEvent.change(screen.getByLabelText("Mensaje"), {
    target: { value: "¿Este café es apto para prensa francesa?" },
  });
};

beforeEach(() => {
  fetchMock.mockReset();
  global.fetch = fetchMock;
});

describe("Contact", () => {
  it("envía el mensaje y muestra la confirmación", async () => {
    fetchMock.mockResolvedValue(response(201));

    renderContact();
    fillForm();
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    expect(await screen.findByText(/Recibimos tu mensaje/)).toBeInTheDocument();

    const sent = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sent).toEqual({
      name: "María",
      email: "maria@example.com",
      subject: "producto",
      message: "¿Este café es apto para prensa francesa?",
    });
  });

  it("no envía el formulario si faltan campos requeridos", () => {
    renderContact();

    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("avisa cuando el servicio no responde", async () => {
    jest.useFakeTimers();
    try {
      fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));

      renderContact();
      fillForm();
      fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

      await act(async () => {
        await jest.advanceTimersByTimeAsync(5000);
      });

      expect(
        screen.getByText(/No pudimos enviar tu mensaje/),
      ).toBeInTheDocument();
      expect(fetchMock).toHaveBeenCalledTimes(3);
    } finally {
      jest.useRealTimers();
    }
  });
});
