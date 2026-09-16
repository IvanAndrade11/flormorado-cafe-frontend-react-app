import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "@/app/providers/redux/store";
import { ICoffeeProduct } from "@/types/configCat";
import { setCart, setFlags } from "@/utils/constants/redux/sets";
import { LAST_ORDER_STORAGE_KEY } from "@/utils/constants/storage/data";
import { Checkout } from "./Checkout";

const catalogProduct: ICoffeeProduct = {
  id: "FLORMORADO500",
  stock: true,
  brand: "flormorado",
  name: "FLORMORADO CAFÉ 500 G",
  imageUrl: "",
  shortDescription: "",
  grinding: "Gruesa",
  roastOptions: "Media",
  variety: "Blend",
  size: "500",
  price: "45.000",
  shippingPrice: 7000,
  process: { benefit: "", drying: "", controlledFermentation: "" },
  productDescription: "",
  tags: [],
  category: "CAFÉ",
  type: "origin",
  origin: "somondoco",
};

// Como la guarda el configurador: id compuesto con la molienda.
const cartLine = (price = "45.000"): ICoffeeProduct => ({
  ...catalogProduct,
  id: "FLORMORADO500-gruesa",
  grinding: "gruesa",
  quantity: 2,
  price,
});

const response = (status: number, body: unknown) =>
  ({ status, json: async () => body }) as Response;

const fetchMock = jest.fn();

const renderCheckout = () =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    </Provider>,
  );

const type = (label: string, value: string) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value } });

const fillAndSubmit = () => {
  type("Nombre", "María");
  type("Apellido", "Restrepo");
  type("Correo electrónico", "maria@example.com");
  type("Teléfono", "3001234567");
  fireEvent.click(screen.getAllByRole("button", { name: "Continuar" })[0]);

  type("Ciudad / Municipio", "chia");
  type("Barrio", "Centro");
  type("Dirección", "Calle 12 # 4-56");
  fireEvent.click(screen.getAllByRole("button", { name: "Continuar" })[1]);

  type("Tipo de documento", "CC");
  type("Número de documento", "1012345678");
  type("Método de pago", "cash_on_delivery");
  fireEvent.click(screen.getByRole("button", { name: "Realizar pedido" }));
};

beforeEach(() => {
  fetchMock.mockReset();
  global.fetch = fetchMock;
  window.scrollTo = jest.fn();
  localStorage.clear();
  sessionStorage.clear();
  setCart([]);
  setFlags({});
});

describe("Checkout", () => {
  it("confirma el pedido, muestra el número y vacía el carrito", async () => {
    setCart([cartLine()]);
    fetchMock.mockResolvedValue(
      response(201, {
        orderId: "FM-20260916-001",
        total: 97000,
        preciosVerificados: true,
      }),
    );

    renderCheckout();
    fillAndSubmit();

    expect(await screen.findByText("FM-20260916-001")).toBeInTheDocument();
    expect(screen.getByText("maria@example.com")).toBeInTheDocument();
    expect(screen.getByText(/Pagas al recibir tu pedido/)).toBeInTheDocument();
    expect(screen.getByText("Chía", { exact: false })).toBeInTheDocument();

    expect(store.getState().main.session.cart).toEqual([]);
    expect(sessionStorage.getItem(LAST_ORDER_STORAGE_KEY)).toContain(
      "FM-20260916-001",
    );

    const sent = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sent.items).toEqual([
      {
        productId: "FLORMORADO500",
        quantity: 2,
        grinding: "Gruesa",
        unitPrice: 45000,
      },
    ]);
    expect(sent.declaredTotal).toBe(97000);
  });

  it("actualiza un carrito con precios viejos y pide confirmar de nuevo", async () => {
    setCart([cartLine("40.000")]);
    setFlags({ storeProducts: JSON.stringify({ products: [catalogProduct] }) });
    fetchMock.mockResolvedValue(
      response(409, {
        error: "carrito_desactualizado",
        fallas: [
          {
            code: "precio_desactualizado",
            productId: "FLORMORADO500",
            actual: 45000,
          },
        ],
      }),
    );

    renderCheckout();
    fillAndSubmit();

    expect(await screen.findByText(/cambió de precio/)).toBeInTheDocument();
    expect(store.getState().main.session.cart[0].price).toBe("45.000");
    expect(screen.queryByText(/Tu número de pedido/)).not.toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("conserva el carrito y explica qué hacer si el servicio no responde", async () => {
    jest.useFakeTimers();
    try {
      setCart([cartLine()]);
      fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));

      renderCheckout();
      fillAndSubmit();

      expect(
        screen.getByRole("button", { name: /Enviando pedido/ }),
      ).toBeDisabled();

      await act(async () => {
        await jest.advanceTimersByTimeAsync(5000);
      });

      expect(
        screen.getByText(/No pudimos confirmar tu pedido/),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Realizar pedido" }),
      ).toBeEnabled();
      expect(fetchMock).toHaveBeenCalledTimes(3);
      expect(store.getState().main.session.cart).toHaveLength(1);
    } finally {
      jest.useRealTimers();
    }
  });

  it("sigue mostrando la confirmación si el cliente recarga la página", () => {
    sessionStorage.setItem(
      LAST_ORDER_STORAGE_KEY,
      JSON.stringify({
        orderId: "FM-20260916-002",
        email: "maria@example.com",
        paymentMethod: "bre_b",
        breKey: "@maria",
        items: [],
        subtotal: 0,
        shipping: 0,
        total: 0,
        delivery: {
          address: "Calle 12 # 4-56",
          neighborhood: "Centro",
          city: "Chía",
        },
      }),
    );

    renderCheckout();

    expect(screen.getByText("FM-20260916-002")).toBeInTheDocument();
    expect(screen.getByText("@maria")).toBeInTheDocument();
  });

  it("invita a ir a la tienda cuando el carrito está vacío", () => {
    renderCheckout();

    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Ir a la tienda" }),
    ).toBeInTheDocument();
  });
});
