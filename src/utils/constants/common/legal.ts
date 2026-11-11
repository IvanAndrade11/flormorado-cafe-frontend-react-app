// Identificación del responsable y vigencia de la Política de Tratamiento de
// Datos Personales. El Decreto 1377 de 2013 (art. 13, hoy compilado en el
// Decreto 1074 de 2015) exige publicar estos datos, así que viven en una sola
// constante y no repartidos por la página.
//
// `isDataControllerComplete()` existe para que un dato a medias no se publique
// como definitivo: mientras algún valor contenga "PENDIENTE", la página muestra
// sola un aviso de borrador.

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

/** Un dato sin confirmar no puede publicarse como si fuera definitivo. */
export const isDataControllerComplete = (): boolean =>
  !Object.values(DATA_CONTROLLER).some((value) => value.includes("PENDIENTE"));
