import React, { useContext, useState } from "react";
import "./FormResumo.css";

import { message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { obterEstadoPorSigla } from "../../../../utils/Utils";
import { MdPhotoCamera } from "react-icons/md";
import api from "../../../../api";
import UserContext from "../../../../api/userContext-api/userContext";
import constantes from "../../../../constantes.json";
import alertaIcon from "../../../../assets/icons/sinal-de-aviso.png";
import { sendImageS3 } from "../../../../utils/imageResizer";
import CTAConvideAmigoMobile from "../../../CTA/CTAConvideAmigoMobile";
import CTAConvideAmigo from "../../../CTA/CTAConvideAmigo";

const imageProfileDefault = require("../../../../fileContents/imagensPerfil/avatar.jpg");
const isAmbienteProducao = constantes["ambiente-producao"];

export default function FormResumo(props) {
  const { token } = useContext(UserContext);
  let dadosToken = token.split("_");
  let tokenUsuario = dadosToken[2];

  let dadosPerfil = props.dadosUsuario;
  let nivelConta = props.dadosStatusPontuacao;
  let percentBar =
    (props.dadosStatusPontuacao.pontoMinimo * 100) /
    props.dadosStatusPontuacao.pontoMaximo;

  const [imageUrl, setImageUrl] = useState(
    dadosPerfil.linkFotoPerfil
      ? dadosPerfil.linkFotoPerfil
      : imageProfileDefault,
  );
  const [messageApi] = message.useMessage();

  // Verificar tamanho e formato da imagem
  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isJpgOrPng) {
      messageApi.open({
        type: "error",
        content: "Os únicos formatos permitidos são: .PNG / .jpeg / .jpg!",
        style: {
          marginTop: "4rem",
        },
      });
    }
    const isLt5MB = file.size / 1024 / 1024 < 5;
    if (!isLt5MB) {
      messageApi.open({
        type: "error",
        content: "A imagem deve ser de no máximo 5MB!",
        style: {
          marginTop: "4rem",
        },
      });
    }
    return isJpgOrPng && isLt5MB;
  };

  // Upload Image
  function uploadImagePerfil(ev) {
    if (ev.file.status === "uploading") {
      return;
    }

    //Send image S3 storage
    sendImageS3(ev.file.originFileObj)
      .then((response) => {
        setImageUrl(response.data.location);
        setImageUrl(response.data.location);
        atualizarDatabaseComLinkImagem(response.data, "uploadImagensPerfil");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function atualizarDatabaseComLinkImagem(dadosImagem, destinoImagem) {
    const imageDTO = {
      idUsuario: dadosPerfil.idUsuario,
      tokenUsuario: tokenUsuario,
      nomeImagem: dadosImagem.key,
      urlImagem: dadosImagem.location,
    };

    if (isAmbienteProducao) {
      api
        .post(`imagens/${destinoImagem}`, imageDTO)
        .then((response) => {
          if (response.data === "userNotFound") {
            console.log(`userNotFound`);
          }
        })
        .catch((error) => {
          console.error(`Ocorreu um erro ao atualiza o database: ${error}`);
        });
    }
  }

  return (
    <>
      {/* background */}
      <section className="background">
        {/*<div className="container">*/}
        {/*<div className="content_">*/}
        {/*  <button>*/}
        {/*    <MdPhotoCamera className="icon" />*/}
        {/*  </button>*/}
        {/*</div>*/}
        {/*</div>*/}
      </section>
      {/* end background */}
      {/* resumo */}
      <section className="resumo resumo-profissional">
        <div className="container">
          <div className="row g-4">
            {/* principal */}
            <div className="col-lg-12">
              <div className="principal">
                <div className="row g-5">
                  <div className="col-lg-3 col-5 mx-lg-0 mx-auto">
                    <div
                      className="image"
                      style={{
                        background: `#efefef url(${imageUrl}) no-repeat center/cover`,
                      }}
                    >
                      <button className="change-photo">
                        <ImgCrop rotationSlider aspect={1}>
                          <Upload
                            name="avatar"
                            listType="picture-circle"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={uploadImagePerfil}
                          >
                            <MdPhotoCamera
                              onClick={beforeUpload}
                              style={{ zIndex: "5" }}
                            />
                          </Upload>
                        </ImgCrop>
                      </button>
                    </div>
                    <div className="nivel_ mx-auto pt-4 mt-lg-0">
                      <span>Plano</span>
                      <span>{nivelConta.nivelContaNome}</span>
                    </div>
                    {props.dadosUsuario.isPerfilVisivelMarketplace === false ? (
                      <div className="nivel_ mx-auto col-lg-9">
                        <button
                          type="button"
                          style={{ minWidth: 240 }}
                          className="btn btn-danger"
                          onClick={() => props.setTabLocation("meuPerfil")}
                        >
                          Perfil Inativo! Resolva{" "}
                          <img
                            style={{ width: 20, marginLeft: 5 }}
                            src={alertaIcon}
                            alt=""
                          />
                        </button>
                        <br />
                        <ul style={{ listStyleType: "disc" }}>
                          {props.dadosUsuario.itensPendentesParaMarketplace.map(
                            (item) => {
                              return (
                                <li key={item} style={{ color: "#dc3545" }}>
                                  {item.replace("imagens", " imagens")}
                                </li>
                              );
                            },
                          )}
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-lg-9">
                    <h4>{dadosPerfil.nomeEmpresa}</h4>
                    <div className="city">
                      {dadosPerfil.cidade ? `${dadosPerfil.cidade} / ` : ""}{" "}
                      {obterEstadoPorSigla(dadosPerfil.estado)}
                    </div>
                    <CTAConvideAmigoMobile onClick={props.handleClick} />
                    <>
                      <div className="progress_ d-lg-flex d-none mt-5">
                        {nivelConta.nivelContaNome !== "Free" ? (
                          <div className="atual">
                            <span>
                              {nivelConta.nivelContaNome}{" "}
                              {nivelConta.nivelStatusNome
                                ? ` - ${nivelConta.nivelStatusNome}`
                                : ""}
                            </span>
                          </div>
                        ) : (
                          ""
                        )}

                        <div className="bar_">
                          <span>
                            <span style={{ width: percentBar + "%" }}></span>
                          </span>
                        </div>
                        <div className="proximo">
                          {nivelConta.nivelContaNome !== "Free" ? (
                            <span>
                              {nivelConta.nivelContaNome}{" "}
                              {nivelConta.nivelContaNome !== "Free"
                                ? nivelConta.proximoNivel
                                : ""}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="progress_ d-lg-none d-block mt-5">
                        <div className="bar_ w-100 px-0 pb-2">
                          <span>
                            <span style={{ width: percentBar + "%" }}></span>
                          </span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div className="atual">
                            {nivelConta.nivelContaNome !== "Free" ? (
                              <span>
                                {nivelConta.nivelContaNome}{" "}
                                {nivelConta.nivelStatusNome}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="proximo">
                            {nivelConta.nivelContaNome !== "Free" ? (
                              <span>
                                {nivelConta.nivelContaNome}{" "}
                                {nivelConta.nivelContaNome !== "Free"
                                  ? nivelConta.proximoNivel
                                  : ""}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="progress_ mt-1 align-items-start">
                        {nivelConta.nivelContaNome !== "Free" ? (
                          <div className="atual">
                            <label>Status atual</label>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="bar_">
                          {/* <label>Casamentos bem sucedidos: {nivelConta.numeroCasamentosBemSucedidos}</label> */}
                        </div>
                        {nivelConta.nivelContaNome !== "Free" ? (
                          <div className="proximo">
                            <label>Próximo status</label>
                            <small>
                              {nivelConta.pontoMaximo + 1} Casamentos
                            </small>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </>

                    <div className="counters">
                      <div className="row g-4">
                        {dadosPerfil.visitasVitrine >= 30 ? (
                          <div className="col-lg col-6">
                            <div className="item">
                              <label>Visitas em seu perfil</label>
                              <span>{dadosPerfil.visitasVitrine}</span>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="col-lg col-6">
                          <div className="item">
                            <label>Orçamentos solicitados</label>
                            <span>{dadosPerfil.orcamentosRecebidos}</span>
                          </div>
                        </div>
                        {/* item */}
                        <div className="col-lg col-6">
                          <div className="item">
                            <label>Casamentos bem sucedidos</label>
                            <span>{dadosPerfil.casamentosBemSucedidos}</span>
                          </div>
                        </div>
                        {/*/!* item *!/*/}
                        {/*<div className="col-lg col-6">*/}
                        {/*	<div className="item">*/}
                        {/*		<label>Feedbacks recebidos</label>*/}
                        {/*		<span>{dadosPerfil.feedbacksRecebidos}</span>*/}
                        {/*	</div>*/}
                        {/*</div>*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end principal */}
            {<CTAConvideAmigo onClick={props.handleClick} />}
          </div>
        </div>
      </section>
      <div id="botao-aprenda">
        <a href={"https://youtu.be/0cVxC_pIOeg?si"}>
          <button
            style={{ marginBottom: 10, flexDirection: "column" }}
            className="btn px-3 py-2 mt-lg-0 mt-4 ms-lg-4"
          >
            <small>Aprenda a criar o seu </small>
            <small>perfil tocando AQUI</small>
          </button>
        </a>
      </div>
      {/* end resumo */}
    </>
  );
}
