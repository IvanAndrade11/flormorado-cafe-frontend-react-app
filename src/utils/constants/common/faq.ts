import { IFaqGroup } from "@/types/components";

import { formatPrice } from "./actions";
import { URLS } from "./data";
import { DATA_CONTROLLER, DELIVERY_WINDOW } from "./legal";
import { FREE_SHIPPING_FROM } from "../store/cart";

const WHATSAPP = {
  text: DATA_CONTROLLER.phoneLabel,
  url: DATA_CONTROLLER.whatsappHref,
};

const EMAIL = {
  text: DATA_CONTROLLER.email,
  url: `mailto:${DATA_CONTROLLER.email}`,
};

export const FAQ_GROUPS: IFaqGroup[] = [
  {
    id: "flormorado",
    title: "FLORMORADO",
    items: [
      {
        id: "que-es-flormorado",
        question: "¿Qué es FLORMORADO y qué productos ofrecen?",
        paragraphs: [
          [
            "Conectamos lo mejor del campo colombiano con tu mesa. FLORMORADO representa un origen que florece gracias a la diversidad y riqueza sensorial de nuestros cafés de origen y de productos tradicionales como la harina de sagú.",
          ],
          [
            "Somos un puente transparente y humano: no solo comercializamos, sino que ponemos nombre, rostro e historia a cada cosecha. En la parte posterior de cada empaque encontrarás los datos del productor que hizo posible tu café o tu sagú, para que el reconocimiento y el valor real se queden en manos de quien cultiva la tierra.",
          ],
        ],
      },
      {
        id: "como-pedir-y-pagar",
        question:
          "¿Cómo puedo hacer mi pedido y cuáles son los métodos de pago?",
        paragraphs: [
          [
            "Puedes hacer tu pedido directamente en ",
            { text: "nuestra tienda en línea", url: URLS.store },
            " o escribiéndonos a nuestro WhatsApp ",
            WHATSAPP,
            ".",
          ],
          ["Contamos con dos opciones de pago:"],
        ],
        points: [
          {
            id: "contraentrega",
            title: "Contraentrega",
            description: "Pagas al recibir tu pedido.",
          },
          {
            id: "bre-b",
            title: "Transferencia por llave BRE-B",
            description:
              "Al confirmar tu compra te mostramos la llave, el nombre del titular que debe aparecer en tu banco y el valor exacto. Empezamos a preparar el pedido una vez confirmamos el pago.",
          },
        ],
      },
      {
        id: "cobertura-de-entrega",
        question:
          "¿Pueden llevar mi café de origen o mi harina de sagú a casa o a la oficina?",
        paragraphs: [
          [
            "Sí. Entregamos en Bogotá D. C. y municipios aledaños (Soacha, Chía, Cota, Cajicá, La Calera, Mosquera y Funza).",
          ],
          [
            "Para otras ciudades de Colombia, realizamos envíos a través de empresas de mensajería y transporte reconocidas.",
          ],
        ],
      },
      {
        id: "tiempos-y-envio",
        question:
          "¿Cuánto tarda en llegar mi pedido y cuál es el costo de envío?",
        paragraphs: [
          [
            `El tiempo de entrega es de ${DELIVERY_WINDOW}, contados desde el día siguiente a la confirmación del pedido (o desde la confirmación del pago, si eliges transferencia).`,
          ],
          [
            `Verás el costo del envío al finalizar la compra, calculado según la dirección de envío que nos suministres. Si tu compra supera los $${formatPrice(FREE_SHIPPING_FROM)} y la entrega es en Bogotá D. C. o los municipios aledaños mencionados, el envío es gratis.`,
          ],
        ],
      },
      {
        id: "al-por-mayor",
        question:
          "¿Venden al por mayor para cafeterías, restaurantes o tiendas?",
        paragraphs: [
          [
            "Sí. Contamos con presentaciones de 2500 g y 3000 g pensadas para cafeterías, oficinas, comercios o consumo frecuente. ",
            {
              text: "Escríbenos por WhatsApp",
              url: DATA_CONTROLLER.whatsappHref,
            },
            " para cotizar según el volumen que necesites.",
          ],
        ],
      },
      {
        id: "productores",
        question:
          "¿De dónde provienen sus productos y cómo trabajan con los productores?",
        paragraphs: [
          [
            "Compramos directamente a pequeños caficultores y agricultores en regiones como Boyacá (Somondoco), Caldas (San José) y Tolima (Planadas). Trabajamos bajo principios de comercio justo, acompañando procesos agrícolas responsables y dando trazabilidad a cada cosecha. Puedes conocer cada región en ",
            { text: "nuestra sección de Orígenes", url: URLS.origins },
            ".",
          ],
        ],
      },
      {
        id: "regalos-y-corporativo",
        question: "¿Tienen opciones de regalo o detalles corporativos?",
        paragraphs: [
          [
            "Sí. ",
            {
              text: "Escríbenos por WhatsApp",
              url: DATA_CONTROLLER.whatsappHref,
            },
            " contándonos qué celebración o evento tienes y te recomendamos las mejores opciones de empaque y presentación.",
          ],
        ],
      },
      {
        id: "dudas-y-novedades",
        question: "¿Si tengo alguna duda o novedad, cómo puedo gestionarla?",
        paragraphs: [
          [
            "Puedes diligenciar el formulario de contacto de esta página y recibirás un número de radicado con fecha y hora para hacer seguimiento. También puedes escribirnos a ",
            EMAIL,
            " o al WhatsApp ",
            WHATSAPP,
            ". ¡Recuerda, estamos aquí para ti!",
          ],
        ],
      },
      {
        id: "cambios-y-devoluciones",
        question:
          "¿Cómo funcionan los cambios, devoluciones o novedades con mi pedido?",
        paragraphs: [
          [
            "Por tratarse de alimentos, las condiciones de cambio o devolución dependen del estado del producto y del motivo. Consulta nuestros ",
            { text: "términos y condiciones", url: URLS.terms },
            " para ver todos los detalles legales y operativos.",
          ],
        ],
      },
    ],
  },
  {
    id: "cafe-de-origen",
    title: "CAFÉ DE ORIGEN",
    items: [
      {
        id: "region-y-perfil",
        question:
          "¿De qué región proviene el café de FLORMORADO y cuál es su perfil de taza?",
        paragraphs: [
          [
            "Trabajamos cafés de regiones como Boyacá (Somondoco), Caldas (San José) y Tolima (Planadas), fruto de microclimas privilegiados y del trabajo dedicado de nuestros caficultores locales. El perfil de taza varía según el origen y el lote de cosecha; puedes consultarlo en ",
            { text: "nuestra sección de Orígenes", url: URLS.origins },
            " y también en la parte posterior de cada empaque de FLORMORADO, donde encontrarás los datos específicos del caficultor que hizo posible tu café.",
          ],
        ],
      },
      {
        id: "grano-o-molido",
        question:
          "¿El café viene en grano o molido? ¿Tienen diferentes tipos de molienda?",
        paragraphs: [
          [
            "Puedes pedirlo en grano si tienes molino en casa, o molido en molienda gruesa, media, fina o extrafina, según tu método de preparación (prensa francesa, greca, goteo, espresso, etc.). Si no estás seguro de cuál elegir, lee ",
            { text: "nuestra guía en el blog", url: URLS.blog },
            " o escríbenos y te sugerimos cuál es la adecuada para ti.",
          ],
        ],
      },
      {
        id: "conservar-el-cafe",
        question:
          "¿Cómo debo conservar el café para mantener su aroma y frescura?",
        paragraphs: [
          [
            "Una vez tostado, el café pierde aroma por la oxidación de sus aceites. Protégelo de sus cuatro principales enemigos: oxígeno, luz, calor y humedad.",
          ],
        ],
        points: [
          {
            id: "recipiente-hermetico",
            title: "Usa un recipiente opaco y hermético",
            description:
              "La bolsa original tiene una válvula de desgasificación unidireccional que te ayuda a protegerlo; si no la tienes, un frasco hermético opaco o de vidrio oscuro funciona perfecto.",
          },
          {
            id: "lugar-fresco",
            title: "Guárdalo en un lugar fresco y oscuro",
            description:
              "Una alacena cerrada, lejos de la estufa, el horno, la cafetera (que irradia calor) y de ventanas con luz solar directa. La temperatura ambiente estable, entre 15 °C y 22 °C, es la ideal.",
          },
          {
            id: "moler-al-momento",
            title: "Cómpralo en grano y muélelo justo antes de prepararlo",
            description:
              "El café molido tiene mucha más superficie expuesta al aire y pierde la mayor parte de su aroma.",
          },
        ],
      },
      {
        id: "cambio-de-cafe",
        question: "¿Si quiero cambiar mi café por otro, lo puedo hacer?",
        paragraphs: [
          ["Sí, según el caso. Revisa cuál de estos tres escenarios aplica:"],
        ],
        points: [
          {
            id: "cambio-sellado",
            title:
              "Cambio por gusto dentro de los 5 días hábiles, con el empaque sellado",
            description:
              "Podemos hacer el cambio siempre que la bolsa esté completamente sellada, en su empaque original y sin señales de apertura o manipulación, por tratarse de un alimento. En cambios voluntarios por preferencia, los costos de envío de devolución y reenvío corren por tu cuenta. Si es tu caso, envíanos una foto del empaque sellado y te indicamos los pasos para coordinar el envío.",
          },
          {
            id: "cambio-abierto",
            title:
              "Cambio por gusto con la bolsa abierta, o pasados más de 5 días hábiles",
            description:
              "Por normatividad sanitaria, inocuidad alimentaria y las excepciones para bienes perecederos del Estatuto del Consumidor, no realizamos cambios ni devoluciones si el empaque ya fue abierto o perdió su sello. Sin embargo, podemos orientarte en la preparación (molienda, proporción o temperatura) para que disfrutes mejor tu café.",
          },
          {
            id: "cambio-error",
            title: "Error de despacho o empaque averiado",
            description:
              "Si enviamos una referencia distinta o el paquete llegó dañado, hacemos el cambio de inmediato sin costo adicional para ti. Si es tu caso, envíanos una foto del producto recibido y tu número de pedido para gestionar la recolección y el envío correcto.",
          },
        ],
      },
      {
        id: "presentaciones-cafe",
        question: "¿En qué presentaciones (gramajes) viene el café?",
        paragraphs: [
          [
            "Está disponible en presentaciones de 340 g, 500 g, 2500 g y 3000 g. Visita ",
            { text: "nuestra tienda", url: URLS.store },
            " para ver el catálogo completo de cafés de origen.",
          ],
        ],
      },
    ],
  },
  {
    id: "harina-de-sagu",
    title: "HARINA DE SAGÚ",
    items: [
      {
        id: "que-es-el-sagu",
        question: "¿Qué es la harina de sagú y cómo se obtiene?",
        paragraphs: [
          [
            "Es una fécula 100 % natural obtenida de los rizomas de una planta tradicional andina (conocida en Colombia como sagú, achira o chisgua). Se extrae mediante un proceso artesanal de lavado y fricción en agua para separar el almidón de la fibra, seguido de decantación y secado al sol. El resultado es un polvo fino, blanco y de sabor neutro.",
          ],
        ],
      },
      {
        id: "beneficios-del-sagu",
        question: "¿Cuáles son sus principales beneficios nutricionales?",
        paragraphs: [],
        points: [
          {
            id: "facil-digestion",
            title: "Fácil digestión",
            description:
              "Es un alimento suave y ligero para el estómago, recomendado tradicionalmente tanto para niños y adultos mayores como para personas con digestión delicada o en recuperación.",
          },
          {
            id: "energia-limpia",
            title: "Fuente de energía limpia",
            description:
              "Es rica en carbohidratos complejos de fácil asimilación, lo que brinda energía rápida y sostenida sin aportar grasas ni colesterol.",
          },
          {
            id: "bajo-sodio",
            title: "Bajo aporte de sodio y grasas",
            description:
              "Es prácticamente libre de grasas saturadas, azúcares añadidos y sodio, lo que la hace muy versátil para planes de alimentación saludable.",
          },
          {
            id: "minerales",
            title: "Aporte de minerales y vitaminas",
            description:
              "Contiene pequeñas cantidades de potasio, hierro, calcio y ácido fólico (vitamina B9), nutrientes que apoyan la salud cardiovascular y el bienestar general.",
          },
        ],
      },
      {
        id: "sagu-sin-gluten",
        question: "¿La harina de sagú es libre de gluten?",
        paragraphs: [
          [
            "Sí, es naturalmente libre de gluten. Al provenir de una raíz y no de cereales como el trigo, es una excelente alternativa para personas con sensibilidad al gluten o que buscan reducir su consumo en la dieta diaria.",
          ],
        ],
      },
      {
        id: "sagu-natural",
        question: "¿La harina de sagú es 100 % natural?",
        paragraphs: [
          [
            "Sí. Nuestra harina de sagú no contiene conservantes, blanqueadores ni aditivos químicos añadidos.",
          ],
        ],
      },
      {
        id: "presentaciones-sagu",
        question: "¿En qué presentaciones puedo comprar la harina de sagú?",
        paragraphs: [
          [
            "La ofrecemos en presentaciones de 500 g y 2500 g. Revisa ",
            { text: "nuestro catálogo", url: URLS.store },
            " para ver disponibilidad.",
          ],
        ],
      },
      {
        id: "recetas-con-sagu",
        question: "¿En qué recetas o preparaciones puedo usarla?",
        paragraphs: [
          [
            "Es muy versátil en cocina y repostería: se usa en bizcochos de achira, amasijos, almojábanas, galletas, panes, arepas, coladas y sopas, e incluso como espesante natural para caldos o preparaciones líquidas.",
          ],
        ],
      },
      {
        id: "vida-util-sagu",
        question: "¿Cuál es su tiempo de vida útil?",
        paragraphs: [],
        points: [
          {
            id: "empaque-cerrado",
            title: "Empaque original cerrado",
            description:
              "De 1 a 2 años; revisa la fecha indicada en el empaque.",
          },
          {
            id: "empaque-abierto",
            title: "Empaque abierto y bien almacenado",
            description: "De 6 a 12 meses.",
          },
        ],
      },
      {
        id: "almacenar-sagu",
        question: "¿Cómo debo almacenarla?",
        paragraphs: [
          [
            "Estas son nuestras recomendaciones para almacenar adecuadamente tu harina:",
          ],
        ],
        points: [
          {
            id: "hermetico",
            title: "Usa un recipiente hermético",
            description:
              "Al abrir la bolsa, ciérrala bien con su sello ziploc o pásala a un frasco de vidrio con tapa de rosca o a un recipiente hermético con sello de silicona.",
          },
          {
            id: "fresco-seco-oscuro",
            title: "Mantenla en un lugar fresco, seco y oscuro",
            description:
              "Guárdala en una alacena alejada de fuentes de calor (estufa, horno, lavaplatos) y del sol directo, a una temperatura ideal menor a 25 °C.",
          },
          {
            id: "olores-fuertes",
            title: "Aléjala de olores fuertes",
            description:
              "Los almidones absorben aromas: no la guardes junto a especias intensas, café, ajos o productos de limpieza.",
          },
          {
            id: "utensilios-secos",
            title: "Usa utensilios completamente secos",
            description:
              "Introduce siempre cucharas o medidores completamente secos.",
          },
        ],
      },
    ],
  },
];
