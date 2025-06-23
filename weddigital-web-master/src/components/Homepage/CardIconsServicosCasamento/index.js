import React from "react";
import "./CardIconsServicosCasamento.css";

export default function CardIconsServicosCasamento(props) {
	return (
		<div className="col-lg col-6">
			<div className="item_">
				<img src={props.image} />
				<h4>{props.texto}</h4>
			</div>
		</div>
	);
}
