import React from "react";
import "./ModalPlanos.css";
import {useNavigate} from "react-router-dom";

export default function ModalPlanos(props) {
    const history = useNavigate();

    function redPlanosVenda() {
        history("/planos-profissional");
    }

    return (
        <div className="modalPlanos__container">
            <p className="modalPlanos_text text-white">{props.text}</p>
            <button className="btn btn-primary text-uppercase" onClick={redPlanosVenda}>
                {props.button}
            </button>
        </div>
    );
}
