import React from "react";
import api from "../../../../api";
import axios from "axios";
import ApiConfig from "../../../../config.json";

import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";

export default function CardImagemVitrine(props) {
  let imagem = props.imagemCarregada;

  let imagemPrincipal = props.imagemPrincipal;
  let idProfissional = props.idProfissional;
  let idImagem = props.idImagem;
  let nomeImagem = props.nomeImagem;
  let setIsCarregandoDados = props.isCarregando;

  const handleMenuClick = (e) => {
    if (e.key == "1") {
      alterarCapaVitrine();
    }

    if (e.key == "2") {
      deletarImagem();
    }
  };

  const items = [
    {
      label: "Definir como capa",
      key: "1",
      icon: <CheckOutlined />,
      disabled: imagemPrincipal,
    },
    {
      label: "Remover imagem",
      key: "2",
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  function deletarImagem() {
    let isConfirmacao = window.confirm(
      "Tem certeza que deseja apagar essa foto?",
    );

    if (isConfirmacao) {
      api
        .get(
          `imagens/deletarImagemVitrine/${idProfissional}?idImagem=${idImagem}`,
        )
        .then((response) => {
          deletarImageS3(nomeImagem);
          document.location.reload(true);
          setIsCarregandoDados(false);
        })
        .catch((error) => {
          console.error("Erro ao apagar imagem");
          setIsCarregandoDados(false);
        });
    }
  }

  function alterarCapaVitrine() {
    let isConfirmacao = window.confirm(
      "Essa será sua nova imagem principal, está correto?",
    );

    if (isConfirmacao) {
      api
        .put(
          `imagens/alterarCapaVitrine/${idProfissional}?idImagem=${idImagem}`,
        )
        .then((response) => {
          document.location.reload(true);
          setIsCarregandoDados(false);
        })
        .catch((error) => {
          console.error("Erro ao apagar imagem", error);
          setIsCarregandoDados(false);
        });
    }
  }

  function deletarImageS3(keyImage) {
    //Delete image S3 storage
    axios
      .delete(`${ApiConfig.api.linkApiImagem}/deleteImage/${keyImage}`)
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="col-lg-3">
      <div
        className="image "
        style={{ background: "url(" + imagem + ") no-repeat center/cover" }}
      >
        <Dropdown menu={menuProps}>
          <Button>
            <Space>...</Space>
          </Button>
        </Dropdown>

        {imagemPrincipal ? (
          <span className={"span_capa_indicador"}>Capa atual</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
