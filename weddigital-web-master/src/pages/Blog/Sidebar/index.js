import React, { useState } from "react";

export default function Sidebar(props) {

	let urlUTM = window.location.href.split("?");
	let utmData = urlUTM[1] ? `?${urlUTM[1]}` : "";

	return (
		<>
			<div className="sidebar-blog">
				<div className="row g-4">
					<div className="col-lg-12">
						<div className="block call text-center d-lg-block d-non">
							<h4 className="mt-0">Cadastre-se gratuitamente</h4>
							<a href={`/cadastro${utmData}`} className="btn btn-secondary mt-4">
								<span>Clicando aqui</span>
							</a>
						</div>
					</div>
					{/* block */}
					<div className="col-lg-12">
						<div className="block">
							<h4 className="mb-3">Outras publicações</h4>
							<ul>
								<li>
									<a href="/blog/artigo/baixe-gratuitamente-o-plano-perfeito-para-a-festa-do-seu-casamento/02-09-2023">
										<span>Baixe gratuitamente o plano perfeito para a festa do seu casamento</span>
										<span></span>
									</a>
								</li>
								<li>
									<a href="/blog/artigo/descubra-detalhes-que-tornam-um-casamento-classico-inesquecivel/02-09-2023">
										<span>Descubra detalhes que tornam um Casamento Clássico inesquecível</span>
										<span></span>
									</a>
								</li>
								<li>
									<a href="/blog/artigo/conheca-os-principais-estilos-de-decoracoes-para-sua-festa-de-casamento/03-06-2023">
										<span>Conheça os principais estilos de decorações para sua festa de casamento</span>
										<span></span>
									</a>
								</li>
								<li>
									<a href="/blog/artigo/entenda-sobre-como-a-decoracao-do-seu-casamento-pode-mudar-tudo/03-06-2023">
										<span>Entenda sobre como a decoração do seu casamento pode mudar tudo</span>
										<span></span>
									</a>
								</li>
								<li>
									<a href="/blog/artigo/3-passos-para-escolher-as-musicas-da-cerimonia-do-seu-casamento/03-06-2023">
										<span>3 passos para escolher as músicas da cerimônia do seu casamento</span>
										<span></span>
									</a>
								</li>
								<li>
									<a href="/blog/artigo/contratar-ou-nao-uma-cerimonialista-para-seu-casamento/03-06-2023">
										<span>Contratar ou não uma cerimonialista para seu casamento?</span>
										<span></span>
									</a>
								</li>
								<li>
									<a href="/blog/artigo/qual-buque-de-noiva-ideal-para-o-seu-casamento/03-06-2023">
										<span>Qual buquê de noiva ideal para o seu casamento?</span>
										<span></span>
									</a>
								</li>
								<li>
									<a href="/blog/artigo/com-quanto-tempo-devo-escolher-a-fotografia-do-meu-casamento/03-06-2023">
										<span>Com quanto tempo devo escolher a fotografia do meu casamento</span>
										<span></span>
									</a>
								</li>
								<li>
									<a href="/blog/artigo/tendencias-2023-de-vestidos-de-noivas/03-06-2023">
										<span>Tendências 2023 de vestidos de noivas</span>
										<span></span>
									</a>
								</li>
								<li>
									<a href="/blog/artigo/quais-documentos-necessarios-para-um-casamento-catolico/03-06-2023">
										<span>Quais documentos necessários para um casamento católico</span>
										<span></span>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
