import { OrderId } from "@/types/store";

export const STORE_ORDER_BY: { id: OrderId; value: string }[] = [
  {
    id: "priceMayus",
    value: "Mayor precio",
  },
  {
    id: "priceMinus",
    value: "Menor precio",
  },
  {
    id: "nameDescendant",
    value: "Nombre descendente",
  },
  {
    id: "nameAscendant",
    value: "Nombre ascendente",
  },
  {
    id: "older",
    value: "Más antiguos",
  },
  {
    id: "newer",
    value: "Más recientes",
  },
];

export const CAFE_FILTERS = [
  {
    id: "type",
    value: "Tipo de café",
    options: [
      {
        id: "specialty",
        value: "Especialidad",
      },
      {
        id: "origin",
        value: "Origen",
      },
    ],
  },
  {
    id: "brand",
    value: "Marca",
    options: [
      {
        id: "flormorado",
        value: "Flormorado",
      },
      {
        id: "oca",
        value: "Oca",
      },
    ],
  },
  {
    id: "size",
    value: "Tamaño",
    options: [
      {
        id: "250",
        value: "250 g",
      },
      {
        id: "340",
        value: "340 g",
      },
      {
        id: "500",
        value: "500 g",
      },
      {
        id: "3000",
        value: "3000 g",
      },
    ],
  },
  {
    id: "origin",
    value: "Origen",
    options: [
      {
        id: "somondoco",
        value: "Somondoco",
      },
    ],
  },
  {
    id: "variety",
    value: "Variedad",
    options: [
      {
        id: "Castillo",
        value: "Castillo",
      },
      {
        id: "Arábico",
        value: "Arábico",
      },
      {
        id: "Caturra",
        value: "Caturra",
      },
      {
        id: "Blend",
        value: "Blend",
      },
      {
        id: "Otros",
        value: "Otros",
      },
    ],
  },
  // {
  //   id: "profile",
  //   value: "Perfil de taza",
  //   options: [
  //     {
  //       id: "balanced",
  //       value: "Balanceado",
  //     },
  //     {
  //       id: "strong",
  //       value: "Fuerte",
  //     },
  //     {
  //       id: "soft",
  //       value: "Suave",
  //     },
  //   ],
  // },
];

export const GRINDING_OPTIONS = [
  {
    id: "fina",
    value: "Fina",
  },
  {
    id: "media",
    value: "Media",
  },
  {
    id: "gruesa",
    value: "Gruesa",
  },
  {
    id: "grano",
    value: "En grano",
  },
];
