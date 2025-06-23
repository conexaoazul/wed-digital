import React, { useEffect } from "react";
import "./Homepage-Noivos.css";

import Navbar from "../../../components/Navbar";
import CardIconsServicosCasamento from "../../../components/Homepage/CardIconsServicosCasamento";
import DestaqueProfissionais from "../../../components/Homepage/DestaqueProfissionais";

import ImageAproveiteEssaChance from "../../../assets/aproveite-essa-chance.jpg";
import ImageSorteio from "../../../assets/sorteio-ao-vivo.jpeg";
import ImageWedDicas from "../../../assets/dicas-da-wed.jpg";
import ImageComunidade from "../../../assets/comunidade-noivas.jpg";
import ImageMelhoresMomentos from "../../../assets/melhores-momentos.jpg";
import ImageQuemSomos from "../../../assets/quem-somos.jpg";
import ImgBg from "../../../assets/home/mobile.webp";

import IconBusca from "../../../assets/icons/pesquisa.png";
import IconAssistindo from "../../../assets/icons/assistindo.png";
import IconDinheiro from "../../../assets/icons/pagamento.png";
import IconPlanejamento from "../../../assets/icons/planejamento.png";
import IconInspiracoes from "../../../assets/icons/luminaria.png";
import IconComunidade from "../../../assets/icons/comunidade.png";

import Footer from "../../../components/Footer";
import Helmet from "react-helmet";

