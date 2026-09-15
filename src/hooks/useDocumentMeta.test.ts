import { renderHook } from "@testing-library/react";
import { useDocumentMeta } from "./useDocumentMeta";

describe("useDocumentMeta", () => {
  afterEach(() => {
    document.title = "";
    document.head.querySelectorAll("meta").forEach((tag) => tag.remove());
  });

  it("sets the document title and Open Graph tags", () => {
    renderHook(() =>
      useDocumentMeta({
        title: "Mi entrada de blog",
        description: "Una descripción de prueba",
        image: "https://example.com/imagen.jpg",
      }),
    );

    expect(document.title).toBe("Mi entrada de blog");
    expect(
      document.head
        .querySelector('meta[name="description"]')
        ?.getAttribute("content"),
    ).toBe("Una descripción de prueba");
    expect(
      document.head
        .querySelector('meta[property="og:title"]')
        ?.getAttribute("content"),
    ).toBe("Mi entrada de blog");
    expect(
      document.head
        .querySelector('meta[property="og:image"]')
        ?.getAttribute("content"),
    ).toBe("https://example.com/imagen.jpg");
  });

  it("restores the previous title on unmount", () => {
    document.title = "Flormorado Café";

    const { unmount } = renderHook(() =>
      useDocumentMeta({ title: "Mi entrada de blog" }),
    );

    expect(document.title).toBe("Mi entrada de blog");

    unmount();

    expect(document.title).toBe("Flormorado Café");
  });

  it("does nothing when no values are provided", () => {
    document.title = "Flormorado Café";

    renderHook(() => useDocumentMeta({}));

    expect(document.title).toBe("Flormorado Café");
    expect(document.head.querySelector('meta[name="description"]')).toBeNull();
  });
});
