import React from "react";
import Carrousel from "react-slick";
import "./filtro.css";

function Filtro({ filtros, itensFiltrado }) {
  const breakPoints = [
    { width: 1, itemsToShow: 1, pagination: false },
    { width: 600, itemsToShow: 2, pagination: false },
    { width: 860, itemsToShow: 5, pagination: false },
    { width: 1100, itemsToShow: 5, pagination: false },
    { width: 1700, itemsToShow: 6, pagination: false },
  ];

  return (
    <div className="filtro__segmento">
      <Carrousel breakPoints={breakPoints}>
        {filtros.map((filtro, id) => {
          return (
            <label
              className="card__segmento"
              key={id}
              onClick={() => itensFiltrado(filtro)}
            >
              <h2 className="segmento__titulo">{filtro}</h2>
              <input type="radio" className="input-radio" name="teste" />
              <span className="check"></span>
            </label>
          );
        })}
      </Carrousel>
    </div>
  );
}

export default Filtro;
