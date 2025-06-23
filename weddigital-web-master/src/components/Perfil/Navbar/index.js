import React, { useContext } from "react";
import "./Navbar.css";

import IconWed from "../../../assets/icon.ico";

import UserContext from "../../../api/userContext-api/userContext";
import DadosConfig from "../../../config.json";
import ModalTesteGratis from "../../Modal/ModalTesteGratis";
import PropTypes from "prop-types";

export default function Navbar({ toggleState, toggleMove, nivelContaEmpresa }) {
  const { token, setToken } = useContext(UserContext);

  let dadosToken = token.split(".");

  function onSubmit(ev) {
    ev.preventDefault();
    setToken("");
    window.location.href = DadosConfig.api.linkPublico;
  }

  const resumo = document.getElementsByClassName("resumo-profissional");
  const isResumoFree = nivelContaEmpresa === "Free" && resumo.length !== 0;
  const isNotResumoFree = nivelContaEmpresa !== "Free" || resumo.length === 0;

  return (
    <div className="top-bar">
      <div className="content">
        <button className="toggler-navbar" onClick={toggleMove}>
          <i className="fa fa-bars"></i>
        </button>
        {isResumoFree && <ModalTesteGratis />}
        {isNotResumoFree && (
          <a className="logo">
            <img src={IconWed} alt="Ícone Wed Digital" />
            <span>Wed Digital</span>
          </a>
        )}
        <button className="logout" onClick={onSubmit}>
          <span>Sair</span>
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  toggleMove: PropTypes.func.isRequired,
  nivelContaEmpresa: PropTypes.string.isRequired,
  toggleState: PropTypes.func.isRequired,
};
