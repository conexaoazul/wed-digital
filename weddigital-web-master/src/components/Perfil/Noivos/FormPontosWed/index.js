import React from "react";
import "./PontosWed.css";
import LinkPreenchaSeuCupom from "../../../Link/LinkPreenchaSeuCupom";
import LinkPreenchaSeuCupomBloqueado from "../../../Link/LinkPreenchaSeuCupomBloqueado";
import LinkGanhePontos from "../../../Link/LinkGanhePontos";
import LinkSaibaComoParticipar from "../../../Link/LinkSaibaComoParticipar";
import { getUltimoDiaMes } from "../../../../utils/Utils";

export default function FormPontosWed(props) {
  let dadosCasamento = props.dadosCasamento;
  let qtdCupons = Math.trunc(props.dadosCasamento.pontosAcumulados / 50);

  return (
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
      {/* pontos */}
      <section className="pontos pontos-noivas">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-12">
              <div className="content">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="title">
                      <div className="d-flex justify-content-between align-items-center pb-2">
                        <button
                          onClick={() => props.tabLocation("resumo")}
                          className="link-back"
                        >
                          <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <div className="title-back">
                          <h2 className="mb-0">Pontos Wed</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="counters">
                      <div className="row g-lg-4 g-5">
                        {/* item */}
                        <div className="col-lg">
                          <div className="item">
                            <label htmlFor="sorteioproximo">
                              Próximo sorteio dia:
                            </label>
                            <span id="sorteioproximo">{getUltimoDiaMes()}</span>
                          </div>
                          <a
                            href={`/buscar-profissional?estado=${localStorage.getItem(
                              "estado",
                            )}&categoria=&segmento=&pagina=1`}
                            className="btn btn-primary px-lg-5 py-lg-3 px-4 py-2 mt-3 d-lg-none d-inline-flex"
                          >
                            <span>Ganhe pontos</span>
                          </a>
                        </div>
                        {/* item */}
                        <div className="col-lg">
                          <div className="item">
                            <label>Ultimo ganhador:</label>
                            <span>
                              {dadosCasamento.ultimoGanhadorSorteio ===
                              "Aguardando Sorteio"
                                ? "Aguardando Sorteio"
                                : dadosCasamento.ultimoGanhadorSorteio}
                            </span>
                          </div>
                        </div>
                        {/* item */}
                        <div className="col-lg">
                          <div className="item">
                            <label>Seu Saldo de pontos:</label>
                            <span>{dadosCasamento.pontosAcumulados}</span>
                          </div>
                        </div>
                        {/* item */}
                        <div className="col-lg">
                          <div className="item">
                            <label>Seus cupons:</label>
                            <span>{qtdCupons}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <LinkSaibaComoParticipar />
            <LinkGanhePontos />
            {dadosCasamento.pontosAcumulados >= 100 ? (
              <LinkPreenchaSeuCupom />
            ) : (
              <LinkPreenchaSeuCupomBloqueado />
            )}
          </div>
        </div>
      </section>
      {/* end pontos */}
    </>
  );
}
