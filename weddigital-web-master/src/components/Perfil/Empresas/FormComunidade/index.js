import React from "react";
import "./FormComunidade.css";

import Config from "../../../../config.json";
import CardPlanos from "../../../PlanosProfissional";

export default function FormComunidade(props) {
	return <CardPlanos nivelConta={props.nivelConta} linkAcesso={Config.comunidade.linkProfissionais} tituloBotao="Acessar comunidade" />;
}
