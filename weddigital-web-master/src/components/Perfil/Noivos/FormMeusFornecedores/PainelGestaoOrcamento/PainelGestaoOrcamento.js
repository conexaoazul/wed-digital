import React, { useEffect, useState } from "react";
import style from "./PainelGestaoOrcamento.module.css";
import { formatarMoeda } from "../../../../../utils/UtilFormatacao";
import BarraDeProgresso from "./BarraDeProgresso/BarraDeProgresso";
import { FaPen, FaPlus } from "react-icons/fa";
import ModalEditarOrcamento from "./ModalEditarOrcamento/ModalEditarOrcamento";
import MobileNavBar from "../../../../MobileNavBar/MobileNavBar";
import espaco from "../../../../../assets/previas/previas_espaco.jpg";
import decoracao from "../../../../../assets/previas/previas_decoracao.jpg";
import cerimonial from "../../../../../assets/previas/previas_cerimonial.jpg";
import buffet from "../../../../../assets/previas/previas_buffet.jpg";
import fotoevideo from "../../../../../assets/previas/previas_fotoevideo.jpg";
import musica from "../../../../../assets/previas/previas_musica.jpg";
import convites from "../../../../../assets/previas/previas_convites.jpg";
import diadanoiva from "../../../../../assets/previas/previas_diadanoiva.jpg";
import transporte from "../../../../../assets/previas/previas_transporte.jpg";
import joias from "../../../../../assets/previas/previas_joias.jpg";
import outros from "../../../../../assets/previas/previas_outros.jpg";
import CardContratoEstimativa from "./CardContratoEstimativa/CardContratoEstimativa";
import CarregandoPlaceholder from "../../../../Modal/CarregandoPlaceholder";
import api from "../../../../../api";

