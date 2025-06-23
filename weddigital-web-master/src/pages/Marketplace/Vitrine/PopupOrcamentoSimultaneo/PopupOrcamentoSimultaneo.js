import React, { useContext, useState } from "react";
import "./popupOrcamentoSimultaneo.css";
import Card from "./Card";
import api from "../../../../api";
import UserContext from "../../../../api/userContext-api/userContext";

function PopupOrcamentoSimultaneo(props) {
  const [value, setValue] = useState(
    "Olá! Vamos nos casar e gostariamos de mais informações sobre seu serviço.",
  );
  const [checkedState, setCheckedState] = useState({});

  const { token } = useContext(UserContext);

  let dadosToken = token.split("_");
  let idClienteReq = dadosToken[1];
  let tokenUsuario = dadosToken[2];

  let dadosProfissionaisPopUpFilter = [];
  let listaCardsProfissionais = [];

  const handleSelectProfissional = (e) => {
    setCheckedState((p) => ({ ...p, [e.target.name]: e.target.checked }));
  };

  for (let i = 0; i < props.listaProfissionaisFiltrados.length; i++) {
    listaCardsProfissionais.push(
      <Card
        key={i}
        dadosProfissionais={props.listaProfissionaisFiltrados[i]}
        handleSelectProfissional={handleSelectProfissional}
      />,
    );

    dadosProfissionaisPopUpFilter.push(props.listaProfissionaisFiltrados[i]);
  }

  const changeValue = (e) => {
    setValue(e.target.value);
  };

  function enviarOrcamentoSimultaneo() {
    let corpoMensagemReq = value;
    let profissionaisSelecionados = [];

    let sizeProfissionaisSelecionados = Object.keys(checkedState).filter(
      (i) => checkedState[i],
    ).length;

    if (sizeProfissionaisSelecionados > 0) {
      for (let i = 0; i < sizeProfissionaisSelecionados; i++) {
        let profissional = dadosProfissionaisPopUpFilter.find(
          (prof) =>
            prof.nomeEmpresa === dadosProfissionaisPopUpFilter[i].nomeEmpresa,
        );
        profissionaisSelecionados.push(profissional);
      }
    } else {
      return;
    }

    for (const element of profissionaisSelecionados) {
      const dadosPedidoOrcamento = {
        idProfissional: element.idProfissional,
        idCliente: idClienteReq,
        corpoMensagem: corpoMensagemReq,
        tipoUsuarioRemetente: "N",
        tokenUsuarioRemetente: tokenUsuario,
      };

      api
        .post("orcamento/solicitacao", dadosPedidoOrcamento)
        .then(() => {
          window.scrollTo(0, 0);
        })
        .catch((error) => {
          console.error(error);
          window.scrollTo(0, 0);
        });
    }

    props.setOpenPopup(false);
  }

  function selecionarTodos() {
    let array = document.querySelectorAll("input.checkbox-input");
    array.forEach((element) => {
      if (!element.checked) {
        element.click();
      }
    });
  }

  let OrcamentosAsolicitar = Object.keys(checkedState).filter(
    (i) => checkedState[i],
  ).length;
  return (
    <div className="popup">
      <div className="container">
        <div className="popup__container">
          <div
            className="close-container"
            onClick={() => props.setOpenPopup(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
          <div className="row g-4">
            <div className="col-lg-12">
              <div className="d-flex justify-content-between flex-lg-row flex-column mb-4 pe-3">
                <h3>{`Profissionais desse segmento em seu estado que recomendados para você.`}</h3>
                <div className="pe-4">
                  <button className="link" onClick={() => selecionarTodos()}>
                    Selecionar todos
                  </button>
                </div>
              </div>
              <div className="scroll-popup">
                <div className="row g-4">{listaCardsProfissionais}</div>
              </div>
              <div className="col-lg-12">
                <div
                  className="d-flex justify-content-between flex-lg-row flex-column align-items-lg-end"
                  style={{ paddingRight: "2rem", paddingTop: "2rem" }}
                >
                  <div>
                    <label htmlFor="input" className="input-label">
                      Escreva sua mensagem
                    </label>
                    <div>
                      <input
                        type="text"
                        id="input"
                        className="input-text"
                        placeholder="Olá! Vamos nos casar e gostaríamos de mais informações sobre seu serviço."
                        value={value}
                        onChange={changeValue}
                      />
                      <i className="fa-solid fa-pencil"></i>
                    </div>
                  </div>
                  {}
                  <button
                    className="btn btn-primary mt-lg-0 mt-3"
                    onClick={enviarOrcamentoSimultaneo}
                    disabled={OrcamentosAsolicitar === 0}
                  >
                    <span>Solicitar Orçamento ({OrcamentosAsolicitar})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupOrcamentoSimultaneo;
