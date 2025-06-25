import React, { useEffect, useState } from "react";
import "./Chat.css";

import api from "../../../api";
import Model from "../../../utils/models/MensagensModel";

import MensagemItem from "./MensagemItem";
import CarregandoPlaceholder from "../../Modal/CarregandoPlaceholder";
import { format } from "date-fns";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default function CardChat(props) {
  const [ConteudoMensagem, setConteudoMensagem] = useState([]);
  const [IsCarregandoPlaceholder, setIsCarregandoPlaceholder] = useState(false);
  const [MensagemEnvio, setMensagemEnvio] = useState(Model.ChatMensagem);
  const [listaConteudoMensagens, setListaConteudoMensagens] = useState([]);
  const [imagePerfilChat, setImagePerfilChat] = useState(
    require(`../../../fileContents/imagensPerfil/avatar.jpg`),
  );

  let nomeContato = props.dadosConversa.nomeContato;
  // let dataCasamento = props.dadosConversa.dataCasamento;
  let isProfissional = props.isProfissional;
  let idProfissional = props.dadosConversa.idProfissional;
  let idCliente = props.dadosConversa.idCliente;
  let nivelConta = props.nivelConta;
  let clientRef = props.clientRef;
  let atingiuLimiteResposta = props.dadosConversa.atingiuLimiteResposta;

  let email = props.dadosConversa.email ? props.dadosConversa.email : "";
  let contato = props.dadosConversa.contato ? props.dadosConversa.contato : "";
  let contatoFormatado = props.dadosConversa.contatoFormatado
    ? props.dadosConversa.contatoFormatado
    : "";

  const verificaAlteracao = () => {
    if (props.isAlterado) {
      props.setAlterado(false);
      carregarMensagens();
    }
  };

  useEffect(() => {
    verificaAlteracao();
  }, [props.isAlterado]);

  useEffect(() => {
    setListaConteudoMensagens(
      ConteudoMensagem.map((it) => {
        let dataEnvio = format(
          new Date(it.dataEnvioMensagem),
          "dd/MM/yy - HH:mm",
        );
        return (
          <MensagemItem
            key={it.dataEnvioMensagem}
            conteudoMensagem={it.corpoMensagem}
            myselfSend={it.enviadoPorProfissional === isProfissional}
            dataEnvioMensagem={dataEnvio}
          />
        );
      }),
    );
  }, [ConteudoMensagem]);

  useEffect(() => {
    let chat = document.getElementById("listagem-chat");
    // chat.scrollTo(chat.scrollWidth, chat.scrollHeight);
  }, [listaConteudoMensagens]);

  useEffect(() => {
    verificaAlteracao();
  }, []);

  let tokenUsuario = props.tokenUsuario;

  function carregarMensagens() {
    api
      .get(
        `mensagens/listarConteudoMensagem?idProfissional=${idProfissional}&idCliente=${idCliente}`,
      )
      .then(({ data }) => {
        setConteudoMensagem(data);
        setIsCarregandoPlaceholder(false);
        if (props.dadosConversa.fotoPerfil) {
          setImagePerfilChat(props.dadosConversa.fotoPerfil);
        } else {
          let image = require("../../../fileContents/imagensPerfil/avatar.jpg");
          setImagePerfilChat(image);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
        let chat = document.querySelector(
          "section.chat-orcamentos div.content div.chat ul.chat",
        );
        setTimeout(() => {
          if (chat) {
            chat.scrollTo(8888, 8888);
          }
        }, 200);
      })
      .catch(({ error }) => {
        console.error(error);
        setIsCarregandoPlaceholder(false);
      });
  }

  function onChange(ev) {
    ev.preventDefault();
    const { value, name } = ev.target;
    setValueMessage(value);
    setMensagemEnvio({
      ...MensagemEnvio,
      [name]: value,
      idProfissional: idProfissional,
      idCliente: idCliente,
    });
  }

  function changeMessage(element) {
    let text = "";
    if (element.target.querySelector("span")) {
      text = element.target.querySelector("span").innerHTML;
    } else {
      text = element.target.innerHTML;
    }
    setValueMessage(text);
    setMensagemEnvio({
      ...MensagemEnvio,
      corpoMensagem: text,
      idProfissional: idProfissional,
      idCliente: idCliente,
    });
  }

  const [valueMessage, setValueMessage] = useState("");

  function enviarMensagem() {
    if (atingiuLimiteResposta) {
      props.mensageAlerta(true);
      return;
    }

    let campoCorpoMensagem = document.getElementById("campoCorpoMensagem");

    clientRef.sendMessage(
      "/mensagem/enviar",
      JSON.stringify({
        enviadoPorProfissional: isProfissional,
        tokenUsuario: tokenUsuario,
        mensagemEnviada: MensagemEnvio,
      }),
    );
    campoCorpoMensagem.value = "";
    setValueMessage("");

    let chat = document.querySelector(
      "section.chat-orcamentos div.content div.chat ul.chat",
    );
    setTimeout(() => {
      if (chat) {
        chat.scrollTo(8888, 8888);
      }
    }, 200);
  }

  function handleEnter(event) {
    if (event.key === "Enter") {
      enviarMensagem();
    }
  }

  return (
    <div>
      {IsCarregandoPlaceholder ? (
        <div className="chat__container_box">
          <CarregandoPlaceholder />
        </div>
      ) : (
        <>
          <div className="header">
            <button className="back" onClick={() => props.open(false)}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <a
              href={`/buscar-profissional/detalhes=${idProfissional}`}
              target={"_blank"}
            >
              <div
                className="image"
                style={{
                  background:
                    "url(" + imagePerfilChat + ") no-repeat center/cover",
                }}
              ></div>
            </a>
            <div
              onClick={() => {
                if (nivelConta === 1) {
                  return props.mensageAlerta(true);
                }
              }}
            >
              <span className="name mb-0">{nomeContato}</span>
              {isProfissional ? (
                <>
                  <span className="is-online" style={{ marginTop: "0.5rem" }}>
                    WhatsApp: {contatoFormatado}
                  </span>
                  <a
                    className="is-online"
                    style={{ marginTop: "0.5rem" }}
                    href={`mailto:${email}`}
                    target="_blank"
                  >
                    E-mail: {email}
                  </a>
                </>
              ) : (
                ""
              )}
              {/*<span className="is-online">Online</span>*/}
            </div>
          </div>
          <div className="footer">
            <input
              type="text"
              id="campoCorpoMensagem"
              name="corpoMensagem"
              placeholder={
                atingiuLimiteResposta
                  ? "Você atingiu o limite de respostas enviadas. Assine nossos planos para poder responder sua solicitação de orçamento"
                  : "Insira seu texto aqui..."
              }
              value={valueMessage}
              onChange={onChange}
              readOnly={atingiuLimiteResposta}
              onKeyPress={handleEnter}
            />
            <button
              id="btnEnvioMensagemChat"
              className="send"
              onClick={enviarMensagem}
              readOnly={atingiuLimiteResposta}
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
            {props.isProfissional ? (
              <div className="templates-message">
                <OwlCarousel
                  className="owl-theme"
                  loop={false}
                  nav={false}
                  dots={false}
                  margin={16}
                  autoWidth
                >
                  <div className="item_">
                    <button onClick={(element) => changeMessage(element)}>
                      <span>
                        Olá, tudo bem ? Que bom te ver aqui. 😍 Posso te enviar
                        um orçamento de imediato e é bem simples e rápido, nos
                        envia seu melhor contato por gentileza.
                      </span>
                    </button>
                  </div>
                  <div className="item_">
                    <button onClick={(element) => changeMessage(element)}>
                      <span>Não temos sua data disponível</span>
                    </button>
                  </div>
                  <div className="item_">
                    <button onClick={(element) => changeMessage(element)}>
                      <span>Olá, tudo bem?</span>
                    </button>
                  </div>
                  <div className="item_">
                    <button onClick={(element) => changeMessage(element)}>
                      <span>Opa! Estamos disponíveis sim</span>
                    </button>
                  </div>
                  <div className="item_">
                    <button onClick={(element) => changeMessage(element)}>
                      <span>Olá, tudo bem?</span>
                    </button>
                  </div>
                  <div className="item_">
                    <button onClick={(element) => changeMessage(element)}>
                      <span>Opa! Estamos disponíveis sim</span>
                    </button>
                  </div>
                </OwlCarousel>
              </div>
            ) : (
              <></>
            )}
          </div>
          <ul className="chat">{listaConteudoMensagens}</ul>
        </>
      )}
    </div>
  );
}
