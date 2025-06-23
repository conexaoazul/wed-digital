import { number, string } from "prop-types";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import "./FloatingZap.css";

export default function FloatingZap(props) {
  return (
    <FloatingWhatsApp
      className="zap-cadastro"
      phoneNumber={props.numero.toString()}
      accountName={props.nomeConta}
      avatar={
        "https://weddigital.com.br/static/media/icon.c9427a3bd1d1c478fd30.ico"
      }
      chatMessage={props.mensagem}
      placeholder="Digite uma mensagem"
      allowClickAway
      allowEsc
      statusMessage={props.mensagemStatus}
    />
  );
}

FloatingZap.propTypes = {
  numero: number,
  nomeConta: string,
  mensagem: string,
  mensagemStatus: string,
};
