import HeroPosterWide from "@/assets/images/banners/banner-hero.jpg";
import HeroPosterTall from "@/assets/images/banners/banner-hero-vertical.jpg";
import HeroVideoTall from "@/assets/videos/bird.mp4";

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
 * Provisional: el material de hoy es el que ya existía —un video vertical y
 * una foto recortada en los dos formatos—. Cuando estén los definitivos se
 * cambian aquí por su URL de Cloudinary, donde ya viven las imágenes de
 * producto, **y con ellos el `aspectRatio` y el póster**, que tiene que ser un
 * fotograma del propio video para que no salte al arrancar; el componente no
 * cambia. Servirlos desde
 * ahí es lo que hace que el video deje de pesar dentro del paquete.
 */
export const HERO_MEDIA: Record<"landscape" | "portrait", IHeroMedia> = {
  landscape: {
    poster: HeroPosterWide,
    aspectRatio: "1920 / 845",
  },
  portrait: {
    video: HeroVideoTall,
    poster: HeroPosterTall,
    aspectRatio: "480 / 848",
  },
};
