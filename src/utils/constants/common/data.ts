import { NavbarMenuItem } from "@/types/components";

export const URLS = {
  all: "*",
  home: "/",
  about: "/sobre-nosotros",
  origins: "/origenes",
  contact: "/contacto",
  blog: "/blog",
  store: "/tienda",
  categories: "/tienda/categorias",
};

export const NAVBAR_MENU_ITEMS: NavbarMenuItem[] = [
  { id: "home", title: "Inicio", url: URLS.home },
  {
    id: "about",
    title: "Conócenos",
    url: URLS.about,
    dropdown: true,
    subItems: [
      { id: "origen", title: "Cafes de origen", url: URLS.home },
      { id: "especialidad", title: "Cafes de especialidad", url: URLS.home },
      { id: "harina", title: "Harina de sagú", url: URLS.home },
      { id: "metodos", title: "Métodos de café", url: URLS.home },
    ],
  },
  { id: "purpose", title: "Nuestro propósito", url: URLS.origins },
  {
    id: "origins",
    title: "Orígenes",
    url: URLS.origins,
    dropdown: true,
    subItems: [{ id: "caficultores", title: "Caficultores", url: URLS.home }],
  },
  {
    id: "contact",
    title: "Contáctanos",
    url: URLS.contact,
    dropdown: true,
    subItems: [{ id: "faq", title: "Preguntas frecuentes", url: URLS.home }],
  },
  {
    id: "blog",
    title: "Blog",
    url: URLS.blog,
    dropdown: true,
    subItems: [
      {
        id: "cafe-especialidad",
        title: "Café de especialidad",
        url: URLS.home,
      },
      {
        id: "metodos-preparacion",
        title: "Métodos de preparación",
        url: URLS.home,
      },
      {
        id: "filtros-tela",
        title: "Filtros de tela, tu mejor opción",
        url: URLS.home,
      },
      { id: "usos-residuos", title: "Usos residuos del café", url: URLS.home },
      { id: "ritual-cafe", title: "Ritual de café", url: URLS.home },
      { id: "tips-esenciales", title: "Tips esenciales", url: URLS.home },
      { id: "tostion-media", title: "Tostión media", url: URLS.home },
    ],
  },
];
