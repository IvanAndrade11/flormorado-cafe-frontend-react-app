import { IOrigin, IStoryImage, IStorySection } from "@/types/components";

// Fuera de `media/images.ts`: el pie usa ese objeto y la ataría al chunk inicial.
import GirlStandingTwo from "@/assets/images/illustrations/girl_standing_two.svg";

export const ORIGINS_LEAD = "El alma de nuestra tierra en tu taza";

const GIRL_STANDING: IStoryImage = {
  src: GirlStandingTwo,
  alt: "Ilustración de una campesina sosteniendo una bandeja con cerezas de café",
};

export const ORIGINS_SHARE_IMAGE = GIRL_STANDING.src;

export const ORIGINS_SECTIONS: IStorySection[] = [
  {
    id: "cafes-de-origen",
    question: "Cafés de origen",
    paragraphs: [
      "En Colombia, el café no es solo agricultura; es historia, cultura y unión familiar. Detrás de cada grano hay más de 540.000 familias caficultoras —un 96 % pequeños productores— que sostienen con orgullo la tradición de nuestro campo.",
      "Vivimos una nueva era en el consumo del café. Los amantes de esta bebida son cada vez más conscientes y exigentes, buscando conocer el origen, la altura y los matices sensoriales de lo que consumen.",
      "En FLORMORADO asumimos este reto con pasión: cuidamos cada eslabón de la cadena para que todo el esfuerzo y amor del caficultor se convierta en una taza limpia, sin defectos y digna de disfrutarse en casa.",
    ],
    image: GIRL_STANDING,
  },
];

// Encabeza el explorador del mapa, y por eso no es una sección de relato más:
// presenta lo que viene debajo, así que se pinta dentro de él.
export const ORIGINS_EXPLORER_INTRO =
  "Descubre nuestros tres orígenes únicos, fruto de microclimas privilegiados, del trabajo dedicado de nuestros campesinos y de un comercio justo que transforma vidas.";

// Los `id` son los del mapa: los mismos que `DEPARTMENT_PATHS` y `ORIGIN_MARKERS`.
export const ORIGINS: IOrigin[] = [
  {
    id: "boyaca",
    department: "Boyacá",
    town: "Somondoco",
    nickname: "El equilibrado y aromático",
    headline: "Un café de montaña con carácter suave, floral y balanceado.",
    chooseIf:
      "Elige Boyacá si buscas una taza aromática, amable y equilibrada para disfrutar a cualquier hora del día.",
    summary:
      "Su sello es la suavidad floral y el dulzor de panela, acompañado de una acidez cítrica delicada (como mandarina) y un cuerpo sedoso. No abruma al paladar; es limpio y fácil de tomar.",
    altitude: "Entre 1.600 y 1.900 m s. n. m.",
    thermalFloor:
      "Templado a frío (clima de montaña andina con marcada amplitud térmica entre el día y la noche, lo que permite una maduración lenta del grano).",
    cupProfile:
      "Fragancia y aroma floral con notas a panela y miel. En boca presenta una acidez media-brillante de tipo cítrico suave (mandarina o naranja dulce), cuerpo sedoso y un residual limpio y dulce con ligeros matices a frutos secos.",
    facts: [
      {
        id: "esmeraldas",
        title: "Tierra de esmeraldas y café",
        description:
          "Ubicado en el Valle de Tenza, Somondoco es históricamente conocido por su riqueza esmeraldífera; hoy, muchos caficultores cultivan en suelos ricos en minerales que aportan una dulzura única al grano.",
      },
      {
        id: "conservacion",
        title: "Caficultura de conservación",
        description:
          "Es una zona de pequeños productores familiares que cultivan bajo sombrío nativo, protegiendo las fuentes hídricas que alimentan la región del Guavio.",
      },
    ],
  },
  {
    id: "caldas",
    department: "Caldas",
    town: "San José",
    nickname: "El clásico, dulce y con cuerpo",
    headline:
      "La tradición del Eje Cafetero con dulzura intensa y cuerpo pronunciado.",
    chooseIf:
      "Elige Caldas si prefieres el sabor tradicional del café colombiano: intenso, con cuerpo cremoso y notas a chocolate y caramelo.",
    summary:
      "Aquí predominan los sabores tostados y achocolatados (chocolate oscuro, caramelo, nuez). Tiene la acidez más moderada de los tres y el cuerpo más cremoso y pesado, dejando una sensación envolvente en boca.",
    altitude: "Entre 1.500 y 1.850 m s. n. m.",
    thermalFloor:
      "Templado (clima cafetero clásico con lluvias bien distribuidas a lo largo del año y alta humedad relativa).",
    cupProfile:
      "Aroma dulce con notas marcadas a chocolate oscuro, caramelo y nuez tostada. Tiene una acidez media balanceada, un cuerpo cremoso y consistente, y un posgusto prolongado y achocolatado.",
    facts: [
      {
        id: "mirador",
        title: "El Mirador de Caldas",
        description:
          "Conocido así por su ubicación estratégica sobre una cuchilla montañosa en el occidente caldense, desde donde se divisan los valles de los ríos Risaralda y Cauca; estas corrientes de aire cálido que suben de los valles crean un microclima ideal para el secado natural del café.",
      },
      {
        id: "paisaje",
        title: "Herencia del Paisaje Cultural Cafetero",
        description:
          "Sus fincas conservan la arquitectura tradicional antioqueña y técnicas de recolección selectiva («grano a grano») transmitidas por generaciones.",
      },
    ],
  },
  {
    id: "tolima",
    department: "Tolima",
    town: "Planadas",
    nickname: "El exótico, frutal y brillante",
    headline:
      "Un café de alta montaña, complejo, exótico y premiado mundialmente.",
    chooseIf:
      "Elige Tolima si te gustan los cafés de origen expresivos, con acidez frutal marcada y un perfil complejo.",
    summary:
      "Es el más intenso y expresivo. Se define por sus notas a frutos rojos (mora, cereza) y caña de azúcar, con una acidez jugosa y vibrante que resalta gracias a su cultivo a mayor altitud.",
    altitude: "Entre 1.750 y 2.150 m s. n. m.",
    thermalFloor:
      "Frío (zonas altas de la Cordillera Central, influenciadas por los vientos fríos del Nevado del Huila).",
    cupProfile:
      "Fragancia intensa y compleja con notas a frutos rojos (mora, cereza), caña de azúcar y flores blancas. Destaca por su acidez brillante y jugosa (málica y cítrica), cuerpo medio-alto aterciopelado y un retrogusto dulce y persistente.",
    facts: [
      {
        id: "campeones",
        title: "Cuna de cafés campeones",
        description:
          "Planadas es uno de los municipios más galardonados en competencias internacionales como Taza de la Excelencia, reconocido por producir microlotes exóticos de variedades como Gesha, Pink Bourbon y Caturra.",
      },
      {
        id: "paz",
        title: "Café de paz y resiliencia",
        description:
          "Su caficultura es símbolo de transformación social en Colombia; asociaciones de caficultores locales y comunidades indígenas Nasa Wes'x han posicionado este origen en las barras de café de especialidad más exigentes del mundo.",
      },
    ],
  },
];
