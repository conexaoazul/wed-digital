import React from "react";
import styles from "./MobileNavBar.module.css";

export default function MobileNavBar({ items }) {
  return (
    <nav className={styles.nav}>
      <ul className={styles.buttonList}>
        {items.map((item, index) => (
          <li key={index}>
            <button
              className={item.main ? styles.main : styles.button}
              onClick={() => {
                item.action();
              }}
            >
              <div className={styles.buttonIcon}>{item.icon}</div>
              <div className={styles.buttonText}>{item.label}</div>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
