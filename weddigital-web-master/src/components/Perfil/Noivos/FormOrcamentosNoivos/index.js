import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import "./FormOrcamento.css";

import Cardcontato from "../../MensagensChat/Cardcontato";
import api from "../../../../api";
import SockJsClient from "react-stomp";

import CarregandoPlaceholder from "../../../Modal/CarregandoPlaceholder";
import CardChat from "../../MensagensChat/CardChat";

import empty from "../../../../assets/wed.png";
import background from "../../../../assets/chat.png";

export default function FormOrcamentos(props) {
  const [IsCarregando, setIsCarregando] = useState(true);
  const [DadosMensagem, setDadosMensagem] = useState([]);
  const [IdContatoAtivo, setIdContatoAtivo] = useState(0);
  const [IsAlterado, setIsAlterado] = useState(true);
  const [idConversaAtual, setIdConversaAtual] = useState();
  const [clientRef, setClientRef] = useState();

  const [chatOpen, setChatOpen] = useState(false);

  let idCliente = props.dadosResumoPerfil.idNoivX;
  let tokenUsuario = props.tokenUsuario;

  function initLoad() {
    api
      .get(
        `mensagens/cliente/listarConversas/${idCliente}?tokenUsuario=${tokenUsuario}`,
      )
      .then(({ data }) => {
        setDadosMensagem(data);
        setIsCarregando(false);
        //eslint-disable-next-line react-hooks/exhaustive-deps
      })
      .catch(({ error }) => {
        console.error(error);
        setIsCarregando(false);
      });
  }

  useEffect(() => {
    initLoad();
  }, []);

  function loadCardsMensagem() {
    let imagePerfilChatDefault = require("../../../../fileContents/imagensPerfil/avatar.jpg");
  }

  let listaCardMensagens = [];

  for (let i = 0; i < DadosMensagem.length; i++) {
    let imagePerfilChat = require("../../../../fileContents/imagensPerfil/avatar.jpg");

    if (DadosMensagem[i].fotoPerfil) {
      imagePerfilChat = DadosMensagem[i].fotoPerfil;
    }

    listaCardMensagens.push(
      <Cardcontato
        idItem={i}
        open={setChatOpen}
        isAltaredo={setIsAlterado}
        setContatoAtivo={setIdContatoAtivo}
        nome={DadosMensagem[i].nomeContato}
        fotoPerfil={imagePerfilChat}
        isOnline={true}
        isActive={i == IdContatoAtivo}
        setIdConversaAtual={setIdConversaAtual}
      />,
    );
  }

  return (
    <div>
      <Helmet>
        <title>Orçamentos - WedDigital</title>
      </Helmet>

      {IsCarregando ? (
        <CarregandoPlaceholder />
      ) : (
        <>
          {/* background */}
          <section
            className="background slim"
            style={{
              background:
                "linear-gradient(45deg, var(--color-dark), var(--color-secondary))",
            }}
          ></section>
          {/* end background */}
          <SockJsClient
            url={api.defaults.baseURL + "/ws/websocket-chat/"}
            topics={["/weddigital/mensagem"]}
            onConnect={() => {
              console.log("connected");
            }}
            onDisconnect={() => {
              console.log("Disconnected");
            }}
            onMessage={(msg) => {
              // Mensagem recebida
              if (
                msg != null &&
                msg.statusCodeValue === 200 &&
                msg.body.split("&").find((i) => i == idCliente)
              ) {
                setIsAlterado(true);
                setIdConversaAtual(
                  DadosMensagem[IdContatoAtivo].idProfissional,
                );
                initLoad();
              }
            }}
            ref={(client) => {
              // Client usado para enviar mensagens
              setClientRef(client);
            }}
          />
          {/* chat orçamentos */}
          <section className="chat-orcamentos">
            <div className="container">
              <div className="row g-4">
                <div className="col-lg-12">
                  <div className="content">
                    <div className={"chat-list " + (chatOpen ? "" : "open")}>
                      <div className="back_">
                        <button
                          onClick={() => props.tabLocation("resumo")}
                          className="link"
                        >
                          <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <h6>Mensagens</h6>
                      </div>
                      <ul>
                        {listaCardMensagens.length > 0 ? (
                          listaCardMensagens
                        ) : (
                          <li
                            className="p-5 text-center"
                            style={{ borderBottom: 0 }}
                          >
                            <span
                              className="message"
                              style={{ lineHeight: 1.6 }}
                            >
                              Não há nenhuma solicitação de orçamento no momento
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div
                      className={"chat " + (chatOpen ? "open" : "")}
                      style={{
                        background:
                          "linear-gradient(0deg, hsla(273.68deg 100% 22.35% / 5%), hsla(273.68deg 100% 22.35% / 5%)), hsla(273.68deg 100% 22.35% / 5%) url(" +
                          background +
                          ") repeat center/50%",
                      }}
                    >
                      {listaCardMensagens.length > 0 ? (
                        <CardChat
                          open={setChatOpen}
                          isAlterado={IsAlterado}
                          setAlterado={setIsAlterado}
                          dadosConversa={DadosMensagem[IdContatoAtivo]}
                          isProfissional={false}
                          tokenUsuario={tokenUsuario}
                          clientRef={clientRef}
                        />
                      ) : (
                        <img src={empty} className="empty" alt="empty" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* end chat orçamentos */}
        </>
      )}
    </div>
  );
}
