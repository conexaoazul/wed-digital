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
  useEffect(() => {
    const timeout = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setMostrarOpcoes]);

  return (
    <div ref={cardRef} className={styles.optionsContainer}>
      <ul className={styles.list}>
        {opcoes?.map(({ action, title, icon }, index) => (
          <li className={styles.item} key={index}>
            <span
              role="button"
              className={styles.button}
              onClick={() => {
                action();
              }}
            >
              <div className={styles.buttonIcon}>{icon}</div>
              <div className={styles.buttonText}>{title}</div>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
