import React, { useEffect, useState } from "react";
import "./Homepage-Empresas.css";

import Navbar from "../../../components/Navbar";

import ImagemPanel from "../../../assets/panel.png";
import ImagemAcessoria from "../../../assets/assessoria.jpg";
import ImageCasalFelizPontos from "../../../assets/casal-feliz-pontos.jpg";
import ImageProgramaWin from "../../../assets/programaWin.jpg";
import ImageQuemSomos from "../../../assets/quem-somos.jpg";

import contratos from "../../../assets/icons/contratos.png";
import assessoria from "../../../assets/icons/assessoria_com_especialista.png";
import cresca from "../../../assets/icons/cresca_rapido.png";
import curso from "../../../assets/icons/curso_de_marketing.png";

import PersonalizePerfil from "../../../assets/icons/personalizeSeuPerfil.ico";
import AcessoConteudo from "../../../assets/acessoAConteudos.png";
import PainelFacil from "../../../assets/icons/painelFacil.ico";
import Assessoria from "../../../assets/icons/assessoria.ico";
import ConhecaProfissionais from "../../../assets/icons/conhecaProfissionais.ico";
import DadosSeguros from "../../../assets/icons/dadosSeguros.ico";

import StatusGold from "../../../assets/icons/star.png";
import StatusBlack from "../../../assets/icons/medal.png";
import StatusPlatinum from "../../../assets/icons/award.png";
import StatusInfinity from "../../../assets/icons/king.png";

import casal from "../../../assets/casal.png";

import CardVantagensEmpresas from "../../../components/Homepage/CardVantagens/CardVantagensEmpresas";
import CardServicosOferecidos from "../../../components/Homepage/CardVantagens/CardServicosOferecidos";
import Footer from "../../../components/Footer";
import Helmet from "react-helmet";

