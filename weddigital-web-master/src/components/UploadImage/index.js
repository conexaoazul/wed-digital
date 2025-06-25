import React, { useState } from "react";
import { Button, message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import ApiConfig from "../../config.json";
import api from "../../api";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { sendImageS3 } from "../../utils/imageResizer";
import { bool, func, number, string } from "prop-types";

const ptBR = {
  uploading: "Subindo...",
  removeFile: "Remover Arquivo",
  downloadFile: "Baixar Arquivo",
  uploadError: "Erro ao Subir Arquivo",
  previewFile: "Prévia",
};

export default function UploadImage(props) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [imageCurrent, setImageCurrent] = useState("");
  const [messageApi] = message.useMessage();
  const [reload, setReload] = useState(false);

  let isImagemPerfil = props.isImagemPerfil;
  let isConfirmacaoCadastro = props.isConfirmacaoCadastro;
  let idUsuario = props.idUsuario;
  let idProfissional = props.idProfissional;
  let tokenUsuario = props.tokenUsuario;
  let aspectImage = isImagemPerfil ? 1 : 1.777;
  let corBG = props.corBG;

  const renderReload = () => {
    if (reload && !isImagemPerfil && !isConfirmacaoCadastro) {
      return (
        <Button
          onClick={() => window.location.reload()}
          className="btn btn-primary"
          type="submit"
        >
          Atualizar <i className="fa fa-refresh" />
        </Button>
      );
    }
  };

  // Verificar tamanho e formato da imagem
  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isJpgOrPng) {
      messageApi.open({
        type: "error",
        content: "Os únicos formatos permitidos são: .PNG / .jpeg / .jpg!",
        style: {
          marginTop: "4rem",
        },
      });
    }
    const isLt5MB = file.size / 1024 / 1024 < 5;
    if (!isLt5MB) {
      messageApi.open({
        type: "error",
        content: "A imagem deve ser de no máximo 5MB!",
        style: {
          marginTop: "4rem",
        },
      });
    }
    return isJpgOrPng && isLt5MB;
  };

  // Upload Image
  function uploadImage(ev) {
    if (ev.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (ev.file.status === "error" || ev.file.status === "done") {
      setReload(true);
    }

    let destImagem = isImagemPerfil
      ? "uploadImagensPerfil"
      : `uploadImagensVitrine/${idProfissional}`;

    sendImageS3(ev.file.originFileObj)
      .then((response) => {
        if (isImagemPerfil) {
          setImageUrl(response.data.location);
        }
        if (isImagemPerfil || isConfirmacaoCadastro) {
          props.setImageUrl(response.data.location);
        }
        setImageCurrent(response.data.key);
        atualizarDatabaseComLinkImagem(response.data, destImagem);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(true);
      });
  }

  function atualizarDatabaseComLinkImagem(dadosImagem, destinoImagem) {
    const imageDTO = {
      idUsuario: idUsuario,
      tokenUsuario: tokenUsuario,
      nomeImagem: dadosImagem.key,
      urlImagem: dadosImagem.location,
    };

    api
      .post(`imagens/${destinoImagem}`, imageDTO)
      .then((response) => {
        if (response.data === "sucess" || response.data === "sucesso") {
          if (destinoImagem === "perfil") {
            deletarImageS3(imageCurrent);
          }
        } else if (response.data === "userNotFound") {
          console.log(`userNotFound`);
        }
      })
      .catch((error) => {
        console.error(`Ocorreu um erro ao atualiza o database: ${error}`);
      });
  }

  function deletarImageS3(keyImage) {
    //Delete image S3 storage
    axios
      .delete(`${ApiConfig.api.linkApiImagem}/deleteImage/${keyImage}`)
      .then(() => {
        console.log("Image removed");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const uploadProfileButton = (
    <div style={{ color: corBG }}>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 0, display: "flex" }}>
        {isImagemPerfil ? (
          <span
            style={{
              fontSize: ".85rem",
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            Atualize a foto do seu perfil
          </span>
        ) : (
          <span
            style={{ fontSize: ".85rem", fontWeight: 600, lineHeight: 1.2 }}
          >
            Adicione fotos para a sua vitrine
          </span>
        )}
      </div>
    </div>
  );
  return (
    <div>
      {props.isAvaliacao ? (
        <ImgCrop rotationSlider aspect={aspectImage}>
          <Upload
            locale={ptBR}
            accept="image/jpeg, image/png ,image/jpg"
            name="avatar"
            multiple={false}
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={!isImagemPerfil}
            beforeUpload={beforeUpload}
            onChange={uploadImage}
          >
            {uploadProfileButton}
          </Upload>
        </ImgCrop>
      ) : (
        <ImgCrop rotationSlider aspect={aspectImage}>
          <Upload
            locale={ptBR}
            accept="image/jpeg, image/png ,image/jpg"
            name="avatar"
            multiple={false}
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={!isImagemPerfil}
            beforeUpload={beforeUpload}
            onChange={uploadImage}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadProfileButton
            )}
          </Upload>
        </ImgCrop>
      )}
      <div style={{ textAlign: "center" }}>{renderReload()}</div>
      <br />
    </div>
  );
}

UploadImage.propTypes = {
  isImagemPerfil: bool,
  isConfirmacaoCadastro: bool,
  idUsuario: number,
  idProfissional: number,
  tokenUsuario: string,
  setImageUrl: func,
  corBG: string,
  isAvaliacao: bool,
};
