import React, { useEffect, useState } from "react";
import "./FormCursos.css";

import api from "../../../../api";

import CardConteudoCurso from "./CardCurso";
import CarregandoPlaceholder from "../../../Modal/CarregandoPlaceholder";

import ModalPlanos from "../../../ModalPlanos";

export default function FormConteudo(props) {
  const [IsCarregando, setIsCarregando] = useState(true);
  const [DadosCurso, setDadosCurso] = useState([]);

  let nivelConta = props.nivelConta;

  useEffect(() => {
    api
      .get(`cursos/profissional/obterTodasAulas/${nivelConta}`)
      .then(({ data }) => {
        setDadosCurso(data);
        setIsCarregando(false);
        //eslint-disable-next-line react-hooks/exhaustive-deps
      })
      .catch(({ error }) => {
        setIsCarregando(false);
        console.error(error);
      });
  }, []);

  let listaCardCursos = [];

  for (let i = 0; i < DadosCurso.length; i++) {
    let nivelCursoCurrent;
    if (DadosCurso[i].restrincao === 1) {
      nivelCursoCurrent = "";
    }
    if (DadosCurso[i].restrincao === 2) {
      nivelCursoCurrent = "Start";
    }
    if (DadosCurso[i].restrincao === 3) {
      nivelCursoCurrent = "Ouro";
    }
    if (DadosCurso[i].restrincao === 4) {
      nivelCursoCurrent = "Diamante";
    }

    let isCursoBlocked = DadosCurso[i].restrincao > nivelConta;

    listaCardCursos.push(
      <CardConteudoCurso
        capaCurso={DadosCurso[i].capaCurso}
        nomeCurso={DadosCurso[i].nomeCurso}
        descricaoCurso={DadosCurso[i].descricao}
        linkCurso={DadosCurso[i].link}
        nivelCurso={nivelCursoCurrent}
        isCursoBloqueado={isCursoBlocked}
      />,
    );
  }

  return (
    <>
      {/* background */}
      <section
        className="background background-cursos-empresas"
        style={{
          background:
            "linear-gradient(45deg, var(--color-dark), var(--color-secondary))",
        }}
      >
        <div className="container">
          <div className="pt-5">
            {nivelConta <= 1 ? (
              <ModalPlanos
                text="Para acessar cursos de marketing e vendas"
                button="Assine agora"
              />
            ) : nivelConta === 2 ? (
              <ModalPlanos
                text="Para acessar cursos de marketing e vendas"
                button="Upgrade para ouro ou diamante"
              />
            ) : nivelConta === 3 ? (
              <ModalPlanos
                text="Para acessar cursos de marketing e vendas"
                button="Upgrade para diamante"
              />
            ) : null}
          </div>
        </div>
      </section>
      {/* end background */}
      {/* pontos */}
      <section className="cursos pb-5 cursos-empresas">
        <div className="container">
          <div className="row g-4">
            {/*<div className="col-lg-12">*/}
            {/*  <div className="title">*/}
            {/*    <h2 className="text-white text-center">Cursos</h2>*/}
            {/*  </div>*/}
            {/*</div>*/}
            {IsCarregando ? <CarregandoPlaceholder /> : listaCardCursos}
          </div>
        </div>
      </section>
      {/* end pontos */}
    </>
  );
}
