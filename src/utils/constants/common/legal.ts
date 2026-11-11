// Identificación del responsable y vigencia de la Política de Tratamiento de
// Datos Personales. El Decreto 1377 de 2013 (art. 13, hoy compilado en el
// Decreto 1074 de 2015) exige publicar estos datos, así que viven en una sola
// constante y no repartidos por la página.
//
// Son datos legalmente exigibles: aquí no va un valor de relleno ni un
// "pendiente de confirmar". Si alguno cambia (otra razón social, otro
// domicilio), se actualiza junto con `DATA_POLICY` de abajo.

export const DATA_CONTROLLER = {
  brand: "Flormorado Café",
  // El responsable es una persona natural comerciante, no una sociedad.
  legalName: "Denys Yohana Andrade Ortiz",
  taxIdLabel: "NIT",
  taxId: "1032452811-3",
  city: "Bogotá D.C.",
  address: "Calle 10A # 72C-88",
  email: "info@flormoradocafe.com",
  phoneLabel: "+57 313 231 60 80",
  phoneHref: "tel:3132316080",
  whatsappHref: "https://wa.me/573132316080",
  site: "flormoradocafe.com",
  // A quién le llega una petición, consulta o reclamo sobre datos personales.
  // La ley pide señalar un área, no una persona concreta.
  privacyContact: "Atención al Cliente de Flormorado Café",
} as const;

export const DATA_POLICY = {
  version: "1.0",
  effectiveDate: "11 de noviembre de 2026",
} as const;

// Términos y condiciones (FMC-0029). Van aparte de la política porque son otra
// norma: el Estatuto del Consumidor, no el habeas data. Su versión también
// viaja con cada pedido, así que subirla al reescribirlos no es contabilidad —
// es lo que permite saber qué condiciones aceptó cada cliente.
export const TERMS = {
  version: "1.0",
  effectiveDate: "11 de noviembre de 2026",
} as const;

// El artículo 50 de la Ley 1480 obliga a informar el plazo de entrega antes de
// cerrar la compra; si no se informa, la ley impone 30 días calendario. Debe
// coincidir con DELIVERY_WINDOW del backend
// (flormorado-cafe-backend-orders/src/utils/constants/orders.ts), que lo pone
// en el correo de confirmación, y con lo que digan los términos publicados.
export const DELIVERY_WINDOW = "2 a 5 días hábiles";

// Enlace que el parágrafo del artículo 50 exige tener visible en la tienda.
export const CONSUMER_AUTHORITY = {
  name: "Superintendencia de Industria y Comercio",
  url: "https://www.sic.gov.co",
} as const;
