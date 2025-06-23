import React, { useEffect, useState } from "react";
import style from "./FormMeusContratos.module.css";
import api from "../../../../api";
import CardCliente from "./CardCliente/CardCliente";
import CarregandoPlaceholder from "../../../Modal/CarregandoPlaceholder";
import ConvidarCliente from "./CardCliente/ConvidarCliente/ConvidarCliente";
import { formatarMoeda } from "../../../../utils/Utils";
import {
  FaCommentDots,
  FaGraduationCap,
  FaHome,
  FaPlus,
  FaStore,
} from "react-icons/fa";
import MobileNavBar from "../../../MobileNavBar/MobileNavBar";
import PropTypes from "prop-types";

export default function FormMeusContratos(props) {
  const [isCarregando, setIsCarregando] = useState(false);
  const [listaContratos, setListaContratos] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [mostrarConvidarClienteModal, setMostrarConvidarClienteModal] =
    useState(false);

  let dadosProfissional = props.dadosProfissional;
  let setTabLocation = props.setTabLocation;
  const idUsuario = props.dadosProfissional.idUsuario;

  useEffect(() => {
    setIsCarregando(true);
    api
      .get(
        `contratos/obterContratosProfissional?idProfissional=${dadosProfissional.idProfissional}`,
      )
      .then(({ data }) => {
        somarValorUtilizado(data);
        setListaContratos(data);
        setIsCarregando(false);
      })
      .catch(({ error }) => {
        console.error("errror", error);
        setIsCarregando(false);
      });
  }, []);

  const somarValorUtilizado = (lista) => {
    let total = 0;
    lista.map((contrato) => {
      total = total + contrato.valorContrato;
    });

    setTotalValue(total);
  };

  return (
    <div style={{ background: "var(--color-branco)" }}>
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
        <div className={style.box}>
          <ConvidarCliente
            idUsuario={idUsuario}
            mostrar={mostrarConvidarClienteModal}
            fechar={() => setMostrarConvidarClienteModal(false)}
          />

          <div className={style.topBox}>
            <div className={style.headline}>Gestão de contratos</div>
            <div className={style.budgetValueBox}>
              <div className={style.goldenText}>
                {formatarMoeda({
                  valor: totalValue,
                  mostrarPrefixo: true,
                })}
              </div>
            </div>
            <div className={style.progressBarLimit}>Faturamento atual</div>
          </div>
          <div className={style.listBox}>
            <div className={style.list}>
              {listaContratos.map((item, index) => {
                return (
                  <CardCliente
                    key={index + 1}
                    convidarCliente={() => setMostrarConvidarClienteModal(true)}
                    contrato={item}
                  />
                );
              })}
            </div>
          </div>
          <div className={style.mensagemConvite}>
            Convide seus atuais e potenciais clientes, eles poderão participar
            dos sorteios mensais de R$ 3000 e sua empresa poderá ser escolhida
            pelo ganhador
          </div>
          <button
            className={style.addSupplierButton}
            onClick={() => {
              setMostrarConvidarClienteModal(true);
            }}
          >
            <div className={style.addSupplierButtonIcon}>
              <FaPlus />
            </div>
            <div className={style.addSupplierButtonText}>Convidar cliente</div>
          </button>
        </div>
      )}

      <MobileNavBar
        items={[
          {
            icon: <FaHome />,
            label: "Início",
            action: () => setTabLocation("resumo"),
          },
          {
            icon: <FaStore />,
            label: "Dados gerais",
            action: () => setTabLocation("meuPerfil"),
          },
          {
            icon: <FaPlus />,
            label: "Convidar",
            action: () => setMostrarConvidarClienteModal(true),
            main: true,
          },
          {
            icon: <FaCommentDots />,
            label: "Meus Orçamentos",
            action: () => setTabLocation("orcamentos"),
          },
          {
            icon: <FaGraduationCap />,
            label: "Cursos",
            action: () => setTabLocation("cursos"),
          },
        ]}
      />
    </div>
  );
}

FormMeusContratos.propTypes = {
  dadosProfissional: PropTypes.object,
  setTabLocation: PropTypes.func,
};
