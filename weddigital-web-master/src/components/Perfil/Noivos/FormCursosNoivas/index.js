import React, { useEffect, useState } from "react";
import "./FormCursos.css";

import api from "../../../../api";
import CarregandoPlaceholder from "../../../Modal/CarregandoPlaceholder";
import CardConteudoCurso from "./CardCurso";

export default function FormConteudo(props) {
  const [IsCarregando, setIsCarregando] = useState(true);
  const [DadosCurso, setDadosCurso] = useState([]);

  let pontosAcumulados = props.pontosAcumulados;

  useEffect(() => {
    api
      .get(`cursos/noiva/obterTodasAulas`)
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
  // let isCursoBlocked = pontosAcumulados < 150 ? true : false
  let isCursoBlocked = true;

  for (let i = 0; i < DadosCurso.length; i++) {
    listaCardCursos.push(
      <CardConteudoCurso
        capaCurso={DadosCurso[i].capaCurso}
        nomeCurso={DadosCurso[i].nomeCurso}
        descricaoCurso={DadosCurso[i].descricao}
        linkCurso={DadosCurso[i].link}
        isCursoBloqueado={DadosCurso[i].link !== "#" ? false : true}
      />,
    );
  }

  return (
    <>
      {/* background */}
      <section
        className="background medium background-noivas"
        style={{
          background:
            "linear-gradient(45deg, var(--color-dark), var(--color-secondary))",
        }}
      ></section>
      {/* end background */}
      {IsCarregando ? (
        <CarregandoPlaceholder />
      ) : (
        <section className="cursos pb-5 cursos-noivas">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-12">
                <div className="title">
                  <h2 className="text-white text-center">Cursos</h2>
                </div>
              </div>
              {listaCardCursos.reverse()}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