export default function HomePage() {
  const params = new URLSearchParams(window.location.search);
  const idConvite = params.get("convite");
  const [text, setText] = useState(
    "Receba solicitações de noivos da sua região e cresça seu negócio.",
  );
  const [textN, setTextN] = useState(1);
  const [textClass, setTextClass] = useState("mt-4");
  const textString = [
    "Receba solicitações de noivos da sua região e cresça seu negócio.",
    "Descubra o segredo das empresas de casamento de sucesso.",
    "Tenha acesso a cursos exclusivos de marketing e vendas.",
  ];

  useEffect(() => {
    // window.scrollTo(0, 0);
    const p = setInterval(() => {
      setTextClass("mt-4 hide_");
      setTimeout(function () {
        if (textN < 2) {
          setTextN(textN + 1);
        } else {
          setTextN(0);
        }
        setTextClass("mt-4");
        setText(textString[textN]);
      }, 2000);
    }, 4000);
    return () => clearInterval(p);
  }, [textN, textClass]);

  let urlUTM = window.location.href.split("?");
  let utmData = urlUTM[1] ? `?${urlUTM[1]}` : "";
  let url = `/empresas/cadastro_${utmData}`
  if (idConvite){
    url = url + `&convite=${idConvite}`;
  }

  return (
    <>
      <Helmet>
        <title>WedDigital - Empresas</title>
      </Helmet>

      <Navbar isAreaEmpresa={true} navfix={true} utmCadastro={utmData} />

      <main className="home">
        <section className="initial align-items-end" id="inicio">
          <div className="container">
            <div className="row g-4 align-items-end">
              <div className="col-lg-6 headline-home-empresas">
                <h1>
                  Faça <span>sua empresa ser encontrada</span> por mais noivos
                  agora
                </h1>
                <p className={textClass} id="labelEmpresasHidden">
                  {text}
                </p>
                <a
                  href={url}
                  className="btn btn-primary mt-4 mb-lg-0 mb-5"
                >
                  <span>Cadastre-se grátis</span>
                </a>
              </div>
              <div className="col-lg-6">
                <div
                  className="image w-100"
                  style={{
                    background:
                      "url(" + casal + ") no-repeat center bottom/contain",
                    paddingTop: "80%",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        <section className="vantagens" id="servicos">
          <div className="container">
            <div className="row g-4">
              <CardVantagensEmpresas
                icon={contratos}
                title="Feche mais contratos"
                description={null}
              />

              <CardVantagensEmpresas
                icon={cresca}
                title="Cresça rápido"
                description={null}
                alt="Cresça rápido"
              />

              <CardVantagensEmpresas
                icon={curso}
                title="Cursos de marketing e vendas"
                description={null}
                alt="Cursos de marketing e vendas"
              />

              <CardVantagensEmpresas
                icon={assessoria}
                title="Mentorias ao vivo"
                description={null}
                alt="Mentorias ao vivo"
              />
            </div>
          </div>
        </section>

        <section className="default bg-light">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-12 text-center pb-5">
                <div className="title mb-4">
                  <h2 className="mb-0">
                    Venha para a Wed
                    <br />e consiga mais contratos!
                  </h2>
                </div>
                <p className="mb-0 vantagensWed">
                  O marketing digital invadiu o mercado de casamentos nos
                  últimos anos
                  <br />e métodos ultrapassados não são mais suficientes.
                </p>
              </div>
              <div className="col-lg-12">
                <div className="row g-4 flex-lg-row flex-column-reverse">
                  <div className="col-lg-6">
                    <div className="title mb-5">
                      <h4 className="mb-0">Aqui você vai encontrar:</h4>
                    </div>
                    <div className="row g-5">
                      <CardServicosOferecidos
                        icon={PersonalizePerfil}
                        title="Personalize seu perfil"
                        texto="Com ajuda dos nossos colaboradores do marketing e torne sua empresa desejada já no primeiro contato dos noivos."
                      />
                      <CardServicosOferecidos
                        icon={AcessoConteudo}
                        title="Tenha acesso a conteúdos"
                        texto="Exclusivos em vídeo, áudio e texto. Um passo a passo sobre estratégias de marketing de sucesso."
                      />
                      <CardServicosOferecidos
                        icon={PainelFacil}
                        title="Um painel totalmente fácil"
                        texto="De ser usado, te proporcionando uma experiência prática."
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 ps-lg-5 pb-lg-0 pb-5">
                    <div className="image">
                      <div
                        style={{
                          background:
                            "url(" + ImagemPanel + ") no-repeat center/cover",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="default mb-4">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-6 pe-lg-5 pb-lg-0 pb-5">
                <div className="image left">
                  <div
                    style={{
                      background:
                        "url(" + ImagemAcessoria + ") no-repeat center/cover",
                    }}
                  ></div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row g-5">
                  <CardServicosOferecidos
                    icon={Assessoria}
                    title="Assessoria de marketing"
                    texto="Direta para te ajudar no crescimento da sua empresa."
                  />
                  <CardServicosOferecidos
                    icon={ConhecaProfissionais}
                    title="Conheça profissionais"
                    texto="Com o mesmo propósito que o seu e troque experiências."
                  />
                  <CardServicosOferecidos
                    icon={DadosSeguros}
                    title="Dados seguros"
                    texto="Seus dados estarão seguros na nossa base de dados."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="default bg-light">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-12 text-center">
                <div className="title mb-4">
                  <h2 className="mb-0">Tudo isso na sua mão</h2>
                </div>
                <a
                  href={url}
                  className="btn btn-primary"
                >
                  <span className={"btnCadastroGratis"}>
                    Cadastre-se grátis
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="default image" id="premios">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-5">
                <div className="title mb-4">
                  <h2 className="mb-0">Pontos Wed</h2>
                </div>
                <p className="large">
                  Sua empresa pode ser selecionada por noivos todos os meses com
                  um prêmio inicial de R$3.000 para te contratar!
                </p>
                <p className="large">Aproveite agora essa chance!</p>
              </div>
            </div>
          </div>
          <div
            className="image-absolute"
            style={{
              background:
                "linear-gradient(0deg, hsl(274deg 100% 22% / 32%), hsl(274deg 100% 22% / 32%)), url(" +
                ImageCasalFelizPontos +
                ") no-repeat center/cover",
            }}
          ></div>
        </section>
        <section className="default image">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-5 ms-auto">
                <div className="title mb-4">
                  <h2 className="mb-0">Programa Pro Win</h2>
                </div>
                <p className="large">
                  Acreditamos que você merece ser honrado por cada sonho
                  realizado e os noivos precisam saber disso.
                </p>
                <p className="large">
                  Em seu perfil aqui na plataforma aparecerá o status dos seus
                  casamentos bem sucedidos, trazendo ainda mais valor para sua
                  marca e aumentando consequentemente seus contratos.
                </p>
              </div>
            </div>
          </div>
          <div
            className="image-absolute left"
            style={{
              background:
                "linear-gradient(0deg, hsl(274deg 100% 22% / 32%), hsl(274deg 100% 22% / 32%)), url(" +
                ImageProgramaWin +
                ") no-repeat center/cover",
            }}
          ></div>
        </section>
        <section className="default bg-light">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-12 text-center">
                <div className="title mb-4">
                  <h2 className="mb-0">Como funciona?</h2>
                </div>
                <p className="large">
                  Ao alcançar uma certa quantidade de casamentos bem sucedidos
                  você receberá o status pelo seu resultado, onde eles serão
                  exibidos no seu perfil para noivos gerando cada vez mais valor
                  para sua marca
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="default">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-12 text-center">
                <div className="title pb-5">
                  <h2 className="mb-0">Status Profissional</h2>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row g-4">
                  {/* item */}
                  <div className="col-lg-3">
                    <div className="item-plan">
                      <div className="img">
                        <img src={StatusGold} alt="status-gold" />
                      </div>
                      <div>
                        <h4>Gold</h4>
                        <h6>25 a 49</h6>
                        <p>Casamentos bem sucedidos</p>
                      </div>
                    </div>
                  </div>
                  {/* item */}
                  <div className="col-lg-3">
                    <div className="item-plan">
                      <div className="img">
                        <img src={StatusBlack} alt="status-black" />
                      </div>
                      <div>
                        <h4>Black</h4>
                        <h6>50 a 99</h6>
                        <p>Casamentos bem sucedidos</p>
                      </div>
                    </div>
                  </div>
                  {/* item */}
                  <div className="col-lg-3">
                    <div className="item-plan">
                      <div className="img">
                        <img src={StatusPlatinum} alt="status-platinum" />
                      </div>
                      <div>
                        <h4>Platinum</h4>
                        <h6>100 a 199</h6>
                        <p>Casamentos bem sucedidos</p>
                      </div>
                    </div>
                  </div>
                  {/* item */}
                  <div className="col-lg-3">
                    <div className="item-plan">
                      <div className="img">
                        <img src={StatusInfinity} alt="status-infinity" />
                      </div>
                      <div>
                        <h4>Infinity</h4>
                        <h6>200+</h6>
                        <p>Casamentos bem sucedidos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 text-center">
                <a
                  href={url}
                  className="btn btn-primary"
                >
                  <span className={"btnCadastroGratis"}>
                    Cadastre-se grátis
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="default bg-light" id="quemsomos">
          <div className="container">
            <div className="row g-4 align-items-center">
              <div className="col-lg-6 pe-lg-5 pb-lg-0 pb-5">
                <div className="image left">
                  <div
                    style={{
                      background:
                        "url(" + ImageQuemSomos + ") no-repeat center/cover",
                    }}
                  ></div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="title mb-5">
                  <h2 className="mb-0">Quem somos?</h2>
                </div>
                <p className="large">
                  Somos apaixonados por casamentos e tecnologia. Acreditamos que
                  o amor move o mundo e cada sonho que realizamos é uma família
                  que nasce.
                </p>
                <p className="large">
                  Planeje e compartilhe momentos incríveis, o seu amor merece,
                  isso é a Wed Digital
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
