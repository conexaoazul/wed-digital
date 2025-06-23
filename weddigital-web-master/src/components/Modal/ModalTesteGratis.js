import React from "react";
import configServer from "../../config.json";

export default function ModalTesteGratis() {
  return (
    <div className="container pt-5 cta-teste-gratis">
      <div className="d-lg-flex align-items-center justify-content-center text-center">
        <div className="mb-0 pb-0 col-lg-9 titulo">
          <h3 className={`mb-0`}>
            Experimente 14 ou 30 dias de teste e destaque sua empresa
          </h3>
        </div>
        <a
          href={`${configServer.api.linkPublico}/planos-profissional`}
          className="col-lg-3"
        >
          <button className="btn btn-primary py-0 large">
            Ativar teste Pro
          </button>
        </a>
      </div>
    </div>
  );
}
