import { ICoffeeProduct } from "@/types/configCat";
import { IOrderPayload } from "@/types/orders";
import { WHATSAPP_MARKETING_CONSENT } from "@/utils/constants/common/forms";
import {
  buildConfirmation,
  buildOrderPayload,
  createIdempotencyKey,
  submitOrder,
} from "./orders";

const product = (overrides: Partial<ICoffeeProduct> = {}): ICoffeeProduct => ({
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
  ...overrides,
});

const cart: ICoffeeProduct[] = [
  { ...product(), id: "FLORMORADO500-gruesa", grinding: "gruesa", quantity: 2 },
];

const form = {
  name: " María ",
  surname: "Restrepo",
  email: "maria@example.com",
  phone: "3001234567",
  saveInfo: false,
  whtsppOptIn: true,
  city: "chia",
  neighborhood: "Centro",
  address: "Calle 12 # 4-56",
  additionalInfo: "",
  documentType: "CC",
  documentNumber: "1012345678",
  paymentMethod: "cash_on_delivery",
  notifyByWhatsApp: false,
};

const UUID_V4 =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

describe("buildOrderPayload", () => {
  it("traduce el checkout al contrato del backend", () => {
    const payload = buildOrderPayload(form, cart, "llave");

    expect(payload).toEqual({
      idempotencyKey: "llave",
      contact: {
        name: "María",
        surname: "Restrepo",
        email: "maria@example.com",
        phone: "3001234567",
        whatsappOptIn: true,
        marketingConsentVersion: WHATSAPP_MARKETING_CONSENT.version,
      },
      delivery: {
        city: "chia",
        neighborhood: "Centro",
        address: "Calle 12 # 4-56",
      },
      payment: {
        method: "cash_on_delivery",
        documentType: "CC",
        documentNumber: "1012345678",
        notifyByWhatsApp: false,
      },
      items: [
        {
          productId: "FLORMORADO500",
          quantity: 2,
          grinding: "Gruesa",
          unitPrice: 45000,
        },
      ],
      declaredTotal: 97000,
    });
  });

  // Si mandáramos el id del carrito, el backend respondería que el producto no
  // existe en todos los pedidos.
  it("envía el id del catálogo, no el id compuesto del carrito", () => {
    const payload = buildOrderPayload(form, cart, "llave");

    expect(payload.items[0].productId).toBe("FLORMORADO500");
  });

  it("incluye la llave BRE-B solo cuando ese es el método", () => {
    const breB = buildOrderPayload(
      { ...form, paymentMethod: "bre_b", breKey: "@maria" },
      cart,
      "llave",
    );
    expect(breB.payment).toEqual(
      expect.objectContaining({ method: "bre_b", breKey: "@maria" }),
    );

    const cash = buildOrderPayload(
      { ...form, paymentMethod: "cash_on_delivery", breKey: "@vieja" },
      cart,
      "llave",
    );
    expect(cash.payment).not.toHaveProperty("breKey");
  });

  it("manda las indicaciones adicionales solo si hay algo escrito", () => {
    const withInfo = buildOrderPayload(
      { ...form, additionalInfo: "Apto 301" },
      cart,
      "llave",
    );

    expect(withInfo.delivery.additionalInfo).toBe("Apto 301");
    expect(buildOrderPayload(form, cart, "llave").delivery).not.toHaveProperty(
      "additionalInfo",
    );
  });
});

describe("buildConfirmation", () => {
  it("resume el pedido con nombres legibles", () => {
    const payload = buildOrderPayload(
      { ...form, additionalInfo: "Apto 301" },
      cart,
      "llave",
    );

    const confirmation = buildConfirmation(payload, cart, {
      kind: "created",
      orderId: "FM-20260916-001",
      total: 97000,
      alreadyExisted: false,
    });

    expect(confirmation).toEqual(
      expect.objectContaining({
        orderId: "FM-20260916-001",
        email: "maria@example.com",
        paymentMethod: "cash_on_delivery",
        subtotal: 90000,
        shipping: 7000,
        total: 97000,
        delivery: {
          address: "Calle 12 # 4-56",
          neighborhood: "Centro",
          city: "Chía",
          additionalInfo: "Apto 301",
        },
      }),
    );
    expect(confirmation.items).toEqual([
      {
        key: "FLORMORADO500-gruesa",
        name: "FLORMORADO CAFÉ 500 G",
        grinding: "Gruesa",
        quantity: 2,
        lineTotal: 90000,
      },
    ]);
  });
});

