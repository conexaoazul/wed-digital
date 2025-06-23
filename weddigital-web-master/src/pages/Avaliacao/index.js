import React, {useState} from "react";
import "./style.css";

import imgAvaliacao from "../../assets/background-avaliacao.jpg";
import logo from "../../assets/icon.ico";

import coracao2 from "../../assets/emoji-apaixonado.png";
import coracao from "../../assets/coracao2.png";
import sorrindo from "../../assets/sorrindo.png";
import neutro from "../../assets/neutro.png";
import triste from "../../assets/emoji-triste.png";

import UploadImage from "../../components/UploadImage";

import Helmet from "react-helmet";

export default function Avaliacao() {
    let urlUTM = window.location.href.split("?");
    let utmData = urlUTM[1] ? `?${urlUTM[1]}` : "";

    const [Imagens, setImagens] = useState([]);

    let listaImagens = Imagens;
    let listaCardImagensVitrine = [];

    for (const element of listaImagens) {
        listaCardImagensVitrine.push(
            <div className="col-lg-3">
                <div
                    className="image"
                    style={{
                        background: `url(${element.urlImagem}) no-repeat center/cover`,
                    }}
                ></div>
            </div>,
        );
    }

    function selectRate(event, value, question) {
        question(value);
        if (event.target.nodeName !== "BUTTON") {
            let a =
                event.target.parentElement.parentElement.querySelectorAll("button");
            a.forEach((element) => {
                element.classList.remove("active");
            });
            event.target.parentElement.classList.add("active");
            return false;
        }
        let a = event.target.parentElement.querySelectorAll("button");
        a.forEach((element) => {
            element.classList.remove("active");
        });
        event.target.classList.add("active");
    }

    const [step, setStep] = useState(1);

    const [question_1, setQuestion_1] = useState(0);
    const [question_2, setQuestion_2] = useState(0);
    const [question_3, setQuestion_3] = useState(0);
    const [question_4, setQuestion_4] = useState(0);
    const [question_5, setQuestion_5] = useState("");
    const [question_6, setQuestion_6] = useState("");

    const [error, setError] = useState(0);

    function toggleStep(step, question) {
        if (question === 0) {
            setError(1);
            return false;
        }
        setError(0);
        setStep(step);
    }

    const [nomeFornecedor, setNomeFornecedor] = useState("Life Show Orquestra");
    const [enderecoFornecedor, setEnderecoFornecedor] = useState(
        "Rua exemplo numero 123",
    );
    const [cidadeFornecedor, setCidadeFornecedor] = useState("Recife");
    const [estadoFornecedor, setEstadoFornecedor] = useState("(Pernambuco)");

    return (
        <div>
            <Helmet>
                <title>WedDigital</title>
            </Helmet>

            {/* --- INIT PIXEL --- */}
            <noscript>
                <iframe
                    src="https://www.googletagmanager.com/ns.html?id=GTM-TNVR898"
                    height="0"
                    width="0"
                    style="display:none;visibility:hidden"
                ></iframe>
            </noscript>
            {/* --- END PIXEL --- */}

            <section
                className="avaliacao"
                style={{
                    background: `linear-gradient(0deg, hsl(252deg 76.27% 4% / 72%), hsl(273.68deg 100% 4% / 72%)), url(${imgAvaliacao}) no-repeat center/cover fixed`,
                }}
            >
                <div className="container-fluid px-lg-0">
                    <div className="row g-0">
                        <div className="col-lg-12">
                            <div className="header_">
                                <div className="logo">
                                    <img src={logo}/>
                                    <span>
                    Wed<span>Digital</span>
                  </span>
                                </div>
                                <a href="/" className="link">
                                    <i className="fa-solid fa-arrow-left-long me-3"></i>
                                    <span>Voltar</span>
                                </a>
                            </div>
                        </div>
                        {/* background */}
                        {step !== 7 ? (
                            <div className="col-lg-6">
                                <div className="background">
                                    <h2>Avalie e concorra a R$3.000 mil reais</h2>
                                    <p>
                                        Ajude outros noivos e conquiste 200 pontos compartilhando
                                        sobre o seu casamento
                                    </p>
                                    {/* <a href="" className="link">
										<span>Mais informações</span>
										<i className="fa-solid fa-chevron-right ms-3"></i>
									</a> */}
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                        {/* end background */}
                        {/* forms */}
                        <div
                            className={step !== 7 ? "col-lg-5 me-auto" : "col-lg-5 mx-auto"}
                        >
                            <div className="forms">
                                {step !== 7 ? (
                                    <>
                                        <div className="title">
                                            <h2>Valorizamos sua avaliação</h2>
                                        </div>
                                        <div className="progress_">
                                            <label className="mb-2">{step} de 6</label>
                                            <div className="bar">
                                                <span style={{width: (step * 100) / 6 + "%"}}></span>
                                            </div>
                                        </div>
                                        <hr/>
                                    </>
                                ) : (
                                    <></>
                                )}
                                {/* contents */}
                                <div className="contents">
                                    {/* block */}
                                    {step === 1 ? (
                                        <>
                                            <div className="block">
                                                <div className="fornecedor">
                                                    <div
                                                        className="image"
                                                        style={{
                                                            background: `url(${imgAvaliacao}) no-repeat center/cover`,
                                                        }}
                                                    ></div>
                                                    <div>
                                                        <h4>{nomeFornecedor}</h4>
                                                        {/* <div className="address">{enderecoFornecedor}</div> */}
                                                        <div className="address">
                                                            {cidadeFornecedor} {estadoFornecedor}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="title">
                                                    <h4>Como foi a entrega do serviço combinado?</h4>
                                                </div>
                                                <div className="options">
                                                    <button
                                                        className={question_1 === 1 ? "active" : ""}
                                                        onClick={(event) =>
                                                            selectRate(event, 1, setQuestion_1)
                                                        }
                                                    >
                                                        <img src={triste}/>
                                                        <span>Péssimo</span>
                                                    </button>
                                                    <button
                                                        className={question_1 === 2 ? "active" : ""}
                                                        onClick={(event) =>
                                                            selectRate(event, 2, setQuestion_1)
                                                        }
                                                    >
                                                        <img src={neutro}/>
                                                        <span>Regular</span>
                                                    </button>
                                                    <button
                                                        className={question_1 === 3 ? "active" : ""}
                                                        onClick={(event) =>
                                                            selectRate(event, 3, setQuestion_1)
                                                        }
                                                    >
                                                        <img src={sorrindo}/>
                                                        <span>Bom</span>
                                                    </button>
                                                    <button
                                                        className={question_1 === 4 ? "active" : ""}
                                                        onClick={(event) =>
                                                            selectRate(event, 4, setQuestion_1)
                                                        }
                                                    >
                                                        <img src={coracao}/>
                                                        <span>Muito bom</span>
                                                    </button>
                                                    <button
                                                        className={question_1 === 5 ? "active" : ""}
                                                        onClick={(event) =>
                                                            selectRate(event, 5, setQuestion_1)
                                                        }
                                                    >
                                                        <img src={coracao2}/>
                                                        <span>Excelente</span>
                                                    </button>
                                                </div>
                                                {error ? (
                                                    <div className="alert alert-danger mt-4">
                                                        Escolha uma das opções!
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}
                                                <div className="buttons pt-4 text-end">
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => toggleStep(2, question_1)}
                                                    >
                                                        <span>Próximo</span>
                                                        <i className="fa-solid fa-chevron-right ms-3"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {/* end block */}
                                    {/* block */}
                                    {step === 2 ? (
                                        <>
                                            <div className="block">
                                                <div className="fornecedor">
                                                    <div
                                                        className="image"
                                                        style={{
                                                            background: `url(${imgAvaliacao}) no-repeat center/cover`,
                                                        }}
                                                    ></div>
                                                    <div>
                                                        <h4>{nomeFornecedor}</h4>
                                                        <div className="address">{enderecoFornecedor}</div>
                                                        <div className="address">
                                                            {cidadeFornecedor} {estadoFornecedor}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="title">
                                                    <h4>Gostou do atendimento do início ao fim?</h4>
                                                </div>
                                                <div className="options">
                                                    <button
                                                        className={question_2 === 1 ? "active" : ""}
                                                        onClick={(event) =>
                                                            selectRate(event, 1, setQuestion_2)
                                                        }
                                                    >
                                                        <img src={triste}/>
                                                        <span>Péssimo</span>
                                                    </button>
                                                    <button
                                                        className={question_2 === 2 ? "active" : ""}
                                                        onClick={(event) =>
                                                            selectRate(event, 2, setQuestion_2)
                                                        }
                                                    >
                                                        <img src={neutro}/>
                                                        <span>Regular</span>
                                                    </button>
                                                    <button
                                                        className={question_2 === 3 ? "active" : ""}
                                                        onClick={(event) =>
                                                            selectRate(event, 3, setQuestion_2)
                                                        }
                                                    >
                                                        <img src={sorrindo}/>
                                                        <span>Bom</span>
                                                    </button>
                                                    <button
                                                        className={question_2 === 4 ? "active" : ""}
                                                        onClick={(event) =>
                                                            selectRate(event, 4, setQuestion_2)
                                                        }
                                                    >
                                                        <img src={coracao}/>
                                                        <span>Muito bom</span>
                                                    </button>
                                                    <button
                                                        className={question_2 === 5 ? "active" : ""}
                                                        onClick={(event) =>
                                                            selectRate(event, 5, setQuestion_2)
                                                        }
                                                    >
                                                        <img src={coracao2}/>
                                                        <span>Excelente</span>
                                                    </button>
                                                </div>
                                                {error ? (
                                                    <div className="alert alert-danger mt-4">
                                                        Escolha uma das opções!
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}
                                                <div className="buttons pt-4 text-end">
                                                    <button
                                                        className="btn link"
                                                        onClick={() => toggleStep(1, "")}
                                                    >
                                                        <span>Voltar</span>
                                                    </button>
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => toggleStep(3, question_2)}
                                                    >
                                                        <span>Próximo</span>
                                                        <i className="fa-solid fa-chevron-right ms-3"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {/* end block */}
                                    {/* block */}
                                    {step === 3 ? (
                                        <>
                                            <div className="block">
                                                <div className="fornecedor">
                                                    <div
                                                        className="image"
                                                        style={{
                                                            background: `url(${imgAvaliacao}) no-repeat center/cover`,
                                                        }}
                                                    ></div>
                                                    <div>
                                                        <h4>{nomeFornecedor}</h4>
                                                        <div className="address">{enderecoFornecedor}</div>
                                                        <div className="address">
                                                            {cidadeFornecedor} {estadoFornecedor}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="title">
                                                    <h4>
                                                        Como foi o profissionalismo diante dos imprevistos?
                                                    </h4>
                                                </div>
                                                <div className="options">
                                                    <button
                                                        className={question_3 === 1 ? "active" : ""}
                                                        onClick={(event) =>
                                                            selectRate(event, 1, setQuestion_3)
                                                        }
                                                    >
                                                        <img src={triste}/>
                                                        <span>Péssimo</span>
                                                    </button>
                                                    <button
                                                        className={question_3 === 2 ? "active" : ""}
                                                        onClick={(event) =>
                                                            selectRate(event, 2, setQuestion_3)
                                                        }
                                                    >
                                                        <img src={neutro}/>
                                                        <span>Regular</span>
                                                    </button>
                                                    <button
                                                        className={question_3 === 3 ? "active" : ""}
                                                        onClick={(event) =>
                                                            selectRate(event, 3, setQuestion_3)
                                                        }
                                                    >
                                                        <img src={sorrindo}/>
                                                        <span>Bom</span>
                                                    </button>
                                                    <button
                                                        className={question_3 === 4 ? "active" : ""}
                                                        onClick={(event) =>
                                                            selectRate(event, 4, setQuestion_3)
                                                        }
                                                    >
                                                        <img src={coracao}/>
                                                        <span>Muito bom</span>
                                                    </button>
                                                    <button
                                                        className={question_3 === 5 ? "active" : ""}
                                                        onClick={(event) =>
                                                            selectRate(event, 5, setQuestion_3)
                                                        }
                                                    >
                                                        <img src={coracao2}/>
                                                        <span>Excelente</span>
                                                    </button>
                                                </div>
                                                {error ? (
                                                    <div className="alert alert-danger mt-4">
                                                        Escolha uma das opções!
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}
                                                <div className="buttons pt-4 text-end">
                                                    <button
                                                        className="btn link"
                                                        onClick={() => toggleStep(2, "")}
                                                    >
                                                        <span>Voltar</span>
                                                    </button>
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => toggleStep(4, question_3)}
                                                    >
                                                        <span>Próximo</span>
                                                        <i className="fa-solid fa-chevron-right ms-3"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {/* end block */}
                                    {/* block */}
                                    {step === 4 ? (
                                        <>
                                            <div className="block">
                                                <div className="fornecedor">
                                                    <div
                                                        className="image"
                                                        style={{
                                                            background: `url(${imgAvaliacao}) no-repeat center/cover`,
                                                        }}
                                                    ></div>
                                                    <div>
                                                        <h4>{nomeFornecedor}</h4>
                                                        <div className="address">{enderecoFornecedor}</div>
                                                        <div className="address">
                                                            {cidadeFornecedor} {estadoFornecedor}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="title">
                                                    <h4>Indicaria?</h4>
                                                </div>
                                                <div className="options justify-content-start">
                                                    <button
                                                        className={question_4 === 1 ? "btn active" : "btn"}
                                                        onClick={(event) =>
                                                            selectRate(event, 1, setQuestion_4)
                                                        }
                                                    >
                                                        <span>Não</span>
                                                    </button>
                                                    <button
                                                        className={question_4 === 2 ? "btn active" : "btn"}
                                                        onClick={(event) =>
                                                            selectRate(event, 2, setQuestion_4)
                                                        }
                                                    >
                                                        <span>Sim</span>
                                                    </button>
                                                </div>
                                                {error ? (
                                                    <div className="alert alert-danger mt-4">
                                                        Escolha uma das opções!
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}
                                                <div className="buttons pt-4 text-end">
                                                    <button
                                                        className="btn link"
                                                        onClick={() => toggleStep(3, "")}
                                                    >
                                                        <span>Voltar</span>
                                                    </button>
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => toggleStep(5, question_4)}
                                                    >
                                                        <span>Próximo</span>
                                                        <i className="fa-solid fa-chevron-right ms-3"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {/* end block */}
                                    {/* block */}
                                    {step === 5 ? (
                                        <>
                                            <div className="block">
                                                <div className="fornecedor">
                                                    <div
                                                        className="image"
                                                        style={{
                                                            background: `url(${imgAvaliacao}) no-repeat center/cover`,
                                                        }}
                                                    ></div>
                                                    <div>
                                                        <h4>{nomeFornecedor}</h4>
                                                        <div className="address">{enderecoFornecedor}</div>
                                                        <div className="address">
                                                            {cidadeFornecedor} {estadoFornecedor}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="title">
                                                    <h4>
                                                        Compartilhe fotos do seu sonho{" "}
                                                        <span>(opcional)</span>
                                                    </h4>
                                                    <p>Inspire casais com as melhores imagens</p>
                                                </div>
                                                <div>
                                                    <UploadImage
                                                        isAvaliacao={true}
                                                        isImagemPerfil={false}
                                                        idUsuario={false}
                                                        tokenUsuario={false}
                                                        setImageUrl={true}
                                                        corBG="black"
                                                    />
                                                </div>
                                                <div className="buttons pt-4 text-end">
                                                    <button
                                                        className="btn link"
                                                        onClick={() => toggleStep(4, "")}
                                                    >
                                                        <span>Voltar</span>
                                                    </button>
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => toggleStep(6, "")}
                                                    >
                                                        <span>Próximo</span>
                                                        <i className="fa-solid fa-chevron-right ms-3"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {/* end block */}
                                    {/* block */}
                                    {step === 6 ? (
                                        <>
                                            <div className="block">
                                                <div className="fornecedor">
                                                    <div
                                                        className="image"
                                                        style={{
                                                            background: `url(${imgAvaliacao}) no-repeat center/cover`,
                                                        }}
                                                    ></div>
                                                    <div>
                                                        <h4>{nomeFornecedor}</h4>
                                                        <div className="address">{enderecoFornecedor}</div>
                                                        <div className="address">
                                                            {cidadeFornecedor} {estadoFornecedor}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="title">
                                                    <h4>
                                                        Quanto pagou no serviço? <span>(opcional)</span>
                                                    </h4>
                                                    <p>Essa informação será confindencial</p>
                                                </div>
                                                <div className="row g-4">
                                                    <div className="col-lg-5 col-7">
                                                        <div className="input-group">
                              <span
                                  className="input-group-text"
                                  id="basic-addon1"
                              >
                                R$
                              </span>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder=""
                                                                value={question_6}
                                                                onChange={(event) => setQuestion_6(event.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-8">
                                                        <p className="mb-0">
                                                            <small>
                                                                Ao finalizar declaro que essa avaliação é de
                                                                acordo com a experiência que tive em meu
                                                                casamento*
                                                            </small>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="buttons pt-4 text-end">
                                                    <button
                                                        className="btn link"
                                                        onClick={() => toggleStep(5, "")}
                                                    >
                                                        <span>Voltar</span>
                                                    </button>
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => toggleStep(7, "")}
                                                    >
                                                        <span>Finalizar pesquisa</span>
                                                        <i className="fa-solid fa-chevron-right ms-3"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {/* end block */}
                                    {/* block */}
                                    {step === 7 ? (
                                        <>
                                            <div className="block pt-0">
                                                <div className="title text-center">
                                                    <h2>Muito obrigado por responder</h2>
                                                    <p>Essa informação será confindencial</p>
                                                </div>
                                                <div className="buttons pt-4 text-center">
                                                    <a href="/" className="btn btn-secondary">
                                                        <i className="fa-solid fa-chevron-left me-3"></i>
                                                        <span>Voltar para site</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {/* end block */}
                                </div>
                                {/* end contents */}
                            </div>
                        </div>
                        {/* end forms */}
                    </div>
                </div>
            </section>
        </div>
    );
}
