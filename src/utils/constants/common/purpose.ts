import {
  IPurposeCredit,
  IPurposeImage,
  IPurposeSection,
} from "@/types/components";

// Fuera de `media/images.ts`: el pie usa ese objeto y las ataría al chunk inicial.
import CoffeeGrains from "@/assets/images/illustrations/coffee_grains.svg";
import QueHacemos from "@/assets/images/purpose/que-hacemos.jpg";
import HarinaDeSagu from "@/assets/images/purpose/harina-de-sagu.jpg";
import NuestraHistoria from "@/assets/images/purpose/nuestra-historia.jpg";
import NuestroImpacto from "@/assets/images/purpose/nuestro-impacto.jpg";
import NuestroProposito from "@/assets/images/purpose/nuestro-proposito.jpg";

export const PURPOSE_HERO: IPurposeImage = {
  src: CoffeeGrains,
  alt: "Ilustración de una flor de café y granos en distintos estados de maduración",
};

export const PURPOSE_LEAD =
  "Conectamos lo mejor del campo colombiano con los amantes del buen café, " +
  "construyendo un puente directo, transparente y humano entre el origen y tu taza.";

export const PURPOSE_SECTIONS: IPurposeSection[] = [
  {
    id: "que-hacemos",
    question: "¿Qué hacemos?",
    paragraphs: [
      "Conectamos lo mejor del campo colombiano con tu mesa. FLORMORADO representa un origen que florece gracias a la diversidad y riqueza sensorial de los mejores cafés de regiones como Boyacá, Caldas y Tolima, junto con productos tradicionales como la harina de sagú.",
      "Somos un puente transparente y humano: no solo comercializamos, ponemos nombre, rostro e historia a cada cosecha. En la parte posterior de cada empaque de FLORMORADO encontrarás los datos del caficultor que hizo posible tu café y del agricultor que procesó tu sagú, para que el reconocimiento y el valor real se queden siempre en las manos de quien cultiva la tierra.",
    ],
    image: {
      src: QueHacemos,
      alt: "Mano de un caficultor sosteniendo cerezas de café recién recolectadas",
    },
    secondaryImage: {
      src: HarinaDeSagu,
      alt: "Planta de sagú, de cuya raíz se obtiene la harina",
    },
    highlightsLayout: "list",
    highlights: [
      {
        id: "visibilidad",
        title: "Damos visibilidad al caficultor local",
        description:
          "Conectamos directamente a los productores de nuestras regiones con el mercado nacional, poniendo nombre y rostro detrás de cada cosecha.",
      },
      {
        id: "comercio-justo",
        title: "Practicamos un comercio justo",
        description:
          "Retribuimos dignamente el esfuerzo del campo: pagamos precios justos y superiores por cosechas cultivadas con dedicación.",
      },
      {
        id: "cultura-cafetera",
        title: "Promovemos la cultura cafetera regional",
        description:
          "Celebramos la diversidad y la riqueza sensorial de tres joyas cafeteras de Colombia: Boyacá, Caldas y Tolima.",
      },
      {
        id: "mujer-rural",
        title: "Exaltamos el liderazgo de la mujer rural",
        description:
          "Reconocemos, visibilizamos y respaldamos el papel fundamental de las mujeres en la caficultura y en el desarrollo del agro.",
      },
      {
        id: "valor-compartido",
        title: "Creamos valor compartido",
        description:
          "Construimos una cadena sostenible donde cada actor —desde quien siembra y cosecha hasta quien tuesta y prepara— crece y se beneficia.",
      },
    ],
  },
  {
    id: "nuestra-historia",
    question: "¿Cuál es nuestra historia?",
    paragraphs: [
      "FLORMORADO nació de una semilla plantada con amor en tiempos de incertidumbre y del profundo convencimiento de que la tierra tiene un alma que merece ser honrada. Comenzamos cultivando en época de pandemia en una finca que, en su momento, no era cafetera y que hoy dio luz y vida a este proyecto.",
      "Hoy este sueño persiste en manos de dos hermanos que unieron fuerzas para tender un puente entre la tradición ancestral de Somondoco (Boyacá) y los amantes del buen café.",
      "Continuadores de una visión respetuosa y espiritual de la agricultura, entendimos que el campo merece una nueva mirada. FLORMORADO es el reflejo de ese legado: un homenaje al trabajo duro, a la sabiduría de los abuelos y a la huella de un hombre que —a través del conocimiento, el entendimiento y el amor— nos enseñó que un alimento cultivado con alma transforma la vida de quienes lo siembran y de quienes lo disfrutan.",
    ],
    quote: "Para nosotros, Denys e Iván, ¡el origen lo es todo!",
    image: {
      src: NuestraHistoria,
      alt: "Vista del Valle de Tenza desde el cerro de Somondoco, en Boyacá",
    },
  },
  {
    id: "nuestro-impacto",
    question: "¿Cómo buscamos impactar?",
    paragraphs: [
      "Nuestro impacto se mide en dignidad, equidad y futuro para las familias agricultoras. Actuamos a través de tres pilares concretos.",
    ],
    image: {
      src: NuestroImpacto,
      alt: "Recolectora de café junto a un cafeto cargado de cerezas maduras",
    },
    highlightsLayout: "cards",
    highlights: [
      {
        id: "retribucion-justa",
        title: "Retribución justa",
        description:
          "Pagamos precios superiores por carga para que los caficultores den fe de que es posible vivir dignamente de su esfuerzo.",
      },
      {
        id: "somondoco-origen",
        title: "Somondoco como origen",
        description:
          "Damos visibilidad a la riqueza agrícola del municipio, impulsando tanto el café como el sagú y alentando cultivos sanos y sostenibles que enamoren al consumidor final.",
      },
      {
        id: "visibilidad-mujer-rural",
        title: "Visibilidad de la mujer rural",
        description:
          "Reconocemos y respaldamos el papel fundamental de las mujeres en la caficultura, especialmente en labores tan delicadas y vitales como la recolección y el secado del grano.",
      },
    ],
  },
  {
    id: "nuestro-proposito",
    question: "¿Cuál es nuestro propósito?",
    paragraphs: [
      "Nuestro propósito es transformar la forma en que el mundo ve y valora el agro colombiano. Queremos que FLORMORADO sea recordado no solo por la calidad de su café, sino porque cada empaque lleva impreso el nombre de su autor, abriendo camino para que los consumidores reconozcan y compren directamente al agricultor.",
      "Honramos el legado de quienes nos enseñaron a cuidar la tierra con respeto y conexión espiritual, fomentando una cultura cafetera sostenible que protege el medio ambiente y pone al campesino siempre en el primer lugar.",
    ],
    image: {
      src: NuestroProposito,
      alt: "Barista sirviendo leche sobre un café recién preparado",
    },
  },
];

