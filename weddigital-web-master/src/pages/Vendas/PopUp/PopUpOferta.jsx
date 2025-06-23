import React from "react";
import "./css/PopUpOferta.css";

export default function PopUpOferta(props) {
  return (
    <div className="popup">
      <div className="popup-container">
        <div
          className="close-container"
          onClick={() => props.setOpenPopUp(false)}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
        <img
          onClick={() =>
            window
              .open(
                "https://payfast.greenn.com.br/37578/offer/VvuR08",
                "_blank",
              )
              .focus()
          }
          src={
            window.innerWidth > 1200
              ? "https://storage.weddigital.com.br/weddigital/marketing/PC.png"
              : "https://storage.weddigital.com.br/weddigital/marketing/Mobile.png"
          }
          alt="Pop Up Oferta"
        />
      </div>
    </div>
  );
}
