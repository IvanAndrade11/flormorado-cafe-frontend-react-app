import { IStoryImage, IStorySection } from "@/types/components";

// Fuera de `media/images.ts`: el pie usa ese objeto y las ataría al chunk inicial.
import GirlCollecting from "@/assets/images/illustrations/girl_collecting.svg";
import GirlStanding from "@/assets/images/illustrations/girl_standing.svg";
import CoffeeGrains from "@/assets/images/illustrations/coffee_grains.svg";
import FlowerOne from "@/assets/images/illustrations/flower_one.svg";

export const PURPOSE_LEAD_IMAGE: IStoryImage = {
  src: GirlCollecting,
  alt: "Ilustración de una mujer recolectando cerezas de un cafeto",
};

export const PURPOSE_LEAD =
  "Conectamos lo mejor del campo colombiano con los amantes del buen café, " +
  "construyendo un puente directo, transparente y humano entre el origen y tu taza.";

export const PURPOSE_SECTIONS: IStorySection[] = [
  {
    id: "que-hacemos",
    question: "¿Qué hacemos?",
    paragraphs: [
      "Conectamos lo mejor del campo colombiano con tu mesa. FLORMORADO representa un origen que florece gracias a la diversidad y riqueza sensorial de los mejores cafés de regiones como Boyacá, Caldas y Tolima, junto con productos tradicionales como la harina de sagú.",
      "Somos un puente transparente y humano. No solo comercializamos; ponemos nombre, rostro e historia a cada cosecha. En la parte posterior de cada empaque de FLORMORADO encontrarás los datos específicos del caficultor que hizo posible tu café y del agricultor que procesó tu sagú, buscando que el reconocimiento y el valor real se queden siempre en las manos de quien cultiva la tierra.",
    ],
    image: {
      src: CoffeeGrains,
      alt: "Ilustración de granos de café en distintos estados de maduración",
    },
  },
  {
    id: "nuestra-historia",
    question: "¿Cuál es nuestra historia?",
    paragraphs: [
      "FLORMORADO nació de una semilla plantada con amor en tiempos de incertidumbre y del profundo convencimiento de que la tierra tiene un alma que merece ser honrada. Comenzamos cultivando en época de pandemia en una finca que, en su momento, no era cafetera y que hoy dio luz y vida a este proyecto. Hoy, este sueño persiste en manos de dos hermanos que unieron fuerzas para tender un puente entre la tradición ancestral de Somondoco (Boyacá) y los amantes del buen café.",
      "Continuadores de una visión respetuosa y espiritual de la agricultura, entendimos que el campo merece una nueva mirada. FLORMORADO es el reflejo de ese legado: un homenaje al trabajo duro, a la sabiduría de los abuelos y a la huella de un hombre que —a través del conocimiento, el entendimiento y el amor— nos enseñó que un alimento cultivado con alma transforma la vida de quienes lo siembran y de quienes lo disfrutan.",
    ],
    quote: "Para nosotros, Denys e Iván, ¡el origen lo es todo!",
    image: {
      src: GirlStanding,
      alt: "Ilustración de una campesina caminando con un canasto de cerezas de café",
    },
  },
  {
    id: "nuestro-impacto",
    question: "¿Cómo buscamos impactar?",
    paragraphs: [
      "Nuestro impacto se mide en dignidad, equidad y futuro para las familias agricultoras. Actuamos a través de tres pilares concretos.",
    ],
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
      "Redefinir la forma en que el mundo ve y valora el agro colombiano. Queremos que FLORMORADO sea recordado no solo por la calidad de su café, sino porque cada empaque lleva impreso el nombre de su autor, abriendo camino para que los consumidores reconozcan y compren directamente al agricultor.",
      "Honramos el legado de quienes nos enseñaron a cuidar la tierra con respeto y conexión espiritual, fomentando una cultura cafetera sostenible que protege el medio ambiente y pone al campesino siempre en el primer lugar.",
    ],
    image: {
      src: FlowerOne,
      alt: "Ilustración de una flor de pétalos largos",
    },
  },
];
