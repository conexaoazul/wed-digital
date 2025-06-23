import React, { useEffect, useState } from "react";
import "../style.css";
import "./style.css";

import Sidebar from "../Sidebar";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Helmet from "react-helmet";

import img7 from '../../../assets/blog/7.jpg';
import NavCrumb from "../NavCrumb";

export default function Artigo_3() {
	let urlUTM = window.location.href.split("?");
	let utmData = urlUTM[1] ? `?${urlUTM[1]}` : "";

	const [shareOptions, setShareOptions] = useState(0);

	return (
		<div>
			<Helmet>
				<title>WedDigital | Blog | Artigo | Com quanto tempo devo escolher a fotografia do meu casamento?</title>
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
											<h2>Com quanto tempo devo escolher a fotografia do meu casamento?</h2>
											<p>A fotografia é uma das coisas mais importantes de um casamento se você realmente se importa em registrar momentos únicos e incríveis. Fotografar o sonho de alguém para alguns pode parecer fácil, mas acredite, é um dos trabalhos mais difíceis de casamento.</p>
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
													var win = window.open("https://wa.me/?text=https://weddigital.com.br/blog/artigo/com-quanto-tempo-devo-escolher-a-fotografia-do-meu-casamento/03-06-2023", '_blank');
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
										<img src={img7} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<p>É preciso muito mais do que equipamentos modernos e tecnológicos, isso é apenas o básico, mas ter responsabilidade, profissionalismo e sensibilidade são requisitos extremamente importantes a serem considerados no seu grande dia.</p>
											</div>
											<div className="col-lg-12">
												<p>Então se você quer entender como e quando contratar a fotografia perfeita para o seu casamento, nós da Wed Digital vamos te ajudar.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Entenda primeiro qual seu estilo de foto.</h4>
											</div>
											<div className="col-lg-12">
												<p>Antes de solicitar orçamento a qualquer profissional é bom entender qual estilo de fotografia você mais se identifica. Existem vários estilos, mas claro que você não precisa entender sobre todos eles. Normalmente fotógrafos de casamentos precisam ser experts em vários estilos de foto. Fotos tradicionais, descontraídas, preto e branco, com mais ou menos efeitos, fotos artísticas, foto reportagem, retrato e etc.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Estilos mais usados são:</h4>
											</div>
											<div className="col-lg-12">
												<p><strong>As fotos clássicas:</strong> que são aquelas planejadas e mais tradicionais, lembrar casamentos dos nossos pais e avós.</p>
											</div>
											<div className="col-lg-12">
												<p><strong>O Fotojornalismo:</strong> É um estilo que conta uma história através das fotos</p>
											</div>
											<div className="col-lg-12">
												<p><strong>Fotos espontâneas:</strong> fotos feitas sem que os noivos ou convidados percebam.</p>
											</div>
											<div className="col-lg-12">
												<p><strong>Artística:</strong> Tem um tom de editorial de revista, e geralmente é um registro mesclado com fotojornalismo</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<p>Leve em consideração a espontaneidade das fotos, isso é um fator primordial na qualidade de um bom fotógrafo. Se você tem como referências fotos de filmes, séries ou de qualquer outro lugar, apresente isso ao profissional que pretende contratar e conversem sobre as possibilidades de registrar esse dia do jeitinho que você quer.</p>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Como escolher o profissional certo?</h4>
											</div>
											<div className="col-lg-12">
												<p>Escolher um fotógrafo(a) envolve vários fatores, o profissional precisa guiar vocês no que chamamos de “Enxergar a fotografia" com um lado mais técnico e profissional. Dessa forma, vocês conseguem dizer a preferência de estilo de foto que vocês mais se identificam com um olhar mais analítico.</p>
											</div>
											<div className="col-lg-12">
												<p>Isso não significa que não é preciso buscar referências. Pelo contrário, pesquise o máximo de referências que você puder, seja de pessoas conhecidas ou de depoimentos nas mídias digitais. Após ter a certeza da procedência da determinada empresa que você pretende contratar, se atente a conexão entre vocês e toda equipe de fotografia, deixar vocês à vontade vai trazer as melhores fotos que você imaginar e é um ótimo passo para o casamento dos sonhos.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Onde buscar essas referências?</h4>
											</div>
											<div className="col-lg-12">
												<p>Muitos noivos começam a planejar seu casamento fazendo as primeiras buscas na internet. É um bom começo? Sim, mas não o único, é importante buscar recomendações de amigos e familiares. Além disso, procure por depoimentos de outros casais em nossa plataforma.</p>
											</div>
											<div className="col-lg-12">
												<p>Acompanhe esse profissional também nas redes sociais e conheça um poucos mais sobre sua rotina e seus casamentos em tempo real.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Encontramos o profissional, com quanto tempo devo contratar?</h4>
											</div>
											<div className="col-lg-12">
												<p>A fotografia deve ser um dos primeiros profissionais que você precisa contratar, principalmente se for uma empresa bem recomendada e requisitada. Já ouviram o ditado popular que “Passarinho que chega cedo na fonte, vai beber água fresca”? É exatamente sobre isso, conversem com o profissional e verifiquem a disponibilidade na agenda.</p>
											</div>
											<div className="col-lg-12">
												<p>Além disso, é bom conversar sobre quem será o profissional que estará no dia do seu casamento, algumas empresas trabalham com várias equipes então é importante deixar claro a preferência do profissional de vocês.</p>
											</div>
											<div className="col-lg-12">
												<p>Alguns profissionais já tem agendamento marcado para casamentos daqui há 2 anos, então não existe uma data exata, mas sejam prevenidos e conversem mesmo não podemos fechar contrato naquele determinado mês.</p>
											</div>
											<div className="col-lg-12">
												<p>Verifiquem também as formas e facilidades de pagamento.</p>
											</div>
											<div className="col-lg-12">
												<p>Seja rápido e encontre os melhores <a href="" className="link">AQUI</a>.</p>
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
