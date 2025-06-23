import React from "react";
import "./Footer.css";

import Logo from "../../assets/icon.ico";
import Versao from "../../../package.json";

export default function Footer() {
  let urlUTM = window.location.href.split("?");
  let utmData = urlUTM[1] ? `?${urlUTM[1]}` : "";

  return (
    <>
      <aside className="social">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <ul className="social-list">
                <li>
                  <a href="https://www.instagram.com/weddigital.noivos/">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/channel/UCTfniO7ZTrTyY3ZD1m4J3nw">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/Wed-Digital-Noivos-104929222299636">
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.tiktok.com/@wed_digital_noivos?_t=8UJ8AAefQbl&_r=1">
                    <i className="fa-brands fa-tiktok"></i>
                  </a>
                </li>
                <li>
                  <a href="mailto:contatopro@weddigital.com.br">
                    <i className="fa-solid fa-envelope"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-6">
              <div className="newsletter">
                <h4 className="mb-0">Newsletter</h4>
                <a href={`/cadastro${utmData}`} className="btn btn-primary">
                  Quero receber
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <footer>
        <div className="container">
          <div className="row g-lg-4 g-5">
            <div className="col-lg-4">
              <a href="" className="logo mb-5">
                <img src={Logo} alt="logo" />
                <div>
                  <span>WED</span>
                  <span>Digital</span>
                </div>
              </a>
            </div>
            <div className="col-lg">
              <ul>
                <li>
                  <a href="/empresas/termos-de-uso">Termos de uso empressas</a>
                </li>
                <li>
                  <a href="/noivas/termos-de-uso">Termos de uso noivas</a>
                </li>
                <li>
                  <a href="/regras-sorteio">Regras do sorteio</a>
                </li>
                <li>
                  <a href="/politicas-de-privacidade">
                    Políticas de privacidade
                  </a>
                </li>
                <li>
                  <a href={"#quemsomos"}>Quem somos</a>
                </li>
                <li>
                  <a href="/cadastro">Newsletter</a>
                </li>
              </ul>
            </div>
            <div className="col-lg">
              <ul>
                <li>
                  <a href="">Para noivos</a>
                </li>
                <li>
                  <a href="">Sorteios</a>
                </li>
                <li>
                  <a href="">Eventos</a>
                </li>
                <li>
                  <a href="">Wed Dicas</a>
                </li>
                <li>
                  <a href="">Comunidade Wed</a>
                </li>
              </ul>
            </div>
            <div className="col-lg">
              <ul>
                <li>
                  <a href="">Para empresas</a>
                </li>
                <li>
                  <a href="">Quero crescer</a>
                </li>
                <li>
                  <a href="">Prêmios</a>
                </li>
                <li>
                  <a href="">Programa Win</a>
                </li>
                <li>
                  <a href="">Como pontuar</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="container">
            <div className="content">
              <small>
                Copyright © Wed Digital 2022 - Todos os direitos reservados
              </small>
              <small>Versão - {Versao.version}</small>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
