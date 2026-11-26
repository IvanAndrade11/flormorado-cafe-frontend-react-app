// Cloudinary sirve los dos videos ya recodificados: los originales son 43 y 39
// MB en `.mov`, y de ahí salen 3 y 3,9 con `q_auto:eco`. El póster es el primer
// fotograma del propio video (`so_0`), así que no salta nada al arrancar.
// Cambiar encuadre, calidad o tamaño es cambiar estas transformaciones, sin
// tocar un archivo.
const CLOUDINARY_VIDEO = "https://res.cloudinary.com/dcbnyk8uk/video/upload";

const PORTRAIT_ID = "v1795653132/22-11-2026-1795623410_3440340_1_pqmkxg";
const LANDSCAPE_ID = "v1795707928/desktop_wdnmsi";

export interface IHeroMedia {
  // Sin video se ve solo el póster.
  video?: string;
  poster: string;
  // Las medidas reales del archivo. La portada adopta esa proporción para no
  // recortarlo, así que tiene que ser la suya y no una aproximación.
  aspectRatio: string;
}

/**
 * El video de la portada, en los dos formatos.
 *
 * Hay uno por orientación porque un video vertical no puede llenar una pantalla
 * apaisada sin recortarse, ni al revés: cada pantalla recibe el encuadre hecho
 * para ella y ninguno se corta.
 *
 * Viven aquí, y no en `images`/`videos`, para que viajen en el chunk perezoso
 * del inicio y no en el inicial: el pie importa `images`, así que todo lo que
 * entre ahí lo descarga también quien llega a una página legal. Y al servirse
 * desde Cloudinary, como las imágenes de producto, ya no queda ningún video
 * dentro del paquete.
 */
export const HERO_MEDIA: Record<"landscape" | "portrait", IHeroMedia> = {
  // Se sirve en su 3:2 nativo, sin recortar: es más alto que una pantalla
  // apaisada, y de eso se encarga el tope de la portada repartiendo el recorte
  // entre arriba y abajo, en vez de descartar una cuarta parte del encuadre de
  // forma fija.
  landscape: {
    video: `${CLOUDINARY_VIDEO}/f_mp4,q_auto:eco,w_1600,c_limit/${LANDSCAPE_ID}.mp4`,
    poster: `${CLOUDINARY_VIDEO}/so_0,f_jpg,q_auto,w_1600,c_limit/${LANDSCAPE_ID}.jpg`,
    aspectRatio: "1600 / 1066",
  },
  portrait: {
    video: `${CLOUDINARY_VIDEO}/f_mp4,q_auto:eco,w_720,c_limit/${PORTRAIT_ID}.mp4`,
    poster: `${CLOUDINARY_VIDEO}/so_0,f_jpg,q_auto,w_720,c_limit/${PORTRAIT_ID}.jpg`,
    aspectRatio: "720 / 1280",
  },
};
