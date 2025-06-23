import React from "react";
import "./CardVantagensEmpresas.css";

export default function CardVantagensEmpresas(props) {
	return (
		<div className="col-lg col-6">
			<div className="item_">
				<img src={props.icon} />
				<h4>{props.title}</h4>
			</div>
		</div>
	);
}