import {
  IoBriefcaseOutline,
  IoCashOutline,
  IoClipboardOutline,
  IoMedalOutline,
  IoVideocamOutline,
} from "react-icons/io5";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let urlUTM = window.location.href.split("?");
  let utmData = urlUTM[1] ? `?${urlUTM[1]}` : "";

  return (
    <div>
      <Helmet>
        <title>WedDigital</title>
      </Helmet>

      {/* --- INIT PIXEL --- */}
      <noscript>
        <iframe
          title="gtag"
          src="https://www.googletagmanager.com/ns.html?id=GTM-TNVR898"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      {/* --- END PIXEL --- */}

      <Navbar navfix={true} utmCadastro={utmData} />

      <main className="home noivos">
        <div
          id="home_mobile"
          className="d-block d-sm-none"
          style={{ marginTop: "60px" }}
        >
          <img src={ImgBg} style={{ width: "100%" }} alt="" />

          <div className="mt-4 text-center">
            <h1 className="title">
              Os{" "}
              <span>
                <strong>melhores profissionais</strong>
              </span>{" "}
              para
              <br />o seu casamento estão aqui
            </h1>
            <p className="mt-4" style={{ color: "#400072cc" }}>
              <span
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "#f5bd51",
                }}
              >
                Concorra a R$ 3.000/mês
              </span>{" "}
              em voucher <br />
              para sua festa casamento
            </p>
            <a
              href={`/cadastro${utmData}`}
              className="btn btn-primary mt-4 mb-lg-0 mb-5"
            >
              <span>Cadastre-se grátis</span>
            </a>
          </div>
        </div>
        <section className="initial bg_home d-none d-sm-block">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-7 col-12">
                <div className="text-xs-center">
                  <h1 id="title_homepage_primary">
                    Os{" "}
                    <span id="title_homepage_primary">
                      melhores profissionais
                    </span>{" "}
                    para o seu casamento
                    <br />
                    estão aqui
                  </h1>
                  <p className="mt-4">
                    <span
                      style={{
                        textDecoration: "underline",
                        textDecorationColor: "#f5bd51",
                      }}
                    >
                      Concorra a R$ 3.000/mês
                    </span>{" "}
                    em voucher para sua festa casamento
                  </p>
                  <a
                    href={`/cadastro${utmData}`}
                    className="btn btn-primary mt-4 mb-lg-0 mb-5"
                  >
                    <span>Cadastre-se grátis</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sub-initial">
          <div className="container">
            <div className="row g-4">
              <CardIconsServicosCasamento
                image={IconBusca}
                texto="Buscar fornecedores"
              />
              <CardIconsServicosCasamento
                image={IconDinheiro}
                texto="Sorteios"
              />
              <CardIconsServicosCasamento
                image={IconAssistindo}
                texto="Assista aulas"
              />
              <CardIconsServicosCasamento
                image={IconPlanejamento}
                texto="Planejamento"
              />
              <CardIconsServicosCasamento
                image={IconInspiracoes}
                texto="Inspirações"
              />
              <CardIconsServicosCasamento
                image={IconComunidade}
                texto="Comunidade"
              />
            </div>
          </div>
        </section>

        <DestaqueProfissionais />

        <section className="default" id="sorteio">
          <div className="container">
            <div className="row g-4 align-items-center">
              <div className="col-lg-6 ps-lg-5 pb-lg-0 pb-5">
                <div className="image left">
                  <div
                    style={{
                      background:
                        "url(" +
                        ImageAproveiteEssaChance +
                        ") no-repeat center/cover",
                    }}
                  ></div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="title mb-4">
                  <h2 className="mb-0">Aproveite essa chance!</h2>
                </div>
                <p className="mb-5">
                  Organize seu casamento e concorra a prêmios todos os meses
                  podendo ganhar <strong>R$ 3.000</strong> todos os meses.
                </p>
                <a href={`/cadastro${utmData}`} className="btn btn-primary">
                  <span className={"btnCadastroGratis"}>
                    Cadastre-se grátis
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="default como-participar bg-light">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-12 text-center">
                <div className="title mb-4">
                  <h2 className="mb-0">Como participar?</h2>
                </div>
                <p className="mb-3">
                  Organize seu casamento e concorra a prêmios todos os meses
                  podendo ganhar <strong>R$ 3.000</strong> todos os meses.
                </p>
              </div>
              <div className="col-lg-4">
                <div className="item_">
                  <IoBriefcaseOutline />
                  <div>
                    <h4>Contratar um profissional</h4>
                    <h6>100 Pontos</h6>
                  </div>
                </div>
              </div>
              {/*<div className="col-lg-4">*/}
              {/*	<div className="item_">*/}
              {/*		<IoMegaphoneOutline />*/}
              {/*		<div>*/}
              {/*			<h4>Feedback do profissional</h4>*/}
              {/*			<h6>50 Pontos</h6>*/}
              {/*		</div>*/}
              {/*	</div>*/}
              {/*</div>*/}
              <div className="col-lg-4">
                <div className="item_">
                  <IoMedalOutline />
                  <div>
                    <h4>Conte-nos sua experiência</h4>
                    <h6>200 Pontos</h6>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="item_">
                  <IoVideocamOutline />
                  <div>
                    <h4>Feedback em vídeo do prêmio</h4>
                    <h6>250 Pontos</h6>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="item_">
                  <IoClipboardOutline />
                  <div>
                    <h4>Completar o cadastro na plataforma</h4>
                    <h6>25 Pontos</h6>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="item_">
                  <IoCashOutline />
                  <div>
                    <h4>Solicitar um orçamento</h4>
                    <h6>5 Pontos</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="default image">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-5">
                <div className="title mb-4">
                  <h2 className="mb-0">Sorteios</h2>
                </div>
                <p className="large">
                  Os sorteios serão realizados todos os meses.
                </p>
                <p className="large">Venha torcer junto conosco!</p>
                <a
                  href={`/cadastro${utmData}`}
                  className="btn btn-primary mt-4"
                >
                  <span className={"btnCadastroGratis"}>
                    Cadastre-se grátis
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div
            className="image-absolute"
            style={{
              background:
                "linear-gradient(0deg, hsl(274deg 100% 22% / 32%), hsl(274deg 100% 22% / 32%)), url(" +
                ImageSorteio +
                ") no-repeat center/cover",
            }}
          ></div>
        </section>

        <section className="default image" id="dicas">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-5 ms-auto">
                <div className="title mb-4">
                  <h2 className="mb-0">Dicas da Wed</h2>
                </div>
                <p className="large">Dicas dos melhores profissionais</p>
                <p className="large">
                  Sabemos que os preparativos para o seu grande dia não será uma
                  tarefa tão fácil!
                </p>
                <a
                  href={`/cadastro${utmData}`}
                  className="btn btn-primary mt-4"
                >
                  <span className={"btnCadastroGratis"}>
                    Cadastre-se grátis
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div
            className="image-absolute left"
            style={{
              background:
                "linear-gradient(0deg, hsl(274deg 100% 22% / 32%), hsl(274deg 100% 22% / 32%)), url(" +
                ImageWedDicas +
                ") no-repeat center/cover",
            }}
          ></div>
        </section>

        <section className="default image">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-5">
                <div className="title mb-4">
                  <h2 className="mb-0">Comunidade Wed</h2>
                </div>
                <p className="large">
                  Conheça outras noivinhas e compartilhem sua jornada de noiva
                  do início até o fim.
                </p>
                <a
                  href={`/cadastro${utmData}`}
                  className="btn btn-primary mt-4"
                >
                  <span className={"btnCadastroGratis"}>
                    Cadastre-se grátis
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div
            className="image-absolute"
            style={{
              background:
                "linear-gradient(0deg, hsl(274deg 100% 22% / 32%), hsl(274deg 100% 22% / 32%)), url(" +
                ImageComunidade +
                ") no-repeat center/cover",
            }}
          ></div>
        </section>

        <section className="default bg-light">
          <div className="container">
            <div className="row g-4 align-items-center">
              <div className="col-lg-6 ps-lg-5 pb-5">
                <div className="image left">
                  <div
                    style={{
                      background:
                        "url(" +
                        ImageMelhoresMomentos +
                        ") no-repeat center/cover",
                    }}
                  ></div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="title mb-4">
                  <h2 className="mb-0">Participe dos melhores eventos</h2>
                </div>
                <p className="large mb-5">
                  Incentivamos os profissionais a realizarem eventos presenciais
                  e on-line com oportunidades únicas para o seu casamento.
                </p>
                <a href={`/cadastro${utmData}`} className="btn btn-primary">
                  <span className={"btnCadastroGratis"}>
                    Cadastre-se grátis
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="default" id="quemsomos">
          <div className="container">
            <div className="row g-4 align-items-center flex-lg-row flex-column-reverse">
              <div className="col-lg-6">
                <div className="title mb-4">
                  <h2 className="mb-0">Quem somos?</h2>
                </div>
                <p className="large">
                  Somos apaixonados por casamentos e tecnologia. Acreditamos que
                  o amor move o mundo e cada sonho que realizamos é uma família
                  que nasce.
                </p>
                <p className="large mb-5">
                  Planeje e compartilhe momentos incríveis, o seu amor merece,
                  isso é a Wed Digital
                </p>
                <a href={`/cadastro${utmData}`} className="btn btn-primary">
                  <span className={"btnCadastroGratis"}>
                    Cadastre-se grátis
                  </span>
                </a>
              </div>
              <div className="col-lg-6 ps-lg-5 pb-5">
                <div className="image">
                  <div
                    style={{
                      background:
                        "url(" + ImageQuemSomos + ") no-repeat center/cover",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
