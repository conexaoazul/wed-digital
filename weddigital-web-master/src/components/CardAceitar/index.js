import React from "react";
import "./CardAceitar.css";

import triste from "../../assets/emoji-triste.png";
import apaixonado from "../../assets/emoji-apaixonado.png";

export default function CardAceitar(props) {
	return (
		<>
			<div className="card-aceitar field">
				<div className="content_ px-0">
					<h6>Contratado?</h6>
					<div className="buttons">
						<button className="close_">
							<span className="icon">
								<img src={triste} />
							</span>
							<span>Não até o momento</span>
						</button>
						<button className="check_">
							<span className="icon">
								<img src={apaixonado} />
							</span>
							<span>Com certeza!</span>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