export default function PainelGestaoOrcamento(props) {
  const [mostrarModalEditarOrcamento, setMostrarModalEditarOrcamento] =
    useState(false);
  const [isCarregando, setIsCarregando] = useState(false);
  const [listaContratos, setlistaContratos] = useState([]);

  const dadosCasamento = props.dadosCasamento;

  let setContratoRef = props.setContratoRef;
  let fornecedores = props.fornecedores;
  let adicionarNovoFornecedor = props.adicionarNovoFornecedor;
  let setTabLocation = props.setTabLocation;
  let handleContratoSelecionado = props.handleContratoSelecionado;
  let setCategoriaSelecionada = props.setCategoriaSelecionada;

  const [totalValue, setTotalValue] = useState(0);
  const [orcamento, setOrcamento] = useState(
    dadosCasamento && dadosCasamento.orcamentoCasamento
      ? dadosCasamento.orcamentoCasamento
      : 0,
  );

  useEffect(() => {
    setIsCarregando(true);
    api
      .get(
        `contratos/obterContratosNoiva?idCasamento=${dadosCasamento.idCasamento}`,
      )
      .then(({ data }) => {
        adicionarImagemPrevia(data);
        somarValorUtilizado(data);
        setIsCarregando(false);
      })
      .catch(({ error }) => {
        console.error(error);
        setIsCarregando(false);
      });
  }, []);

  const adicionarImagemPrevia = (lista) => {
    for (const element of lista) {
      if (element.segmentoContrato === "Espaço para casamento")
        element.imagem = espaco;
      if (element.segmentoContrato === "Decoração") element.imagem = decoracao;
      if (element.segmentoContrato === "Cerimonial")
        element.imagem = cerimonial;
      if (element.segmentoContrato === "Buffet") element.imagem = buffet;
      if (element.segmentoContrato === "Foto") element.imagem = fotoevideo;
      if (element.segmentoContrato === "Vídeo") element.imagem = fotoevideo;
      if (element.segmentoContrato === "Música") element.imagem = musica;
      if (element.segmentoContrato === "Convites") element.imagem = convites;
      if (element.segmentoContrato === "Jóias") element.imagem = joias;
      if (element.segmentoContrato === "Dia da noiva")
        element.imagem = diadanoiva;
      if (element.segmentoContrato === "Transporte")
        element.imagem = transporte;
      if (element.segmentoContrato === "Adicionar outro")
        element.imagem = outros;
    }

    setlistaContratos(lista);
    setContratoRef(lista[0]);
  };

  const somarValorUtilizado = (lista) => {
    let total = 0;
    lista.map((contrato) => {
      total = total + contrato.valorContratado;
    });

    setTotalValue(total);
  };

  return (
    <div className={style.box}>
      <ModalEditarOrcamento
        mostrarModal={mostrarModalEditarOrcamento}
        valor={orcamento}
        cancelando={() => setMostrarModalEditarOrcamento(false)}
        salvando={(valor) => {
          setOrcamento(valor);
          setMostrarModalEditarOrcamento(false);
        }}
      />
      <div className={style.topBox}>
        <div className={style.headline}>Gestão de orçamento</div>
        <div className={style.budgetValueBox}>
          <div className={style.goldenText}>
            Seu orçamento:{" "}
            {formatarMoeda({ valor: orcamento, mostrarPrefixo: true })}
          </div>
          <button
            onClick={() => setMostrarModalEditarOrcamento(true)}
            className={style.budgetEditIcon}
          >
            <FaPen />
          </button>
        </div>
        <div className={style.progressBarLimit}>
          Custo ultilizado:{" "}
          {formatarMoeda({ valor: totalValue, mostrarPrefixo: true })}
          {orcamento > 0
            ? ` | Valor restante: ${formatarMoeda({
                valor: orcamento - totalValue,
                mostrarPrefixo: true,
              })}`
            : ""}
        </div>
        <BarraDeProgresso
          valor={orcamento > 0 ? (100 * totalValue) / orcamento : 0}
        />
        <button
          onClick={() =>
            window.open("https://youtu.be/gT6XAF9BZXw?si", "_blank")
          }
          href="https://youtu.be/gT6XAF9BZXw?si"
          className={style.buttonDuvidas}
        >
          Dúvidas? Assista o tutorial
        </button>
      </div>

      {isCarregando ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "2rem",
          }}
        >
          <CarregandoPlaceholder />
        </div>
      ) : (
        <>
          <div className={style.listBox}>
            <div className={style.list}>
              {listaContratos.map((previa, index) => (
                <CardContratoEstimativa
                  totalValue={totalValue}
                  setTotalValue={setTotalValue}
                  adicionarNovoFornecedor={() => adicionarNovoFornecedor()}
                  setCategoriaSelecionada={setCategoriaSelecionada}
                  nome={previa.nome}
                  imagem={previa.imagem}
                  dadosCasamento={dadosCasamento}
                  key={index}
                  contrato={previa}
                  handleContratoSelecionado={handleContratoSelecionado}
                />
              ))}
            </div>
            <button
              className={style.addSupplierButton}
              onClick={() => {
                adicionarNovoFornecedor();
              }}
            >
              <div className={style.addSupplierButtonIcon}>
                <FaPlus />
              </div>
              <div className={style.addSupplierButtonText}>
                Adicionar fornecedor
              </div>
            </button>
            <br />
            <div className={style.copy}>
              Adicione seus profissionais e aumente suas chances de ganhar R$
              3000 para o seu casamento
            </div>
          </div>
          <MobileNavBar
            items={[
              // {
              //     action: () => setTabLocation("resumo"),
              //     label: "Início",
              //     icon: <FaHome/>,
              // },
              // {
              //     action: () => setTabLocation("meuCasamento"),
              //     label: "Meu casamento",
              //     icon: <GiDiamondRing/>,
              // },
              {
                action: adicionarNovoFornecedor,
                label: "Adicionar fornecedor",
                icon: <FaPlus />,
                main: true,
              },
              // {
              //     action: () => setTabLocation("orcamentos"),
              //     label: "Mensagens",
              //     icon: <FaCommentDots/>,
              // },
              // {
              //     action: () => {
              //         setTabLocation("cursos");
              //     },
              //     label: "Cursos",
              //     icon: <FaGraduationCap/>,
              // },
            ]}
          />
        </>
      )}
    </div>
  );
}