// Fotos provisionales: CC BY y CC BY-SA obligan a atribuir. Se borra con ellas.
export const PURPOSE_IMAGE_CREDITS: IPurposeCredit[] = [
  {
    id: "que-hacemos",
    work: "Hand holding coffee cherries",
    url: "https://commons.wikimedia.org/wiki/File:Hand_holding_coffee_cherries.jpg",
    author: "Daniel Case",
    license: "CC BY-SA 4.0",
  },
  {
    id: "harina-de-sagu",
    work: "Shimipampana (Maranta arundinacea)",
    url: "https://commons.wikimedia.org/wiki/File:Shimipampana_(Maranta_arundinacea).jpg",
    author: "François Delonnay",
    license: "CC BY-SA 4.0",
  },
  {
    id: "nuestra-historia",
    work: "El Valle de Tenza visto desde el cerro de Somondoco",
    url: "https://commons.wikimedia.org/wiki/File:El_Valle_de_Tenza_visto_desde_el_cerro_de_Somondoco.jpg",
    author: "Mendizi",
    license: "CC BY-SA 4.0",
  },
  {
    id: "nuestro-impacto",
    work: "CiudadBarrioscoffeepicker",
    url: "https://commons.wikimedia.org/wiki/File:CiudadBarrioscoffeepicker.jpg",
    author: "Rainforest Alliance Guatemala",
    license: "CC BY 2.5",
  },
  {
    id: "nuestro-proposito",
    work: "Barista pouring milk",
    url: "https://commons.wikimedia.org/wiki/File:Barista_pouring_milk_(Unsplash).jpg",
    author: "Tim Wright",
    license: "CC0",
  },
];
