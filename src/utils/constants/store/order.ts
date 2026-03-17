import { OrderId } from "@/types/store";
import { ICoffeeProduct } from "@/types/configCat";

/**
 * Convierte "35.000" o "240.000" a número 35000 / 240000.
 * También tolera "35.000,50" -> 35000.50
 */
const parseCOP = (value: string): number => {
  if (!value) return 0;
  // 1) quita separadores de miles "."; 2) cambia "," decimal por "."
  const normalized = value.replace(/\./g, "").replace(",", ".");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
};

/**
 * Normaliza texto para comparación por nombre
 * - Usa locale 'es' con sensitivity 'base' (ignora tildes/diacríticos)
 * - fallback: toLocaleLowerCase('es')
 */
const compareStringsEs = (a: string, b: string) =>
  a.localeCompare(b, "es", { sensitivity: "base" });

/**
 * Obtiene un timestamp comparable para "older/newer".
 * Prioridad: createdAt -> Date.parse -> number -> orden original (idx)
 */
const getTimeValue = (p: ICoffeeProduct, originalIndex: number): number => {
  const c = p.createdAt;
  if (c instanceof Date) return c.getTime();
  if (typeof c === "number") return c;
  if (typeof c === "string") {
    const t = Date.parse(c);
    if (!Number.isNaN(t)) return t;
  }
  // Fallback: usamos el índice original como “tiempo”
  return originalIndex;
};

/**
 * Ordena productos según id de ordenamiento, sin mutar el original.
 */
export const orderProducts = (
  id: OrderId,
  products: ICoffeeProduct[],
): ICoffeeProduct[] => {
  // Decorate -> Sort -> Undecorate (patrón Schwartzian)
  const decorated = products.map((p, idx) => ({
    p,
    idx,
    priceNum: parseCOP(p.price),
    nameKey: p.name ?? "",
    time: getTimeValue(p, idx),
  }));

  switch (id) {
    case "priceMayus": {
      // Mayor precio primero (desc)
      decorated.sort((a, b) => b.priceNum - a.priceNum || a.idx - b.idx);
      break;
    }
    case "priceMinus": {
      // Menor precio primero (asc)
      decorated.sort((a, b) => a.priceNum - b.priceNum || a.idx - b.idx);
      break;
    }
    case "nameAscendant": {
      // A → Z (asc), insensible a acentos/mayúsculas
      decorated.sort((a, b) => {
        const c = compareStringsEs(a.nameKey, b.nameKey);
        return c !== 0 ? c : a.idx - b.idx;
      });
      break;
    }
    case "nameDescendant": {
      // Z → A (desc)
      decorated.sort((a, b) => {
        const c = compareStringsEs(b.nameKey, a.nameKey);
        return c !== 0 ? c : a.idx - b.idx;
      });
      break;
    }
    case "newer": {
      // Más recientes primero: mayor timestamp → primero
      decorated.sort((a, b) => b.time - a.time || a.idx - b.idx);
      break;
    }
    case "older": {
      // Más antiguos primero: menor timestamp → primero
      decorated.sort((a, b) => a.time - b.time || a.idx - b.idx);
      break;
    }
    default:
      // Si llega un id desconocido, retorna sin cambios
      return products.slice();
  }

  return decorated.map((d) => d.p);
};
