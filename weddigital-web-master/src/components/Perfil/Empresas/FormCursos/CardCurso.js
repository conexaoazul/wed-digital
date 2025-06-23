import React from "react";

export default function CardConteudoCurso(props) {
	let capaCurso = props.capaCurso != "" ? props.capaCurso : "no-image.png";
	const imagemCapaCurso = require(`../../../../fileContents/Capa Cursos/${capaCurso}`);

	return (
		<>
			<div className="col-lg-4">
				<div className="item-curso-empresa">
					<div className="image" style={{ background: "url(" + imagemCapaCurso + ") no-repeat center/cover" }}>
						<span className="nivel">{props.nivelCurso}</span>
						{props.isCursoBloqueado ? (
							<span className="blocked">
								<i className="fa-solid fa-lock"></i>
							</span>
						) : (
							""
						)}
					</div>
					<div className="content">
						<div>
							<h4>{props.nomeCurso}</h4>
							<p>{props.descricaoCurso}</p>
						</div>
						{props.isCursoBloqueado ? (
							""
						) : (
							<a href={props.linkCurso} target="_blank" className="btn btn-primary">
								<strong>Acessar Curso</strong>
							</a>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
