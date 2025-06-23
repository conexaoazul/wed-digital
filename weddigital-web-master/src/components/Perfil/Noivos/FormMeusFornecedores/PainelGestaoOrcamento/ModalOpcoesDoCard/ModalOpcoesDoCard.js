import React from "react";
import styles from "./ModalOpcoesDoCard.module.css";
import { Modal } from "antd";

export default function ModalOpcoesDoCard({ valorDoContrato, open, fechando }) {
  return (
    <Modal onCancel={fechando} open={open} footer={<></>}>
      <div>Opa</div>
    </Modal>
  );
}
