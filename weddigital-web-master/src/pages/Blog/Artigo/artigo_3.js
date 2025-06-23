import React, { useEffect, useState } from "react";
import "../style.css";
import "./style.css";

import Sidebar from "../Sidebar";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Helmet from "react-helmet";

import img25 from '../../../assets/blog/25.jpg';
import NavCrumb from "../NavCrumb";

export default function Artigo_3() {
	let urlUTM = window.location.href.split("?");
	let utmData = urlUTM[1] ? `?${urlUTM[1]}` : "";

	const [shareOptions, setShareOptions] = useState(0);

	return (
		<div>
			<Helmet>
				<title>WedDigital | Blog | Artigo | Contratar ou não uma cerimonialista para seu casamento?</title>
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
											<a href={`/buscar-profissional?estado=${localStorage.getItem("estado")}&categoria=&segmento=&pagina=1`} className="link mt-3 d-block" style={{ color: 'var(--color-secondary)' }}>
												<span>Encontrar fornecedores</span>
												<i className="fa-solid fa-arrow-right ms-2 ps-1"></i>
											</a>
										</div>
									</div>
									{/* header_ */}
									<div className="col-lg-12">
										<div className="header_">
											<h6>Dicas sobre planejamento</h6>
											<h2>Contratar ou não uma cerimonialista para seu casamento?</h2>
											<p>Agora que você decidiu realizar a sua festa de casamento e começou a pesquisar tudo sobre o mundo dos casamento, surge a dúvida da maioria das noivinhas:</p>
											<p>“Será que preciso realmente contratar assessores de casamento ?”</p>
											<p>Cerimonialistas e assessoras de casamento são essenciais na vida de um casal depois do “Eu aceito”. E vamos te explicar os motivos</p>
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
													var win = window.open("https://wa.me/?text=https://weddigital.com.br/blog/artigo/contratar-ou-nao-uma-cerimonialista-para-seu-casamento/03-06-2023", '_blank');
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
										<img src={img25} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<div className="row g-3">
													<div className="col-lg-12 pb-3">
														<h4>Primeiro entenda os tipos de assessoria e cerimonial:</h4>
													</div>
													<div className="col-lg-12">
														<h5 className="mb-2">Assessoria Completa:</h5>
														<p>Te ajuda a selecionar os melhores profissionais de acordo com as suas prioridades e estilo de casamento, levando também em consideração o custo/benefício. Normalmente te acompanham na escolha de boa parte dos serviços contratados e isso acontece desde a assinatura do contrato até depois do casamento caso seja necessário. Além disso, te ajuda em toda organização do seu grande dia, gerenciando todos os profissionais envolvidos.</p>
													</div>
													<div className="col-lg-12">
														<h5 className="mb-2">Parcial:</h5>
														<p>Esse tipo de assessoria costuma ser apenas online, ou seja, não te acompanha nos encontros presenciais com outros profissionais, por exemplo; visitar o local do casamento, provar o  vestido e fazer algumas análises técnicas prevendo qualquer imprevisto no dia do seu casamento. No grande dia esse tipo de assessoria poderá recepcionar convidados e profissionais.</p>
													</div>
													<div className="col-lg-12">
														<h5 className="mb-2">Do dia:</h5>
														<p>É contratado apenas para o dia do casamento, coordenando todos os profissionais envolvidos. Seu objetivo é apenas colocar em prática todo o cronograma definido pelos noivos antes do casamento, lembrando que os serviços podem ser diferentes de acordo com cada empresa.</p>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<p>Agora é analisar com seu amor qual o melhor tipo de serviço que vocês precisam.</p>
											</div>
											<div className="col-lg-12">
												<p>Levem sempre em consideração que será o grande dia de vocês, tudo precisa sair com muita atenção e cuidado, qualquer descuido pode ser um desastre do seu sonho.</p>
											</div>
											<div className="col-lg-12">
												<div className="row g-2">
													<div className="col-lg-12">
														<h5>Por isso recomendamos demais que você NUNCA deixe de ter uma assessoria por perto por esses motivos:</h5>
													</div>
													<div className="col-lg-12">
														<ul className="list ps-4">
															<li>1 - Te ajuda na escolha dos melhores profissionais</li>
															<li>2 - Estão sempre ligados nas tendências dos casamentos</li>
															<li>3 - Pela experiência podem prever possíveis problemas</li>
															<li>4 - Você terá mais tempo para curtir todo o processo</li>
															<li>5 - É sempre bom ter em quem confiar</li>
															<li>6 - Vão te recomendar as melhores opções de acordo com suas prioridades</li>
														</ul>
													</div>
												</div>
											</div>
											<div className="col-lg-12">
												<p>Aqui na nossa plataforma vocês encontram as melhores assessoras para o seu grande dia.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="p-4" style={{ border: "1px solid var(--color-secondary)", borderRadius: "1rem" }}>
											<div className="d-flex px-3 text-lg-left text-center justify-content-lg-between align-items-center flex-lg-row flex-column w-100">
												<h4 className="mb-0">Encontre os melhores decoradores da sua região</h4>
												<a href={`/buscar-profissional?estado=${localStorage.getItem("estado")}&categoria=&segmento=&pagina=1`} className="btn btn-primary mt-lg-0 mt-3">
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
