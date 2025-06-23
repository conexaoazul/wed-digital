import React from "react";
import PropTypes from "prop-types";

export default function CardProfissionalIndicado(props) {
    return (
        <a
            href={`https://weddigital.com.br/buscar-profissional/detalhes/${props.linkPerfilProfissional}`}
            target={"_blank"}
        >
            <div className="item profissional-indicado">
                <div
                    className="image"
                    style={{
                        background: `hsl(0, 0%, 95%) url(${props.imagemEmpresa}) no-repeat center/cover`,
                    }}
                ></div>
                <h4 style={{color: "#400072"}}>{props.nomeEmpresa}</h4>
                <p style={{color: "#400072"}}>{props.segmento}</p>
            </div>
        </a>
    );
}

CardProfissionalIndicado.propTypes = {
    linkPerfilProfissional: PropTypes.string,
    nomeEmpresa: PropTypes.string,
    segmento: PropTypes.string,
    imagemEmpresa: PropTypes.string,
};
