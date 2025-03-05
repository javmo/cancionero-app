import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Santos = ({ santos, idioma }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    adaptiveHeight: true,
    arrows: false,
    cssEase: "ease-in-out",
  };

  // Traducir título según idioma
  const traducirTitulo = (idioma) => (idioma === "la" ? "Sancti Diei" : "Santos del Día");

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 md:p-8 rounded-lg shadow-lg mb-6 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-700 border-b-2 border-blue-400 pb-3 mb-4 text-center">
        🕊️ {traducirTitulo(idioma)}
      </h2>
      <Slider {...settings}>
        {santos.map((santo, index) => (
          <div key={index} className="p-4 md:p-6 text-center bg-white rounded-lg shadow-md">
            <p className="text-xl md:text-2xl font-semibold text-gray-900">
              {idioma === "la" ? `Sanctus ${santo.nombre}` : santo.nombre}
            </p>
            <p className="text-sm md:text-lg text-gray-700 mt-3 leading-relaxed">
              {santo.descripcion
                ? santo.descripcion
                : idioma === "la"
                ? "Descriptio non praesto est."
                : "Descripción no disponible."}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Santos;
