// BarraDeProgresso.js
import React from "react";
import styles from "./BarraDeProgresso.module.css";
import { FaHeart } from "react-icons/fa";

export default function BarraDeProgresso({ valor }) {
  return (
    <div className={styles.box}>
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${valor <= 100 ? valor : 100}%` }}
        >
          <FaHeart className={styles.heart} />
          <div className={styles.value}>{`${Number(
            valor <= 100 ? valor : 100
          ).toFixed(0)}%`}</div>
        </div>
      </div>
    </div>
  );
}
