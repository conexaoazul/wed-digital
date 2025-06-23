import React from "react";
import "./FormSuporte.css";

export default function FormSuporte(props) {
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
      <section className="suporte pro suporte-empresas">
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
                          <h2 className="mb-0">Suporte</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="counters">
                      <div className="row g-4">
                        {/* item */}
                        <div className="col-lg">
                          <div className="item">
                            <label>E-mail</label>
                            <a href="mailto:suportepro@weddigital.com.br">
                              <i className="fa-solid fa-envelope"></i>
                              <span>suportepro@weddigital.com.br</span>
                            </a>
                          </div>
                        </div>
                        {/* item */}
                        <div className="col-lg">
                          <div className="item">
                            <label style={{ opacity: 0 }}>Whatsapp:</label>
                            <a
                              href="https://api.whatsapp.com/send?phone=5548991687397&text=Ol%C3%A1,%20preciso%20de%20suporte%20da%20Wed%20Digital"
                              target="_blank"
                              className="btn btn-whatsapp"
                              rel="noreferrer"
                            >
                              <i className="fa-brands fa-whatsapp"></i>
                              <span>Fale conosco</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end pontos */}
    </>
  );
}
