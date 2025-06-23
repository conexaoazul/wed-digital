import React, { useContext, useEffect, useState } from "react";
import "./FormResumoCasamentos.css";

import { GiDiamondRing } from "react-icons/gi";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { CiBadgeDollar, CiChat1, CiUser, CiVideoOn } from "react-icons/ci";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import CardProfissionalIndicado from "./CardProfissionalIndicado";
import { obterEstadoPorSigla } from "../../../../utils/Utils";
import UserContext from "../../../../api/userContext-api/userContext";
import { message, Upload } from "antd";
import api from "../../../../api";
import ImgCrop from "antd-img-crop";
import { MdPhotoCamera } from "react-icons/md";
import PropTypes from "prop-types";
import { sendImageS3 } from "../../../../utils/imageResizer";
import LinkEntrarNaComunidade from "../../../Link/LinkEntrarNaComunidade";

const imageProfileDefault = require("../../../../fileContents/imagensPerfil/avatar.jpg");
const imageDashboardDefault = require("../../../../assets/imagemAliancaDashboard.png");

export default function FormResumo(props) {
  const { token } = useContext(UserContext);
  let dadosToken = token.split("_");
  let tokenUsuario = dadosToken[2];
  let dadosCasamento = props.dadosCasamento;
  let dadosResumoPerfil = props.dadosResumoPerfil;

  let primeiroNomeUsuarioSplit = dadosCasamento.nomeUsuario
    ? dadosCasamento.nomeUsuario.split(" ")
    : "";
  let primeiroNomeConjugeSplit = dadosCasamento?.dadosCasamento?.nomeConjuge
    ? dadosCasamento.dadosCasamento.nomeConjuge.split(" ")
    : "";

  let primeiroNomeUsuario = primeiroNomeUsuarioSplit[0]
    ? primeiroNomeUsuarioSplit[0]
    : "";
  let primeiroNomeConjuge = primeiroNomeConjugeSplit[0]
    ? ` & ${primeiroNomeConjugeSplit[0]}`
    : " & Não informado";

  const [imageUrl, setImageUrl] = useState(
    dadosResumoPerfil.linkFotoPerfil
      ? dadosResumoPerfil.linkFotoPerfil
      : imageProfileDefault,
  );
  const [messageApi] = message.useMessage();

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const [dataString] = useState(() => {
    let data = dadosCasamento?.dadosCasamento?.dataCasamentoFormatada
      ? dadosCasamento.dadosCasamento.dataCasamentoFormatada
      : "--/--/----";
    let split = data.split("/");
    let date = new Date(split[2], split[1] - 1, split[0]);
    let d = date.getDate();
    let m = date.getUTCMonth();
    let y = date.getFullYear();
    return d + " de " + meses[m] + " de " + y;
  });

  const [dias] = useState("");
  const [horas] = useState("");
  const [minutos] = useState("");
  const [segundos] = useState("");

  function countdown(doc) {
    if (dadosCasamento.dadosCasamento.dataCasamentoFormatada) {
      let dateParts =
        dadosCasamento.dadosCasamento.dataCasamentoFormatada.split("/");
      if (dateParts.length === 3) {
        let countDownDate = new Date(
          dateParts[2],
          dateParts[1] - 1,
          dateParts[0],
        ).getTime();
        let now = new Date().getTime();
        let distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        let dias = Math.floor(distance / (1000 * 60 * 60 * 24));
        let horas = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        let minutos = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let segundos = Math.floor((distance % (1000 * 60)) / 1000);
        doc.querySelector(".regressiva").innerHTML = `<strong>${dias}</strong>
					<small class="ms-1">D</small>
					<small class="mx-2">:</small>
					<strong>${horas}</strong>
					<small class="ms-1">H</small>
					<small class="mx-2">:</small>
					<strong>${minutos}</strong>
					<small class="ms-1">M</small>
					<small class="mx-2">:</small>
					<strong>${segundos}</strong>
					<small class="ms-1">S</small>`;
        return false;
      }
      doc.querySelector(".regressiva").innerHTML = ``;
    }
  }

  useEffect(() => {
    countdown(document);
    const interval = setInterval(() => {
      countdown(document);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [startPosition] = useState(0);

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
        console.log("Send");
        atualizarDatabaseComLinkImagem(response.data, "uploadImagensPerfil");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function atualizarDatabaseComLinkImagem(dadosImagem, destinoImagem) {
    const imageDTO = {
      idUsuario: dadosResumoPerfil.idUsuario,
      tokenUsuario: tokenUsuario,
      nomeImagem: dadosImagem.key,
      urlImagem: dadosImagem.location,
    };

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

  return (
    <>
      {/* background */}
      <section
        className="background sm-slim button"
        style={{
          background: `url(${imageDashboardDefault}) no-repeat center/cover, linear-gradient(45deg, var(--color-dark), var(--color-secondary))`,
        }}
      >
        <div className="container">
          {/* <div className="content_">
						<button>
							<MdPhotoCamera className="icon" />
						</button>
					</div> */}
        </div>
      </section>
      {/* end background */}
      {/* resumo */}
      <section className="resumo resumo-noivas">
        <div className="container">
          <div className="row g-4">
            {/* principal */}
            <div className="col-lg-12">
              <div className="principal">
                <div className="row g-lg-5 g-4">
                  <div className="col-lg-3">
                    <div className="col-lg-12 col-4 mx-lg-0 mx-auto">
                      <div className="col-lg-12 col-4 mx-auto avatar-perfil-noiva">
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
                      </div>
                    </div>
                    <div className="col-lg-12">
                      {/* data do casamento */}
                      <div className="date_">
                        <span>
                          {dadosCasamento.dadosCasamento
                            .dataCasamentoFormatada ? (
                            <>{dataString}</>
                          ) : (
                            <div className="mt-lg-4 mt-2 d-flex justify-content-center">
                              <button
                                className="btn btn-red text-uppercase px-4"
                                onClick={(e) => {
                                  e.preventDefault();
                                  props.tabLocation("meuCasamento");
                                }}
                              >
                                <span style={{ fontSize: ".85rem" }}>
                                  Qual data será seu grande dia?
                                </span>
                              </button>
                            </div>
                          )}
                        </span>
                      </div>
                      {/* contagem regressiva */}
                      <div className="d-flex">
                        <div className="regressiva">
                          <strong>{dias}</strong>
                          <small className="ms-1">D</small>
                          <small className="mx-2">:</small>
                          <strong>{horas}</strong>
                          <small className="ms-1">H</small>
                          <small className="mx-2">:</small>
                          <strong>{minutos}</strong>
                          <small className="ms-1">M</small>
                          <small className="mx-2">:</small>
                          <strong>{segundos}</strong>
                          <small className="ms-1">S</small>
                        </div>
                      </div>
                      <LinkEntrarNaComunidade />
                    </div>
                  </div>

                  <div className="col-lg-9">
                    <h4>
                      {primeiroNomeUsuario} {primeiroNomeConjuge}
                    </h4>
                    <div className="city">
                      {dadosResumoPerfil.cidade
                        ? `${dadosResumoPerfil.cidade} / `
                        : ""}{" "}
                      {obterEstadoPorSigla(dadosResumoPerfil.estado)}
                    </div>
                    <div className="text-lg-start text-center buscar-fornecedores">
                      <a
                        href={`/buscar-profissional?estado=${localStorage.getItem(
                          "estado",
                        )}&categoria=&segmento=&pagina=1`}
                        className="btn px-4 mt-3 mb-2"
                        style={{
                          borderRadius: ".56rem",
                        }}
                      >
                        <i className="fa-solid fa-magnifying-glass me-3"></i>
                        <span>Buscar fornecedores</span>
                      </a>
                    </div>
                    {/* </div> */}
                    <div className="counters d-none">
                      <div className="row g-4">
                        {/* item */}
                        <div className="col-lg col-4">
                          <div className="item">
                            <label htmlFor={"data-casamento"}>
                              Data do Casamento
                            </label>
                            <span id="data-casamento">
                              {dadosCasamento.dataCasamentoFormatada
                                ? dadosCasamento.dataCasamentoFormatada
                                : "Indefinido"}
                            </span>
                          </div>
                        </div>
                        {/* item */}
                        <div className="col-lg col-4">
                          <div className="item">
                            <label htmlFor="pontos-acumulados">
                              Pontos Acumulados
                            </label>
                            <span id="pontos-acumulados">
                              {dadosCasamento.pontosAcumulados}
                            </span>
                          </div>
                        </div>
                        {/* item */}
                        <div className="col-lg col-4">
                          <div className="item">
                            <label htmlFor="profissionais-contratados">
                              Profissionais Contratados
                            </label>
                            <span id="profissionais-contratados">
                              {dadosCasamento.profissionaisContratados
                                ? dadosCasamento.profissionaisContratados
                                : "0"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="links d-lg-none">
                      <OwlCarousel
                        className="owl-theme"
                        startPosition={startPosition}
                        loop={false}
                        nav={false}
                        dots={false}
                        margin={8}
                        items={3}
                      >
                        <a
                          href="#orcamentos"
                          onClick={(e) => {
                            e.preventDefault();
                            props.tabLocation("orcamentos");
                          }}
                          className="item"
                        >
                          <i>
                            <CiChat1 />
                          </i>
                          <span>Mensagens</span>
                        </a>
                        <a
                          href="#cursos"
                          onClick={(e) => {
                            e.preventDefault();
                            props.tabLocation("cursos");
                          }}
                          className="item"
                        >
                          <i>
                            <CiVideoOn />
                          </i>
                          <span>Materiais e cursos</span>
                        </a>

                        <a
                          href="#pontos"
                          onClick={(e) => {
                            e.preventDefault();
                            props.tabLocation("pontos");
                          }}
                          className="item"
                        >
                          <i>{dadosCasamento.pontosAcumulados}</i>
                          <span>Pontos acumulados</span>
                        </a>

                        <a
                          href={`/perfil#meusFornecedores`}
                          onClick={() => {
                            props.tabLocation("meusFornecedores");
                          }}
                          className="item"
                        >
                          <i>
                            <CiUser />
                          </i>
                          <span>Meus fornecedores</span>
                        </a>
                        <a href="/blog" className="item">
                          <i style={{ marginTop: ".18rem" }}>
                            <HiOutlineLightBulb />
                          </i>
                          <span>
                            Inspirações
                            <br /> &nbsp;
                          </span>
                        </a>
                        <butto href=""></butto>
                      </OwlCarousel>
                    </div>
                    {/* links */}
                    <div className="links mt-3">
                      <div className="row g-lg-4 g-2">
                        <div className="col-lg col-4 d-lg-block d-none">
                          <a
                            href="#orcamentos"
                            onClick={(e) => {
                              e.preventDefault();
                              props.tabLocation("orcamentos");
                            }}
                            className="item"
                          >
                            <i>
                              <CiChat1 />
                            </i>
                            <span>Mensagens</span>
                          </a>
                        </div>
                        <div className="col-lg col-4 d-lg-block d-none">
                          <a
                            href="#cursos"
                            onClick={(e) => {
                              e.preventDefault();
                              props.tabLocation("cursos");
                            }}
                            className="item"
                          >
                            <i>
                              <CiVideoOn />
                            </i>
                            <span>Materiais e cursos</span>
                          </a>
                        </div>
                        <div className="col-lg col-4 d-lg-block d-none">
                          <a
                            href="#pontos"
                            onClick={(e) => {
                              e.preventDefault();
                              props.tabLocation("pontos");
                            }}
                            className="item"
                          >
                            <i
                              className="mt-2"
                              style={{ fontStyle: "normal", lineHeight: 1.2 }}
                            >
                              {dadosCasamento.pontosAcumulados}
                            </i>
                            <span>Pontos acumulados</span>
                          </a>
                        </div>
                        <div className="col-lg col-4 d-lg-block d-none">
                          <a
                            href={`/perfil#meusFornecedores`}
                            onClick={() => {
                              props.tabLocation("meusFornecedores");
                            }}
                            className="item"
                          >
                            <i>
                              <CiUser />
                            </i>
                            <span>Meus fornecedores</span>
                          </a>
                        </div>
                        <div className="col-lg col-6">
                          <a
                            href="/perfil#meuCasamento"
                            onClick={() => {
                              props.tabLocation("meuCasamento");
                            }}
                            className="item"
                          >
                            <i>
                              <GiDiamondRing />
                            </i>
                            <span>Meu casamento</span>
                          </a>
                        </div>
                        <div className="col-lg-6 col-6">
                          <a
                            href={`/buscar-profissional?estado=${localStorage.getItem(
                              "estado",
                            )}&categoria=&segmento=&pagina=1`}
                            className="item spotlight"
                          >
                            <i>
                              <CiBadgeDollar />
                            </i>
                            <span>
                              Conquiste seu voucher de R$3 mil reais aqui
                            </span>
                          </a>
                        </div>
                        <div className="col-lg-6 col-4 d-lg-block d-none">
                          <a href="/blog" className="item spotlight">
                            <i>
                              <HiOutlineLightBulb />
                            </i>
                            <span>Inspirações</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end principal */}
            {/* profissionais */}

            <CardProfissionalIndicado estado={dadosResumoPerfil.estado} />
          </div>
        </div>
      </section>
      {/* end resumo */}
    </>
  );
}

FormResumo.propTypes = {
  dadosCasamento: PropTypes.object,
  tabLocation: PropTypes.func,
  dadosResumoPerfil: PropTypes.object,
};
