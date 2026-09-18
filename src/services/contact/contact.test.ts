import { IContactPayload } from "@/types/contact";
import { submitContact } from "./contact";

const payload: IContactPayload = {
  name: "María",
  email: "maria@example.com",
  subject: "producto",
  message: "¿Este café es apto para prensa francesa?",
};

const json = (status: number, body: unknown = {}) =>
  ({
    status,
    json: async () => body,
  }) as Response;

describe("submitContact", () => {
  const noWait = () => Promise.resolve();

  it("envía el mensaje al endpoint de contacto", async () => {
    const fetchImpl = jest.fn().mockResolvedValue(json(201));

    const result = await submitContact(payload, {
      fetchImpl,
      sleep: noWait,
      baseUrl: "https://api.test",
    });

    expect(result).toEqual({ kind: "sent" });
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://api.test/contact",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(payload),
      }),
    );
  });

  it("reintenta ante un error del servidor", async () => {
    const fetchImpl = jest
      .fn()
      .mockResolvedValueOnce(json(503))
      .mockResolvedValueOnce(json(200));

    const result = await submitContact(payload, { fetchImpl, sleep: noWait });

    expect(result).toEqual({ kind: "sent" });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it("reintenta si la red falla", async () => {
    const fetchImpl = jest
      .fn()
      .mockRejectedValueOnce(new TypeError("Failed to fetch"))
      .mockResolvedValueOnce(json(200));

    const result = await submitContact(payload, { fetchImpl, sleep: noWait });

    expect(result).toEqual({ kind: "sent" });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it("se rinde después de tres intentos fallidos", async () => {
    const fetchImpl = jest.fn().mockRejectedValue(new TypeError("offline"));
    const sleep = jest.fn(noWait);

    const result = await submitContact(payload, { fetchImpl, sleep });

    expect(result).toEqual({ kind: "unavailable" });
    expect(fetchImpl).toHaveBeenCalledTimes(3);
    expect(sleep).toHaveBeenCalledTimes(2);
  });

  it("no reintenta datos inválidos", async () => {
    const fetchImpl = jest.fn().mockResolvedValue(json(400));

    const result = await submitContact(payload, { fetchImpl, sleep: noWait });

    expect(result).toEqual({ kind: "invalid" });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });
});
