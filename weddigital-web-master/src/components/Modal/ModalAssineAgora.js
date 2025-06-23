import React from "react";
import configServer from "../../config.json";

export default function ModalAssineAgora(props) {
  return (
    <div className="container pt-3 modal-assine-agora">
      <div className="d-lg-flex align-items-center justify-content-center pt-4 pb-5 text-lg-start text-center">
        <div className="title mb-0 pb-0" style={{ borderBottom: 0 }}>
          <h5 className={`mb-0 ${props.textColor}`}>
            <span>{props.titulo}</span>
          </h5>
        </div>
        <a href={`${configServer.api.linkPublico}/planos-profissional`}>
          <button className="btn btn-primary px-3 py-2 mt-lg-0 mt-4 ms-lg-4">
            <small>ASSINAR AGORA</small>
          </button>
        </a>
      </div>
    </div>
  );
}
