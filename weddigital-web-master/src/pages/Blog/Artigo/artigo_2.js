import React, { useEffect, useState } from "react";
import "../style.css";
import "./style.css";

import Sidebar from "../Sidebar";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Helmet from "react-helmet";

import img14 from "../../../assets/blog/14.jpg";
import NavCrumb from "../NavCrumb";

export default function Artigo_2() {
	let urlUTM = window.location.href.split("?");
	let utmData = urlUTM[1] ? `?${urlUTM[1]}` : "";

	const [shareOptions, setShareOptions] = useState(0);

	return (
		<div>
			<Helmet>
				<title>WedDigital | Blog | Artigo | 3 passos para escolher as músicas da cerimônia do seu casamento</title>
			</Helmet>

			{/* --- INIT PIXEL --- */}
			<noscript>
				<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TNVR898" height="0" width="0" style="display:none;visibility:hidden"></iframe>
			</noscript>
			{/* --- END PIXEL --- */}

			<Navbar navfix={true} utmCadastro={utmData} />

			<NavCrumb />

			<main className="blog">
				<section className="article">
					<div className="container">
						<div className="row g-4 g-lg-5">
							{/* article */}
							<div className="col-lg-9">
								<div className="row g-4 gy-5">
									<div className="col-lg-12 d-lg-none d-block">
										<div className="block call">
											<h4 className="mt-0">Encontre o fornecedor ideal para seu casamento</h4>
											<a href="/buscar-profissional" className="link mt-3 d-block" style={{ color: "var(--color-secondary)" }}>
												<span>Encontrar fornecedores</span>
												<i className="fa-solid fa-arrow-right ms-2 ps-1"></i>
											</a>
										</div>
									</div>
									{/* header_ */}
									<div className="col-lg-12">
										<div className="header_">
											<h6>Dicas sobre musicas</h6>
											<h2>3 passos para escolher as músicas da cerimônia do seu casamento</h2>
											<p>A música é um dos elementos principais quando o assunto é festa de casamento. Você já viu um grande sucesso do cinema sem uma boa trilha sonora? Existem vários filmes clássicos que são lembrados apenas por sua trilha sonora, exemplo:</p>
										</div>
									</div>
									{/* author share */}
									<div className="col-lg-12">
										<div className="author-share">
											<div className="info">
												{/* <div className="author">Nome do autor</div> */}
												<div className="date ms-0">Atualizado dia 03 de março de 2023</div>
												{/* <div className="likes">
													<ion-icon name="heart-outline"></ion-icon>
													<span>20</span>
												</div> */}
											</div>
											<div className="share">
												<button onClick={() => {
													var win = window.open("https://wa.me/?text=https://weddigital.com.br/blog/artigo/3-passos-para-escolher-as-musicas-da-cerimonia-do-seu-casamento/03-06-2023", '_blank');
													win.focus();
												}}>
													<ion-icon name="share-outline"></ion-icon>
												</button>
												{/* <button>
													<ion-icon name="heart-outline"></ion-icon>
												</button> */}
											</div>
										</div>

									</div>
									<div className="col-lg-12">
										<img src={img14} className="img-fluid w-100" style={{ borderRadius: "1rem" }} />
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<ul className="list">
													<li>- Titanic(1998) </li>
													<li>- Um amor para recorda(2002)</li>
													<li>- Simplesmente acontece(2014)</li>
													<li>- O guarda costas(1993)</li>
												</ul>
											</div>
											<div className="col-lg-12">
												<p>Poderíamos citar vários filmes e suas respectivas lindas músicas, mas o nosso foco do assunto é outro. Isso é apenas uma forma de lembrar que seu grande sonho, merece uma linda trilha sonora.</p>
											</div>
											<div className="col-lg-12">
												<p>Separamos 3 passos para você elaborar as músicas da cerimônia de casamento.</p>
											</div>
										</div>
									</div>
									{/* <div className="col-lg-12">
										<img src={img16} className="img-fluid w-100" style={{borderRadius: '1rem'}} />
									</div> */}
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Passo 1 - Tenha o máximo de referências</h4>
											</div>
											<div className="col-lg-12">
												<p>Hoje a internet nos possibilita pesquisar sobre qualquer tipo de assunto, as noivas do passado não tiveram o privilégio que você tem hoje de olhar vídeos e se encantar. É importante pesquisar antes de tudo, crie um acervo de conteúdos que você se identifica para o seu grande dia.Isso vai te ajudar a não “quebrar a cabeça” e esses vídeos também podem ser encaminhados aos profissionais que você pretende contratar facilitando ainda mais o processo de contratação, clique aqui para encontrá-los.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Passo 2 - Elabore a ordem das entradas</h4>
											</div>
											<div className="col-lg-12">
												<p>Antes de pensar em quais músicas para cada entrada você deve anexar, é ideal que você tenha todo o cronograma das entradas da sua cerimônia já pronto, isso vai facilitar todo o processo.</p>
											</div>
											<div className="col-lg-12">
												<p>
													Converse com sua cerimonialista e defina como vocês pretendem executar todo o cortejo, visualizando todas as entradas, basta apenas anexar a preferência musical de vocês e se você ainda não tem uma boa cerimonialista,{" "}
													<a href="" className="link">
														toca aqui.
													</a>
												</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Passo 3 - Sejam autênticos</h4>
											</div>
											<div className="col-lg-12">
												<p>Chegou a hora! Com o cortejo pronto, chegou a hora de escolher quais músicas serão para cada entrada. Nossa recomendação é, escolham músicas que representem realmente cada entrada e tenha um significado importante para vocês.</p>
											</div>
											<div className="col-lg-12">
												<p>Analise as letras e traduções de cada canção, a música tem um poder enorme de aflorar emoções e neste dia não será diferente. Apesar das referências salvas por vocês, escolham músicas que realmente as pessoas possam ouvir e dizer: “Nossa, essa música é cara deles” ou “Essa música foi perfeita para esse momento”.</p>
											</div>
											<div className="col-lg-12">
												<p>Além da decoração, vestido, buquê e tantas outras coisas, a música é uma peça fundamental quando o assunto é casamento autêntico.</p>
											</div>
											<div className="col-lg-12">
												<p>Esperamos ter ajudado e que o seu sonho saia tudo como planejado, conta com a gente.</p>
											</div>
											<div className="col-lg-12">
												<p>Wed Digital - Seu amor no digital</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="p-4" style={{ border: "1px solid var(--color-secondary)", borderRadius: "1rem" }}>
											<div className="d-flex px-3 text-lg-left text-center justify-content-lg-between align-items-center flex-lg-row flex-column w-100">
												<h4 className="mb-0">Encontre os melhores decoradores da sua região</h4>
												<a href="/buscar-profissional" className="btn btn-primary mt-lg-0 mt-3">
													<strong>TOCANDO AQUI</strong>
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* sidebar */}
							<div className="col-lg-3">
								<Sidebar />
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
