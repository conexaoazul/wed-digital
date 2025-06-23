import { Modal } from "antd";
import React, { useState } from "react";
import styles from "./ModalConviteViaEmail.module.css";
import { FaEnvelope } from "react-icons/fa";
import { tratarErroRequestApi } from "../../../../../../../utils/TratamentoErros";
import api from "../../../../../../../api";

export default function ModalConviteViaEmail(props) {
  const [email, setEmail] = useState(null);

  let open = props.open;
  let fechar = props.fechar;
  let cancelando = props.cancelando;
  let enviando = props.enviando;
  let idUsuario = props.idUsuario;

  const enviarConvite = () => {
    api
      .get(`convite/conviteNoiva?idUsuario=${idUsuario}&emailDestino=${email}`)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((ex) => {
        console.error(tratarErroRequestApi(ex));
      });
  };

  return (
    <Modal
      title="Enviar convite via e-mail"
      open={open}
      onCancel={() => {
        cancelando();
        fechar();
      }}
      onOk={() => {
        enviarConvite();
        enviando();
      }}
      okText="Enviar convite"
      cancelText="Cancelar"
      okButtonProps={{
        className: styles.modalButtonOk,
        disabled: !email || email === "",
      }}
      cancelButtonProps={{
        className: styles.modalButtonCancel,
      }}
      className={styles.modal}
    >
      <div className={styles.searchBox}>
        <FaEnvelope className={styles.icon} />
        <input
          placeholder="Digite o email do cliente"
          className={styles.search}
          type="email"
          value={email}
          onChange={({ target: { value } }) => {
            setEmail(value);
          }}
        />
      </div>
    </Modal>
  );
}
