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
