import React from "react";
import MoneyIcon from "../../../../assets/icons/money.png";
import CalendarIcon from "../../../../assets/icons/calendar.png";
import CarregandoPlaceholder from "../../../../components/Modal/CarregandoPlaceholder";

export default function CardInfo(props) {
  const {
    descricao,
    styleCardInfo,
    styleCardOrcamento,
    valorMinimo,
    abrirPopup,
    carregando,
  } = props;
  return (
    <div className="info">
      {descricao && (
        <div className="backDescricao" style={styleCardInfo}>
          <p>{descricao}</p>
        </div>
      )}
      <div className="backInfo" style={styleCardOrcamento}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            style={{
              width: 22,
              height: 22,
              marginRight: 5,
              objectFit: "contain",
            }}
            src={MoneyIcon}
            alt=""
          />
          <span>Preço a partir de {valorMinimo}</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <img
            style={{
              width: 22,
              height: 22,
              marginRight: 5,
              objectFit: "contain",
            }}
            src={CalendarIcon}
            alt=""
          />
          <span>Datas ainda disponíveis</span>
        </div>
        <div className="text-center button-pedir-orcamento mt-4">
          {carregando ? (
            <CarregandoPlaceholder />
          ) : (
            <button className="btn btn-primary" onClick={abrirPopup}>
              <span>Pedir orçamento grátis</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
