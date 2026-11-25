import "./Hero.scss";

import React from "react";
import { Link } from "react-router-dom";

import { Wordmark } from "@/components/ui";
import { URLS } from "@/utils/constants";
import { HERO_MEDIA } from "@/utils/constants/media/hero";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const Hero: React.FC = () => {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  // Por orientación y no por ancho: lo que decide qué encuadre cabe sin
  // recortarse es la forma de la pantalla, no su tamaño.
  const portrait = useMediaQuery("(orientation: portrait)");

  const media = portrait ? HERO_MEDIA.portrait : HERO_MEDIA.landscape;
  const showVideo = Boolean(media.video) && !reducedMotion;

  return (
    <section className="fmc-hero" style={{ aspectRatio: media.aspectRatio }}>
      {showVideo ? (
        <video
          // Sin `key` el navegador se queda con la fuente anterior al girar el
          // dispositivo, que es justo cuando hay que cambiar de encuadre.
          key={media.video}
          className="fmc-hero__media"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          preload="metadata"
          poster={media.poster}
          // Decorativo: lo que cuenta la portada está en el texto de encima.
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={media.video} type="video/mp4" />
        </video>
      ) : (
        <img className="fmc-hero__media" src={media.poster} alt="" />
      )}

      <div className="fmc-hero__veil" />

      <div className="fmc-hero__content">
        <h1 className="fmc-hero__title">
          <Wordmark className="fmc-hero__wordmark" />
        </h1>
        <p className="fmc-hero__tagline">
          Un puente directo, transparente y humano entre el campo colombiano y
          tu taza.
        </p>
        <div className="fmc-hero__actions">
          <Link to={URLS.categories} className="fmc-hero__cta">
            Ver la tienda
          </Link>
          <Link
            to={URLS.origins}
            className="fmc-hero__cta fmc-hero__cta--ghost"
          >
            Conoce los orígenes
          </Link>
        </div>
      </div>
    </section>
  );
};
