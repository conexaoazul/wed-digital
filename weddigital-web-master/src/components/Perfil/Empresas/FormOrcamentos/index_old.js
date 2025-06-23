import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import "./FormOrcamento.css";

import api from "../../../../api";

import Cardcontato from "../../MensagensChat/Cardcontato";
import CardChat from "../../MensagensChat/CardChat";

import CarregandoPlaceholder from "../../../Modal/CarregandoPlaceholder";

import empty from "../../../../assets/wed.png";
import background from "../../../../assets/chat.png";
import SockJsClient from "react-stomp";

export default function FormOrcamentos(props) {
  const [IsCarregando, setIsCarregando] = useState(true);
  const [DadosConversa, setDadosConversa] = useState([]);
  const [IdContatoAtivo, setIdContatoAtivo] = useState(0);
  const [idConversaAtual, setIdConversaAtual] = useState();
  const [IsAlterado, setIsAlterado] = useState(true);
  const [listaCardMensagens, setListaCardMensagens] = useState([]);
  const [clientRef, setClientRef] = useState();

  let idProfissional = props.dadosProfissional.idProfissional;
  let tokenUsuario = props.tokenUsuario;

  let nivelConta = props.nivelConta;

  const [chatOpen, setChatOpen] = useState(false);

  function initLoad() {
    api
      .get(`mensagens/profissional/listarConversas/${idProfissional}`)
      .then(({ data }) => {
        setDadosConversa(data);
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

    if (idConversaAtual) {
      setIdContatoAtivo(
        DadosConversa.findIndex((it) => it.idCliente == idConversaAtual),
      );
    }

    setListaCardMensagens(
      DadosConversa.map((it, index) => {
        return (
          <Cardcontato
            idItem={index}
            idContato={it.idCliente}
            isAltaredo={setIsAlterado}
            setContatoAtivo={setIdContatoAtivo}
            setIdConversaAtual={setIdConversaAtual}
            nome={it.nomeContato}
            fotoPerfil={it.fotoPerfil ? it.fotoPerfil : imagePerfilChatDefault}
            isOnline={true}
            isActive={index == IdContatoAtivo ? true : false}
          />
        );
      }),
    );
  }

  useEffect(() => {
    loadCardsMensagem();
  }, [DadosConversa, IdContatoAtivo]);

  return (
    <>
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
              url={
                api.defaults.baseURL.replace("/api", "") + "/ws/websocket-chat/"
              }
              url={api.defaults.baseURL + "/ws/websocket-chat/"}
              topics={["/weddigital/mensagem"]}
              onConnect={() => {
                console.log("connected to chat");
              }}
              onDisconnect={() => {
                console.log("Disconnected from chat");
              }}
              onMessage={(msg) => {
                // Mensagem recebida
                if (
                  msg != null &&
                  msg.statusCodeValue === 200 &&
                  msg.body.split("&").find((i) => i == idProfissional)
                ) {
                  setIsAlterado(true);
                  setIdConversaAtual(DadosConversa[IdContatoAtivo].idCliente);
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
                        {/* <div className="filters">
													<div className="row g-2">
														<div className="col-auto">
															<span className="active">Todas</span>
														</div>
														<div className="col-auto">
															<span>Lidas</span>
														</div>
														<div className="col-auto">
															<span>Não lidas</span>
														</div>
														<div className="col-auto">
															<span>Em andamento</span>
														</div>
														<div className="col-auto">
															<span>Contratadas</span>
														</div>
														<div className="col-auto">
															<span>Não contratadas</span>
														</div>
													</div>
												</div> */}
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
                                Não há nenhuma solicitação de orçamento no
                                momento
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
                            dadosConversa={DadosConversa[IdContatoAtivo]}
                            isProfissional={true}
                            tokenUsuario={tokenUsuario}
                            nivelConta={nivelConta}
                            clientRef={clientRef}
                          />
                        ) : (
                          <img src={empty} className="empty" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-lg-flex align-items-center justify-content-center pt-3 pb-5 text-lg-start text-center">
                      <div
                        className="title mb-0 pb-0"
                        style={{ borderBottom: 0 }}
                      >
                        <h5 className="mb-0 px-lg-0 px-5">
                          <span>
                            Aumente suas solicitações de noivos e saia na frente
                          </span>
                        </h5>
                      </div>
                      <button className="btn btn-secondary px-3 py-2 mt-lg-0 mt-4 ms-lg-4">
                        <span>ASSINAR AGORA</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* end chat orçamentos */}
          </>
        )}
      </div>
    </>
  );
}
