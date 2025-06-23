import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";

import CardProfissionalIndicado from "./CardProfissionalIndicado";
import CarregandoPlaceholder from "../../../../Modal/CarregandoPlaceholder";
import api from "../../../../../api";
import PropTypes from "prop-types";

export default function IndicacaoProfissional(props) {
  let estado = props.estado;

  const [listaProfissionais, setListaProfissionais] = useState([]);
  const [isCarregando, setIsCarregando] = useState(true);

  useEffect(() => {
    api
      .get(`profissionais/obterListaProfissionaisIndicados?estado=${estado}`)
      .then(({ data }) => {
        setListaProfissionais(data);
        setIsCarregando(false);
        //eslint-disable-next-line react-hooks/exhaustive-deps
      })
      .catch(() => {
        setIsCarregando(false);
      });
  }, []);

  const options = {
    responsive: {
      0: {
        items: 1,
      },
      1000: {
        items: 4,
      },
    },
  };

  return (
    <div className="col-lg-12">
      <div className="profissional-list">
        <div className="row g-4">
          {/* title */}
          <div className="col-lg-12">
            <div className="title pt-lg-4">
              <h2 className="mb-0">Indicados para você</h2>
            </div>
          </div>
          {/* list */}
          {isCarregando ? (
            <CarregandoPlaceholder />
          ) : (
            <div className="col-lg-12">
              <OwlCarousel
                className="owl-theme"
                loop={false}
                nav={false}
                dots={false}
                margin={16}
                items={4}
                {...options}
              >
                {listaProfissionais.map((profisisonal) => (
                  <CardProfissionalIndicado
                    key={profisisonal.idProfissional}
                    nomeEmpresa={profisisonal.nomeEmpresa}
                    imagemEmpresa={profisisonal.imagemMarketplace}
                    linkPerfilProfissional={profisisonal.idProfissional}
                    segmento={profisisonal.segmento}
                  />
                ))}
              </OwlCarousel>
            </div>
          )}
          {/* end list */}
        </div>
      </div>
    </div>
  );
}

IndicacaoProfissional.propTypes = {
  estado: PropTypes.string,
};
