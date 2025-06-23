import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import CardDestaqueProfissionais from "./CardDestaqueProfissionais";
import "./DestaqueProfissionais.css";
import api from "../../../api";

export default function DestaqueProfissionais() {
  const [profissionais, setProfissionais] = useState([]);
  const settings = {
    lazyLoad: true,
    infinite: true,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          className: "center",
          centerMode: true,
          centerPadding: "80px",
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
          dots: true,
        },
      },
    ],
  };

  useEffect(() => {
    api.get("/destaques/getDestaques").then((response) => {
      setProfissionais(response.data);
    });
  }, []);

  return (
    <section className="default destaques d-block bg-light">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-12 text-center">
            <div className="title pb-5">
              <h2>Empresas em destaque</h2>
            </div>
          </div>
          <div className="col-lg-12">
            <Slider {...settings}>
              {profissionais.map((profissional) => (
                <CardDestaqueProfissionais
                  profissional={profissional}
                  key={profissional.idProfissional}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
