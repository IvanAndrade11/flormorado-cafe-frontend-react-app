import "./CarouselMessage.scss";

export const CarouselMessage = () => {
  return (
    <div className="navbar-carousel-container">
      <div id="navbar-carousel" className="navbar-carousel-track">
        {Array.from({ length: 10 }).map((_, index) => (
          <div className="navbar-carousel-group" key={index}>
            <p>
              Reconociendo la labor del campo - ¡Envío gratis a partir de
              $150,000!
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
