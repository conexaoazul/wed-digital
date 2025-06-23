import React from "react";
import { bool, string } from "prop-types";

export default function MensagemItem(props) {
  return (
    <li className={props.myselfSend ? "right_" : "left_"}>
      <span className="message">{props.conteudoMensagem}</span>
      <span className="hour">{props.dataEnvioMensagem}</span>
    </li>
  );
}

MensagemItem.propTypes = {
  myselfSend: bool,
  conteudoMensagem: string,
  dataEnvioMensagem: string,
};
