import React, { useState } from "react";
import "./ProfissionaisContratados.css";

export const unCheckNenhum = {
  contratouLocal: "false",
  contratouCerimonial: "false",
  contratouBuffet: "false",
  contratouFotografia: "false",
  contratouVideo: "false",
  contratouMusica: "false",
  contratouDecoracao: "false",
  contratouCelebrante: "false",
  contratouBolo: "false",
  isCasamentoMarcado: "false",
};

const unCheckNenhumWedChecked = {
  contratouLocal: "false",
  contratouCerimonial: "false",
  contratouBuffet: "false",
  contratouFotografia: "false",
  contratouVideo: "false",
  contratouMusica: "false",
  contratouDecoracao: "false",
  contratouCelebrante: "false",
  contratouBolo: "false",
  isCasamentoMarcado: "true",
};

export default function ProfissionaisContratados({
  onChangeData,
  onNenhumDeles,
}) {
  let initialState = {
    contratouLocal: false,
    contratouCerimonial: false,
    contratouBuffet: false,
    contratouFotografia: false,
    contratouVideo: false,
    contratouMusica: false,
    contratouDecoracao: false,
    contratouCelebrante: false,
    contratouBolo: false,
    isCasamentoMarcado: false,
  };

  const [option, setOption] = useState(initialState);
  const handleChange = (e) => {
    e.target.value = e.target.checked;
    onChangeData(e);
    setOption((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));
  };
  const handleOffAll = (e) => {
    if (e.target.checked) {
      setOption(initialState);
      onNenhumDeles(unCheckNenhum);
    }
  };
  const handleOffAllWedChecked = (e) => {
    if (e.target.checked) {
      const wedChecked = initialState;
      wedChecked.isCasamentoMarcado = true;
      setOption(wedChecked);
      onNenhumDeles(unCheckNenhumWedChecked);
    } else {
      onChangeData({ target: { name: "isCasamentoMarcado", value: "false" } });
      setOption((prevState) => ({
        ...prevState,
        isCasamentoMarcado: false,
      }));
    }
  };
  const isAnySelected = Object.values(option).some((val) => val === true);

  return (
    <div className="col-lg-4 mx-auto">
      <div className="row">
        <div className="col-lg-12">
          <h2>Quais desses fornecedores</h2>
          <h2 className="mb-2">
            você <b>JÁ CONTRATOU?</b>
          </h2>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="contratouLocal"
            name="contratouLocal"
            checked={option.contratouLocal}
            onChange={handleChange}
          />
          <label htmlFor="contratouLocal" className="form-check-label">
            Local/espaço
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="contratouCerimonial"
            name="contratouCerimonial"
            checked={option.contratouCerimonial}
            onChange={handleChange}
          />
          <label htmlFor="contratouCerimonial" className="form-check-label">
            Assessoria/Cerimonial
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="contratouBuffet"
            name="contratouBuffet"
            checked={option.contratouBuffet}
            onChange={handleChange}
          />
          <label htmlFor="contratouBuffet" className="form-check-label">
            Buffet
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="contratouFotografia"
            name="contratouFotografia"
            checked={option.contratouFotografia}
            onChange={handleChange}
          />
          <label htmlFor="contratouFotografia" className="form-check-label">
            Fotografia
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="contratouVideo"
            name="contratouVideo"
            checked={option.contratouVideo}
            onChange={handleChange}
          />
          <label htmlFor="contratouVideo" className="form-check-label">
            Vídeo
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="contratouMusica"
            name="contratouMusica"
            checked={option.contratouMusica}
            onChange={handleChange}
          />
          <label htmlFor="contratouMusica" className="form-check-label">
            Música
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="contratouDecoracao"
            name="contratouDecoracao"
            checked={option.contratouDecoracao}
            onChange={handleChange}
          />
          <label htmlFor="contratouDecoracao" className="form-check-label">
            Decoração
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="contratouCelebrante"
            name="contratouCelebrante"
            checked={option.contratouCelebrante}
            onChange={handleChange}
          />
          <label htmlFor="contratouCelebrante" className="form-check-label">
            Celebrantes
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="contratouBolo"
            name="contratouBolo"
            checked={option.contratouBolo}
            onChange={handleChange}
          />
          <label htmlFor="contratouBolo" className="form-check-label">
            Bolos e Doces
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="none"
            name="none"
            checked={option.isCasamentoMarcado}
            onChange={handleOffAllWedChecked}
          />
          <label htmlFor="none" className="form-check-label">
            Nenhum deles, mas já tenho data marcada
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="none"
            name="none"
            checked={!isAnySelected}
            onChange={handleOffAll}
          />
          <label htmlFor="none" className="form-check-label">
            Nenhum, não tenho data marcada
          </label>
        </div>
      </div>
    </div>
  );
}
