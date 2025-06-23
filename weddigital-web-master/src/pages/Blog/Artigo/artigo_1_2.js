import React, { useEffect, useState } from "react";
import "../style.css";
import "./style.css";

import Sidebar from "../Sidebar";
import NavCrumb from '../NavCrumb'
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Helmet from "react-helmet";

import img26 from '../../../assets/blog/26.jpg';
import img27 from '../../../assets/blog/27.jpg';

export default function Artigo_1() {
	let urlUTM = window.location.href.split("?");
	let utmData = urlUTM[1] ? `?${urlUTM[1]}` : "";

	const [shareOptions, setShareOptions] = useState(0);

	return (
		<div>
			<Helmet>
				<title>WedDigital | Blog | Artigo | Entenda sobre como a decoração do seu casamento pode mudar tudo</title>
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
											<h2>Entenda sobre como a decoração do seu casamento pode mudar tudo.</h2>
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
													var win = window.open("https://wa.me/?text=https://weddigital.com.br/blog/artigo/entenda-sobre-como-a-decoracao-do-seu-casamento-pode-mudar-tudo/03-06-2023", '_blank');
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
										<img src={img27} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Defina um tema ou estilo</h4>
											</div>
											<div className="col-lg-12">
												<p>Antes de começar a pensar na decoração, é importante definir um tema ou estilo para o seu casamento. Pode ser romântico, rústico, moderno, vintage ou até mesmo uma combinação de estilos. Ter um tema ou estilo em mente ajudará a orientar suas escolhas de decoração e garantir que todos os elementos se complementam harmoniosamente.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Escolha as cores certas</h4>
											</div>
											<div className="col-lg-12">
												<p>As cores escolhidas para a decoração têm um impacto significativo na atmosfera do casamento. Cores suaves e românticas, como tons pastel e branco, criam uma sensação de delicadeza e elegância. Cores vibrantes, como vermelho, roxo ou dourado, adicionam energia e ousadia à decoração. Escolha as cores que representam seu estilo e personalidade como casal, e use-as de forma consistente em todos os elementos decorativos, desde os arranjos de flores até os detalhes da mesa.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<img src={img26} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Iluminação adequada</h4>
											</div>
											<div className="col-lg-12">
												<p>A iluminação adequada pode transformar completamente o ambiente do seu casamento. Utilize diferentes tipos de iluminação para criar uma atmosfera mágica e romântica. Velas são uma opção clássica para adicionar um brilho suave e romântico, enquanto luzes suspensas ou luminárias criam um ambiente mais moderno e acolhedor. Não se esqueça de considerar a iluminação externa, especialmente se o casamento acontecer ao ar livre durante a noite. A iluminação certa pode fazer toda a diferença nas fotos e na experiência geral do casamento.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Detalhes personalizados</h4>
											</div>
											<div className="col-lg-12">
												<p>Adicionar toques pessoais à decoração é uma ótima maneira de tornar o casamento único e memorável. Inclua elementos que reflitam a história e personalidade do casal, como fotografias, objetos de valor sentimental, cartas de amor ou até mesmo elementos temáticos que representam interesses compartilhados. Esses detalhes personalizados não apenas tornarão o ambiente mais íntimo, mas também criarão momentos emocionantes para você e seus convidados.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Arranjos florais deslumbrantes</h4>
											</div>
											<div className="col-lg-12">
												<p>As flores são uma parte essencial da decoração de casamento e podem adicionar beleza e cor a qualquer espaço. Opte por arranjos florais deslumbrantes que combinam com a paleta de cores escolhida e o estilo do casamento. Além dos arranjos nas mesas, considere a criação de um impressionante arco de flores para a cerimônia ou um imponente arranjo no centro do salão de festas. As flores certas podem fazer toda a diferença na atmosfera e estética do casamento.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Espaços aconchegantes e funcionais</h4>
											</div>
											<div className="col-lg-12">
												<p>Não se esqueça de considerar o conforto dos seus convidados ao planejar a decoração. Crie espaços aconchegantes para que seus convidados possam relaxar e desfrutar da festa. Crie áreas de lounge com sofás confortáveis, almofadas e mantas para que as pessoas possam descansar e conversar. Certifique-se também de que o layout do espaço seja funcional, permitindo uma circulação fácil e acesso conveniente a áreas como o bar, a pista de dança e os banheiros.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<p>Lembre-se de que a decoração é uma forma de expressar sua personalidade como casal e criar uma atmosfera única para o seu casamento. Utilize essas dicas como inspiração, mas não tenha medo de adicionar seu toque pessoal e criatividade. Com a decoração certa, seu casamento será uma experiência inesquecível tanto para vocês quanto para seus convidados. Aproveite cada momento e celebre o amor em grande estilo!</p>
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
