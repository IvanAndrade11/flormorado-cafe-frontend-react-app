import { icons } from "../media/icons";
import { images } from "../media/images";

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

export const NAVBAR_MENU_ITEMS = [
  { title: "Inicio", url: URLS.home },
  { title: "Conócenos", url: URLS.about },
  { title: "Orígenes", url: URLS.origins },
  { title: "Contáctanos", url: URLS.contact },
  { title: "Blog", url: URLS.blog },
];

export const TAB_ITEMS = [
  {
    id: 0,
    title: "Pestaña 1",
    image: images.GirlCollecting,
    color: "#EFFAFE",
    content: {
      title: "Titulo de la card 1",
      textBtn: "Boton",
      action: () => console.log("Clic"),
      list: [
        {
          icon: icons.Phone,
          text: "Texto",
        },
        {
          icon: icons.Phone,
          text: "Texto",
        },
      ],
    },
  },
  {
    id: 1,
    title: "Pestaña 2",
    image: images.GirlStanding,
    color: "#F2FDF6",
    content: {
      title: "Titulo de la card 2",
      textBtn: "Boton",
      action: () => console.log("Clic"),
      list: [
        {
          icon: icons.Facebook,
          text: "Texto",
        },
        {
          icon: icons.Facebook,
          text: "Texto",
        },
      ],
    },
  },
  {
    id: 2,
    title: "Pestaña 3",
    image: images.LogoFondoBeige,
    color: "#EFFAFE",
    content: {
      title: "Titulo de la card 3",
      textBtn: "Boton",
      action: () => console.log("Clic"),
      list: [
        {
          icon: icons.Phone,
          text: "Texto",
        },
        {
          icon: icons.Phone,
          text: "Texto",
        },
      ],
    },
  },
  {
    id: 3,
    title: "Pestaña 4",
    image: images.LogoNombreFondoBeige,
    color: "#F2FDF6",
    content: {
      title: "Titulo de la card 4",
      textBtn: "Boton",
      action: () => console.log("Clic"),
      list: [
        {
          icon: icons.Instagram,
          text: "Texto",
        },
        {
          icon: icons.Instagram,
          text: "Texto",
        },
      ],
    },
  },
];

export const CAROUSEL_ITEMS = [
  {
    icon: icons.Instagram,
    content: "texto",
  },
  {
    icon: icons.Instagram,
    content: "texto",
  },
  {
    icon: icons.Instagram,
    content: "texto",
  },
  {
    icon: icons.Instagram,
    content: "texto",
  },
  {
    icon: icons.Instagram,
    content: "texto",
  },
  {
    icon: icons.Instagram,
    content: "texto",
  },
  {
    icon: icons.Instagram,
    content: "texto",
  },
];
