import { NavbarMenuItem } from "@/types/components";

export const URLS = {
  all: "*",
  home: "/",
  purpose: "/nuestro-proposito",
  origins: "/origenes",
  contact: "/contacto",
  blog: "/blog",
  store: "/tienda",
  categories: "/tienda/categorias",
  checkout: "/checkout",
  terms: "/terminos-y-condiciones",
  privacy: "/politica-de-datos",
  panel: "/panel",
};

// El inicio abre con un video a todo el ancho: ahí el navbar se superpone y va
// transparente, para no partir la imagen con una franja beige. En el resto del
// sitio va sólido y dentro del flujo.
export const OVERLAY_NAVBAR_URLS: string[] = [URLS.home];

export const NAVBAR_MENU_ITEMS: NavbarMenuItem[] = [
  { id: "home", title: "Inicio", url: URLS.home },
  {
    id: "purpose",
    title: "Nuestro propósito",
    url: URLS.purpose,
    dropdown: true,
    subItems: [
      {
        id: "que-hacemos",
        title: "¿Qué hacemos?",
        url: `${URLS.purpose}#que-hacemos`,
      },
      {
        id: "nuestra-historia",
        title: "¿Cuál es nuestra historia?",
        url: `${URLS.purpose}#nuestra-historia`,
      },
      {
        id: "nuestro-impacto",
        title: "¿Como buscamos impactar?",
        url: `${URLS.purpose}#nuestro-impacto`,
      },
      {
        id: "nuestro-proposito",
        title: "¿Cuál es nuestro propósito?",
        url: `${URLS.purpose}#nuestro-proposito`,
      },
      {
        id: "botanic",
        title: "FLORMORADO Botánico ",
        url: `${URLS.purpose}#botanic`,
      },
    ],
  },
  {
    id: "origins",
    title: "Orígenes",
    url: URLS.origins,
    dropdown: true,
    subItems: [
      {
        id: "originCoffees",
        title: "Cafés de origen",
        url: `${URLS.origins}#cafes-de-origen`,
      },
      { id: "sagu", title: "Harina de sagú", url: URLS.origins },
      { id: "methods", title: "Métodos de preparación", url: URLS.origins },
    ],
  },
  {
    id: "contact",
    title: "Contáctanos",
    url: URLS.contact,
    dropdown: true,
    subItems: [
      {
        id: "faq",
        title: "Preguntas frecuentes",
        url: `${URLS.contact}#preguntas-frecuentes`,
      },
    ],
  },
  {
    id: "blog",
    title: "Blog",
    url: URLS.blog,
    dropdown: true,
    subItems: [],
  },
];
