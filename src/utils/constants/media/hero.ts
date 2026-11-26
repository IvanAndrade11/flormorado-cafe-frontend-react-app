import HeroPosterWide from "@/assets/images/banners/banner-hero.jpg";

// Cloudinary sirve el video ya recodificado: el original son 43 MB en `.mov`,
// y de ahí salen 3 con `q_auto:eco` a 720 de ancho, que es de sobra para un
// celular. El póster es el primer fotograma del propio video (`so_0`), así que
// no salta nada al arrancar. Cambiar el encuadre o la calidad es cambiar estas
// transformaciones, sin tocar un archivo.
const CLOUDINARY_VIDEO = "https://res.cloudinary.com/dcbnyk8uk/video/upload";
const PORTRAIT_ID = "v1795653132/22-11-2026-1795623410_3440340_1_pqmkxg";

export interface IHeroMedia {
  // Sin video se ve solo el póster, que es lo que pasa en apaisado hasta que
  // esté el definitivo.
  video?: string;
  poster: string;
  // Las medidas reales del material. La portada adopta esa proporción para no
  // recortarlo, así que tiene que ser la del archivo, no una aproximación: con
  // declarar 16/9 una foto de 1920x845 ya pierde un 20% por los lados.
  aspectRatio: string;
}

/**
 * El video de la portada, en los dos formatos.
 *
 * Hay uno por orientación porque un video vertical no puede llenar una pantalla
 * apaisada sin recortarse, ni al revés: cada pantalla recibe el encuadre hecho
 * para ella y ninguno se corta.
 *
 * Están aquí, y no en `images`/`videos`, para que viajen en el chunk perezoso
 * del inicio y no en el inicial: el pie importa `images`, así que todo lo que
 * entre ahí lo descarga también quien llega a una página legal.
 *
 * El vertical ya es el definitivo y vive en Cloudinary, como las imágenes de
 * producto: por eso el video no pesa dentro del paquete. El apaisado sigue
 * pendiente, así que de momento solo tiene póster y en escritorio la portada se
 * ve como una foto fija; cuando llegue se le pone aquí su URL, su póster y **su
 * `aspectRatio` real**, y el componente no cambia.
 */
export const HERO_MEDIA: Record<"landscape" | "portrait", IHeroMedia> = {
  landscape: {
    poster: HeroPosterWide,
    aspectRatio: "1920 / 845",
  },
  portrait: {
    video: `${CLOUDINARY_VIDEO}/f_mp4,q_auto:eco,w_720,c_limit/${PORTRAIT_ID}.mp4`,
    poster: `${CLOUDINARY_VIDEO}/so_0,f_jpg,q_auto,w_720,c_limit/${PORTRAIT_ID}.jpg`,
    aspectRatio: "720 / 1280",
  },
};
