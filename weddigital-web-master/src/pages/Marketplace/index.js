import React, {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import "./Marketplace.css";

import api from "../../api";

import Navbar from "../../components/Navbar";
import CardAnuncioMarketplace from "../../components/Marketplace/CardProfissionalMarketplace";
import CardAnuncioPlaceholder from "../../components/Modal/CardAnuncioPlaceholder";
import Footer from "../../components/Footer";
import {Cascader, Modal} from "antd";

import constantes from "../../constantes.json";
import {optionsSegmento} from "../../utils/models/ModelsUtils";
import SuffixIcon from "../../assets/icons/SuffixIcon";
import {useNavigate} from "react-router-dom";

const urlRedirect = constantes["ambiente-producao"]
    ? constantes.linkPublicoProducao
    : constantes.linkPublicoLocalhost;
const params = new URLSearchParams(window.location.search);

export default function Marketplace() {
    const history = useNavigate();
    const [utm_estado, setUtm_estado] = useState(
        params.get("estado") ? params.get("estado") : "",
    );
    const [utm_categoria, setUtm_categoria] = useState(
        params.get("categoria") ? params.get("categoria") : "",
    );
    const [utm_segmento, setUtm_segmento] = useState(
        params.get("segmento") ? params.get("segmento") : "",
    );
    const [utm_pagina, setUtm_pagina] = useState(
        params.get("pagina") ? Number(params.get("pagina")) : 1,
    );

    const [profissionais, setProfissionais] = useState([]);
    const [isCarregandoDados, setIsCarregandoDados] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [pageNumber, setPageNumber] = useState(0);
    const itensPorPagina = 15; // Exibe 15 itens por página
    const qtdPagina = Math.ceil(profissionais.length / itensPorPagina);
    const [paginaAtual, setPaginaAtual] = useState(0);

    useEffect(() => {
        if (utm_estado == null || utm_estado === "" || utm_estado.length === 0) {
            setIsModalOpen(true);
            setUtm_estado("BR");
        } else if (utm_estado === "BR") {
            api
                .get("profissionais/listarTodos/")
                .then(({data}) => {
                    setProfissionais(data);
                    setIsCarregandoDados(false);
                    //eslint-disable-next-line react-hooks/exhaustive-deps
                })
                .catch(({error}) => {
                    setIsCarregandoDados(false);
                    console.error(error);
                });
        } else {
            setTimeout(() => {
                setIsModalOpen(false);
                filtrarProfissionais();
            }, 500);
        }
    }, []);

    const handleClose = () => {
        setIsModalOpen(false);
        filtrarProfissionais();
    };

    const redirecionarFiltroEstado = () => {
        window.open(
            `${urlRedirect}/buscar-profissional?estado=${utm_estado}&categoria=${utm_categoria}&segmento=${utm_segmento}&pagina=${utm_pagina}`,
            "_self",
        );
    };

    const displayData = () => {
        window.scrollTo(0, 0);
        const startIndex = pageNumber * itensPorPagina;
        return profissionais.slice(startIndex, startIndex + itensPorPagina);
    };

    function handlePageClick(data) {
        setPageNumber(data.selected);
        setPaginaAtual(data.selected);
        setUtm_pagina(data.selected + 1);
    }

    function filtrarProfissionais() {
        setIsCarregandoDados(true);

        let categoria = utm_categoria || "";
        let segmento = utm_segmento || "";
        let estado = utm_estado || "BR";

        api
            .get(
                `profissionais/filtrarProfissionais?categoria=${categoria}&segmento=${segmento}&estado=${estado}`,
            )
            .then(({data}) => {
                setProfissionais(data);
                setIsCarregandoDados(false);

                let qtdProfissionais = data.length;
                let _qtdPaginas = Math.ceil(qtdProfissionais / itensPorPagina);

                if (_qtdPaginas >= utm_pagina) {
                    handlePageClick({selected: utm_pagina - 1});
                    setPaginaAtual(utm_pagina - 1);
                }
                //eslint-disable-next-line react-hooks/exhaustive-deps
            })
            .catch((error) => {
                console.error(error);
                setIsCarregandoDados(false);
            });
    }

    const onChangeSegmento = (value) => {
        if (value === undefined) {
            setUtm_segmento("");
            setUtm_categoria("");
            return;
        }

        let categoria = value[0];
        let segmento = value[1];

        setUtm_segmento(segmento);
        setUtm_categoria(categoria);
    };

    function onChangeEstado(ev) {
        ev.preventDefault();
        const {value} = ev.target;
        setUtm_estado(value);
    }

    useEffect(() => {
        const param1 = localStorage.getItem("paginaAtual");
        if (param1) {
            let number = Number(param1);
            setPaginaAtual(number);
            setPageNumber(number);
            setUtm_pagina(number + 1);
            localStorage.removeItem("paginaAtual");
        }
    }, [history]);

    return (
        <div className="marketplace-container">
            {/* --- INIT PIXEL --- */}
            <noscript>
                <iframe
                    title={"gtag"}
                    src="https://www.googletagmanager.com/ns.html?id=GTM-TNVR898"
                    height="0"
                    width="0"
                    style="display:none;visibility:hidden"
                ></iframe>
            </noscript>
            {/* --- END PIXEL --- */}

            <Navbar/>

            <div className="marketplace-corpo-produtos">
                <div className="container__vitrine__marketplacce">
                    <div>
                        <div className="breadcrumb-container px-lg-5">
                            <div className="container-fluid px-lg-0 px-3 my-0">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="/perfil">Início</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Busca
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>

                        <div className="px-lg-5 px-3">
                            <div className="row g-4 align-items-end">
                                <div className="col-lg-3">
                                    <label htmlFor="validationCustom04" className="form-label">
                                        Segmento da empresa
                                    </label>
                                    <div className="form-floating col-md-12">
                                        <Cascader
                                            options={optionsSegmento}
                                            onChange={onChangeSegmento}
                                            size={"large"}
                                            style={{height: "43px"}}
                                            placeholder="Clique para selecionar"
                                            suffixIcon={<SuffixIcon/>}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <label htmlFor="validationCustom04" className="form-label">
                                        Região
                                    </label>
                                    <select
                                        className="form-select"
                                        style={{height: "50px"}}
                                        id="validationCustom04Estado"
                                        name="estado"
                                        onChange={onChangeEstado}
                                        value={utm_estado}
                                    >
                                        <option value="BR">Todos os estados</option>
                                        <option value="AC">Acre</option>
                                        <option value="AL">Alagoas</option>
                                        <option value="AP">Amapá</option>
                                        <option value="AM">Amazonas</option>
                                        <option value="BA">Bahia</option>
                                        <option value="CE">Ceará</option>
                                        <option value="DF">Distrito Federal</option>
                                        <option value="ES">Espírito Santo</option>
                                        <option value="GO">Goiás</option>
                                        <option value="MA">Maranhão</option>
                                        <option value="MT">Mato Grosso</option>
                                        <option value="MS">Mato Grosso do Sul</option>
                                        <option value="MG">Minas Gerais</option>
                                        <option value="PA">Pará</option>
                                        <option value="PB">Paraíba</option>
                                        <option value="PR">Paraná</option>
                                        <option value="PE">Pernambuco</option>
                                        <option value="PI">Piauí</option>
                                        <option value="RJ">Rio de Janeiro</option>
                                        <option value="RN">Rio Grande do Norte</option>
                                        <option value="RS">Rio Grande do Sul</option>
                                        <option value="RO">Rondônia</option>
                                        <option value="RR">Roraima</option>
                                        <option value="SC">Santa Catarina</option>
                                        <option value="SP">São Paulo</option>
                                        <option value="SE">Sergipe</option>
                                        <option value="TO">Tocantins</option>
                                    </select>
                                </div>
                                <div className="col-lg-auto">
                                    <div className="input-group rounded botoesFiltros">
                                        <button
                                            className="btn btn-primary mb-0 py-2"
                                            style={{height: "44px", borderRadius: ".56rem"}}
                                            onClick={redirecionarFiltroEstado}
                                            type={"button"}
                                        >
                                            Filtrar Profissional
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Modal
                            title="Encontrar profissionais de:"
                            open={isModalOpen}
                            onOk={redirecionarFiltroEstado}
                            onCancel={handleClose}
                        >
                            <div className="col-lg-12">
                                <select
                                    className="form-control form-select"
                                    id="validationCustom04Estado"
                                    name="estado"
                                    onChange={onChangeEstado}
                                    value={utm_estado}
                                >
                                    <option value="BR">Todos os estados</option>
                                    <option value="AC">Acre</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                </select>
                            </div>
                        </Modal>

                        {isCarregandoDados ? (
                            <div className="placeholder-lista-profissionais">
                                <CardAnuncioPlaceholder/>
                                <CardAnuncioPlaceholder/>
                                <CardAnuncioPlaceholder/>
                                <CardAnuncioPlaceholder/>
                            </div>
                        ) : (
                            <div>
                                <div
                                    className="paginacaoContainer"
                                    style={{
                                        marginTop: "3.5rem",
                                        marginBottom: "1.5rem",
                                    }}
                                >
                                    <ReactPaginate
                                        className="paginacaoMarketplaceProfissionais"
                                        previousLabel={"Anterior"}
                                        nextLabel={"Próximo"}
                                        breakLabel={"..."}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={3}
                                        pageCount={qtdPagina}
                                        onPageChange={handlePageClick}
                                        subContainerClassName={"pages pagination"}
                                        activeClassName={"active"}
                                        forcePage={paginaAtual}
                                        containerClassName={"pagination-container"}
                                        pageClassName="paginacaoMarketplaceProfissionais"
                                    />

                                    <p style={{marginTop: "1rem", marginBottom: "1rem"}}>
                                        Você está na página {paginaAtual + 1}.
                                    </p>
                                </div>

                                <div className="listCardsProfissionaisMarketplace">
                                    <div className="row g-4 itemCardsProfissionaisMarketplace">
                                        {displayData().map((item) => (
                                            <CardAnuncioMarketplace
                                                dadosProfissionais={item}
                                                key={item.idProfissional}
                                                paginaAtual={paginaAtual}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div
                                    className="paginacaoContainer"
                                    style={{
                                        marginTop: "3.5rem",
                                        marginBottom: "1.5rem",
                                    }}
                                >
                                    <ReactPaginate
                                        className="paginacaoMarketplaceProfissionais"
                                        previousLabel={"Anterior"}
                                        nextLabel={"Próximo"}
                                        breakLabel={"..."}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={3}
                                        pageCount={qtdPagina}
                                        onPageChange={handlePageClick}
                                        subContainerClassName={"pages pagination"}
                                        activeClassName={"active"}
                                        forcePage={paginaAtual}
                                        containerClassName={"pagination-container"}
                                        pageClassName="paginacaoMarketplaceProfissionais"
                                    />

                                    <p style={{marginTop: "1rem", marginBottom: "2rem"}}>
                                        Você está na página {paginaAtual + 1}.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
