import React, { useEffect, useState } from "react";
import "../style.css";
import "./style.css";

import Sidebar from "../Sidebar";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Helmet from "react-helmet";

import img8 from '../../../assets/blog/8.jpg';
import img9 from '../../../assets/blog/9.jpg';
import img10 from '../../../assets/blog/10.jpg';
import img11 from '../../../assets/blog/11.jpg';
import img12 from '../../../assets/blog/12.jpg';
import NavCrumb from "../NavCrumb";

export default function Artigo_4() {
	let urlUTM = window.location.href.split("?");
	let utmData = urlUTM[1] ? `?${urlUTM[1]}` : "";

	const [shareOptions, setShareOptions] = useState(0);

	return (
		<div>
			<Helmet>
				<title>WedDigital | Blog | Artigo | Qual buquê de noiva ideal para o seu casamento?</title>
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
											<h2>Qual buquê de noiva ideal para o seu casamento?</h2>
											<p>Tendência de buquê de noiva para casamentos em 2023</p>
											<p>O buquê de noiva é um dos elementos mais importantes do casamento, pois simboliza a beleza e a delicadeza da noiva. Cada ano, as tendências de buquês de noiva mudam e em 2023 não será diferente. Aqui estão algumas das tendências mais populares de buquês de noiva para casamentos em 2023:</p>
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
													var win = window.open("https://wa.me/?text=https://weddigital.com.br/blog/artigo/qual-buque-de-noiva-ideal-para-o-seu-casamento/03-06-2023", '_blank');
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
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Buquês de noiva com flores secas</h4>
											</div>
											<div className="col-lg-12">
												<img src={img12} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>
											<div className="col-lg-12">
												<p>As flores secas serão uma grande tendência em 2023. Os buquês de noiva com flores secas têm uma aparência mais rústica e natural, além de serem mais duráveis ​​do que os buquês de noiva tradicionais. Esses buquês podem ser personalizados com diferentes tipos de flores secas, como lavanda, sálvia, eucalipto, entre outras.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Buquês de noiva com flores silvestres</h4>
											</div>
											<div className="col-lg-12">
												<img src={img11} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>
											<div className="col-lg-12">
												<p>Os buquês de noiva com flores silvestres estão em alta há algum tempo e continuarão sendo uma tendência em 2023. Esses buquês têm uma aparência mais natural e orgânica, além de serem mais econômicos. As flores silvestres são perfeitas para casamentos ao ar livre ou em ambientes rústicos.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Buquês de noiva monocromáticos</h4>
											</div>
											<div className="col-lg-12">
												<img src={img10} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>
											<div className="col-lg-12">
												<p>Os buquês de noiva monocromáticos são uma tendência elegante e sofisticada para casamentos em 2023. Esses buquês são compostos por flores da mesma cor ou tons semelhantes, criando uma aparência uniforme e elegante. As cores mais populares para buquês monocromáticos são rosa, branco e azul.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Buquês de noiva com folhagens exóticas</h4>
											</div>
											<div className="col-lg-12">
												<img src={img9} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>
											<div className="col-lg-12">
												<p>Os buquês de noiva com folhagens exóticas serão uma grande tendência em 2023. Esses buquês são compostos por uma mistura de flores e folhagens exóticas, como monstera, samambaias, costela-de-adão, entre outras. Esses buquês têm uma aparência exótica e tropical, perfeita para casamentos na praia ou em ambientes ao ar livre.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Buquês de noiva com fitas longas</h4>
											</div>
											<div className="col-lg-12">
												<img src={img8} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>
											<div className="col-lg-12">
												<p>As fitas longas serão uma grande tendência em 2023. Os buquês de noiva com fitas longas são compostos por flores e folhagens que são amarradas com fitas longas de seda, cetim ou organza. Esses buquês têm uma aparência mais suave e fluida, além de serem ideais para casamentos elegantes e sofisticados.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<p>Essas são algumas das tendências de buquê de noiva para casamentos em 2023. Independentemente de qual tendência você escolher, o importante é que o buquê de noiva represente a personalidade da noiva e o estilo do casamento. Com essas opções, a noiva pode escolher um buquê que seja perfeito para ela e para o grande dia!</p>
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
