import React from "react";
import "./CardServicosOferecidos.css";

export default function (props) {
	return (
		<div className="col-lg-12">
			<div className="item-servicos-oferecidos">
				<img src={props.icon}></img>
				<div>
					<h6>{props.title}</h6>
					<p>{props.texto}</p>
				</div>
			</div>
		</div>
	);
}
