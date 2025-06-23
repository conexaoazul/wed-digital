import React from "react";

export default function Cardcontato(props) {
	function alterarActive() {
		props.setIdConversaAtual(props.idContato);
		props.setContatoAtivo(props.idItem);
		props.isAltaredo(true);
		props.open(true);

		let chat = document.querySelector("section.chat-orcamentos div.content div.chat ul.chat");
		setTimeout(() => {
			if (chat) {
				chat.scrollTo(8888, 8888);
			}
		}, 200);
	}

	return (
		<>
			<li className={props.isActive ? "active" : ""} onClick={alterarActive}>
				<div className="image" style={{ background: "url(" + props.fotoPerfil + ") no-repeat center/cover" }}></div>
				<div>
					<span className="name">{props.nome}</span>
					{/*<span className="message">Testando nome</span>*/}
				</div>
				{/*<span className="hour">21:33</span>*/}
				{/*<span className="counter">2</span>*/}
			</li>
		</>
	);
}
