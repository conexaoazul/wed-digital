import React, { useEffect, useRef } from "react";
import styles from "./CardOptions.module.css";

export default function CardOptions({ setMostrarOpcoes, opcoes }) {
  const cardRef = useRef();

  const handleClickOutside = ({ target }) => {
    if (cardRef.current && !cardRef.current.contains(target)) {
      setMostrarOpcoes(false);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      handleClickOutside(event);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [setMostrarOpcoes]);

  return (
    <div ref={cardRef} className={styles.optionsContainer}>
      <ul className={styles.list}>
        {opcoes?.map(({ action, title, icon }, index) => (
          <li className={styles.item} key={index}>
            <button
              className={styles.button}
              onClick={() => {
                action();
              }}
            >
              <div className={styles.buttonIcon}>{icon}</div>
              <div className={styles.buttonText}>{title}</div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