describe("buildConfirmation con BRE-B", () => {
  it("lleva a la confirmación las instrucciones que dio el backend", () => {
    const payload = buildOrderPayload(
      { ...form, paymentMethod: "bre_b", breKey: "@maria" },
      cart,
      "llave",
    );

    const confirmation = buildConfirmation(payload, cart, {
      kind: "created",
      orderId: "FM-20260916-002",
      total: 97000,
      alreadyExisted: false,
      breB: { key: "@flormorado", holder: "Flormorado Café" },
    });

    expect(confirmation.breKey).toBe("@maria");
    expect(confirmation.breB).toEqual({
      key: "@flormorado",
      holder: "Flormorado Café",
    });
  });
});

describe("createIdempotencyKey", () => {
  it("genera un UUID v4", () => {
    expect(createIdempotencyKey()).toMatch(UUID_V4);
  });

  it("genera un UUID v4 válido aunque el navegador no tenga randomUUID", () => {
    const original = crypto.randomUUID;
    Object.defineProperty(crypto, "randomUUID", {
      value: undefined,
      configurable: true,
    });

    try {
      expect(createIdempotencyKey()).toMatch(UUID_V4);
    } finally {
      Object.defineProperty(crypto, "randomUUID", {
        value: original,
        configurable: true,
      });
    }
  });
});

const json = (status: number, body: unknown) =>
  ({
    status,
    json: async () => body,
  }) as Response;

describe("submitOrder", () => {
  const payload = buildOrderPayload(form, cart, "llave") as IOrderPayload;
  const noWait = () => Promise.resolve();

  it("devuelve el pedido creado", async () => {
    const fetchImpl = jest
      .fn()
      .mockResolvedValue(
        json(201, { orderId: "FM-1", total: 97000, preciosVerificados: true }),
      );

    const result = await submitOrder(payload, {
      fetchImpl,
      sleep: noWait,
      baseUrl: "https://api.test",
    });

    expect(result).toEqual({
      kind: "created",
      orderId: "FM-1",
      total: 97000,
      alreadyExisted: false,
    });
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://api.test/orders",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("traduce las instrucciones de pago BRE-B de la respuesta", async () => {
    const fetchImpl = jest.fn().mockResolvedValue(
      json(201, {
        orderId: "FM-2",
        total: 97000,
        instruccionesPago: { llave: "@flormorado", titular: "Flormorado Café" },
      }),
    );

    const result = await submitOrder(payload, { fetchImpl, sleep: noWait });

    expect(result).toEqual(
      expect.objectContaining({
        kind: "created",
        breB: { key: "@flormorado", holder: "Flormorado Café" },
      }),
    );
  });

  it("reintenta con la misma llave si la red falla, y reconoce el pedido que ya existía", async () => {
    const fetchImpl = jest
      .fn()
      .mockRejectedValueOnce(new TypeError("Failed to fetch"))
      .mockResolvedValueOnce(
        json(200, { orderId: "FM-1", total: 97000, yaExistia: true }),
      );

    const result = await submitOrder(payload, { fetchImpl, sleep: noWait });

    expect(result).toEqual(
      expect.objectContaining({ kind: "created", alreadyExisted: true }),
    );
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    const bodies = fetchImpl.mock.calls.map(
      ([, init]) => JSON.parse(init.body).idempotencyKey,
    );
    expect(bodies).toEqual(["llave", "llave"]);
  });

  it("reintenta ante un error del servidor", async () => {
    const fetchImpl = jest
      .fn()
      .mockResolvedValueOnce(json(503, {}))
      .mockResolvedValueOnce(json(201, { orderId: "FM-1", total: 97000 }));

    const result = await submitOrder(payload, { fetchImpl, sleep: noWait });

    expect(result.kind).toBe("created");
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it("se rinde después de tres intentos fallidos", async () => {
    const fetchImpl = jest.fn().mockRejectedValue(new TypeError("offline"));
    const sleep = jest.fn(noWait);

    const result = await submitOrder(payload, { fetchImpl, sleep });

    expect(result).toEqual({ kind: "unavailable" });
    expect(fetchImpl).toHaveBeenCalledTimes(3);
    expect(sleep).toHaveBeenCalledTimes(2);
  });

  it("no reintenta un carrito desactualizado y devuelve las fallas", async () => {
    const fallas = [
      {
        code: "precio_desactualizado",
        productId: "FLORMORADO500",
        actual: 50000,
      },
    ];
    const fetchImpl = jest.fn().mockResolvedValue(json(409, { fallas }));

    const result = await submitOrder(payload, { fetchImpl, sleep: noWait });

    expect(result).toEqual({ kind: "stale_cart", failures: fallas });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("no reintenta datos inválidos", async () => {
    const fetchImpl = jest.fn().mockResolvedValue(json(400, {}));

    const result = await submitOrder(payload, { fetchImpl, sleep: noWait });

    expect(result).toEqual({ kind: "invalid" });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });
});
