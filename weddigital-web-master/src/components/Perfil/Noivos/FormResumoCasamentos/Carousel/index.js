import React, { useState } from "react";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { CiBadgeDollar, CiUser, CiVideoOn } from "react-icons/ci";
import PropTypes from "prop-types";

export default function Carousel(props) {
  let dadosCasamento = props.dadosCasamento;

  const [startPosition, setStartPosition] = useState(0);

  function updateCarouselPosition(object) {
    if (object.item.index !== startPosition) {
      setStartPosition(object.item.index);
    }
  }

  return (
    <OwlCarousel
      className="owl-theme"
      startPosition={startPosition}
      onDragged={(object) => {
        updateCarouselPosition(object);
      }}
      loop={false}
      nav={false}
      dots={false}
      margin={16}
      items={3}
    >
      <a
        href={`/buscar-profissional?estado=${localStorage.getItem("estado")}&categoria=&segmento=&pagina=1`}
        className="item"
      >
        <i>
          <CiBadgeDollar />
        </i>
        <span>
          Concorra a<br />
          R$3 mil reais
        </span>
      </a>

      <a
        href="#cursos"
        onClick={(e) => {
          e.preventDefault();
          props.tab("cursos");
        }}
        className="item"
      >
        <i>
          <CiVideoOn />
        </i>
        <span>Materiais e cursos</span>
      </a>

      <a
        href="#pontos"
        onClick={(e) => {
          e.preventDefault();
          props.tab("pontos");
        }}
        className="item"
      >
        <i>{dadosCasamento.pontosAcumulados}</i>
        <span>Pontos acumulados</span>
      </a>

      <a
        href={`/perfil#meusFornecedores`}
        onClick={() => {
          props.tabLocation("meusFornecedores");
        }}
        className="item"
      >
        <i>
          <CiUser />
        </i>
        <span>Meus fornecedores</span>
      </a>
      <a
        href="#inspiracoes"
        onClick={(e) => {
          e.preventDefault();
          props.tab("inspiracoes");
        }}
        className="item"
      >
        <i>
          <HiOutlineLightBulb />
        </i>
        <span>
          Inspirações
          <br /> &nbsp;
        </span>
      </a>
      <butto href=""></butto>
    </OwlCarousel>
  );
}

Carousel.propTypes = {
  dadosCasamento: PropTypes.object,
  tab: PropTypes.any,
  tabLocation: PropTypes.any,
};
