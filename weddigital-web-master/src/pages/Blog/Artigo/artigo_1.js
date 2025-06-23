import React, { useEffect, useState } from "react";
import "../style.css";
import "./style.css";

import Sidebar from "../Sidebar";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Helmet from "react-helmet";

import img17 from '../../../assets/blog/17.jpg';
import img20 from '../../../assets/blog/20.jpg';
import img21 from '../../../assets/blog/21.jpg';
import img23 from '../../../assets/blog/23.jpg';
import NavCrumb from "../NavCrumb";

export default function Artigo_1() {
	let urlUTM = window.location.href.split("?");
	let utmData = urlUTM[1] ? `?${urlUTM[1]}` : "";

	const [shareOptions, setShareOptions] = useState(0);

	return (
		<div>
			<Helmet>
				<title>WedDigital | Blog | Artigo | Conheça os principais estilos de decorações para sua festa de casamento</title>
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
											<h6>Dicas sobre decoração</h6>
											<h2>Conheça os principais estilos de decorações para sua festa de casamento.</h2>
											<p>Tornando o seu casamento memorável: Dicas de Decoração para Casamentos Inesquecíveis.</p>
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
													var win = window.open("https://wa.me/?text=https://weddigital.com.br/blog/artigo/conheca-os-principais-estilos-de-decoracoes-para-sua-festa-de-casamento/03-06-2023", '_blank');
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
									{/* text */}
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<p>O casamento é um momento especial na vida de um casal, e a decoração desempenha um papel fundamental em criar a atmosfera perfeita para celebrar esse grande dia. Se você está planejando seu casamento e deseja torná-lo verdadeiramente inesquecível, aqui estão algumas dicas de decoração que vão ajudar a criar uma experiência memorável para você e seus convidados.</p>
											</div>
											<div className="col-lg-12">
												<p>Conheça agora os principais tipos de decoração para casamento.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Decoração de casamento boho-chic:</h4>
											</div>
											<div className="col-lg-12">
												<img src={img23} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>
											<div className="col-lg-12">
												<p>O estilo boho-chic tem sido uma tendência popular nos últimos anos. Para criar uma decoração boho-chic, opte por elementos naturais, como arranjos de flores silvestres, folhagens e plantas suspensas. Utilize móveis vintage, como cadeiras de madeira desgastadas ou sofás antigos, combinados com tecidos macios e estampas florais. Lanternas, velas e luzes suspensas adicionam um toque romântico e acolhedor.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Decoração de casamento rústico:</h4>
											</div>
											<div className="col-lg-12">
												<img src={img21} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>
											<div className="col-lg-12">
												<p>O estilo rústico evoca uma sensação de charme campestre e acolhedor. Use materiais naturais, como madeira, juta e renda, em elementos decorativos, como centros de mesa e marcadores de lugar. Arranjos de flores campestres em vasos de metal ou cerâmica complementam o visual rústico. Pense em adicionar toques como fardos de feno, lanternas de estilo antigo e detalhes em palha para reforçar a atmosfera rústica.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Decoração de casamento minimalista:</h4>
											</div>
											<div className="col-lg-12">
												<img src={img20} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>
											<div className="col-lg-12">
												<p>Para os casais que preferem um estilo mais clean e elegante, a decoração minimalista é uma escolha perfeita. Opte por cores neutras, como branco, bege e tons pastel suaves. Utilize poucos elementos decorativos, com linhas simples e limpas. Arranjos de flores minimalistas em vasos transparentes ou brancos são ideais. A ênfase está na simplicidade e na atenção aos detalhes sutis.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Decoração de casamento clássico:</h4>
											</div>
											<div className="col-lg-12">
												<p>O estilo clássico é atemporal e elegante. Utilize cores como branco, marfim e dourado para criar uma atmosfera sofisticada. Invista em móveis de estilo tradicional, como cadeiras com encosto alto e mesas de madeira escura. Arranjos de flores tradicionais, como rosas ou peônias, em vasos de cristal ou prata, complementam o visual clássico. Lustres e candelabros adicionam um toque de glamour.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Decoração de casamento temático:</h4>
											</div>
											<div className="col-lg-12">
												<img src={img17} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>
											<div className="col-lg-12">
												<p>Para casais que desejam um casamento único e divertido, um tema específico pode adicionar personalidade à decoração. Pense em temas como praia, vintage, cinema, viagem ou conto de fadas, e incorpore elementos que reflitam o tema escolhido. Desde adereços temáticos até detalhes decorativos, tudo deve ser planejado de acordo com o tema para criar uma experiência imersiva e memorável.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<p>Essas são apenas algumas ideias de decoração de casamento para inspirar você. Lembre-se de escolher um estilo que reflita sua personalidade como casal e crie uma atmosfera única e especial para celebrar esse momento tão especial.</p>
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
