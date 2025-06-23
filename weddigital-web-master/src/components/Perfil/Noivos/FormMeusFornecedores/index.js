import React, {useEffect, useState} from "react";

import PainelGestaoOrcamento from "./PainelGestaoOrcamento/PainelGestaoOrcamento";
import ModalAdicionarFornecedor from "./ModalAdicionarFornecedor/ModalAdicionarFornecedor";
import api from "../../../../api";
import PropTypes from "prop-types";

export default function FormMeusFornecedores(props) {
    const [isProcurandoPorFornecedor, setIsProcurandoPorFornecedor] =
        useState(false);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [profissionais, setProfissionais] = useState([]);
    const [contratoSelecionado, setContratoSelecionado] = useState({});
    const [contratoRef, setContratoRef] = useState({});

    const dadosCasamento = props.dadosResumoPerfil.dadosCasamento;
    const idUsuario = props.dadosResumoPerfil.idUsuario;

    useEffect(() => {
        api.get("profissionais/listarTodos/").then(({data}) => {
            setProfissionais(
                data.map((element) => ({
                    idProfissional: element.idProfissional,
                    nome: `${element.nomeEmpresa} (${element.cidade ? `${element.cidade} - ` : ""}${element.estado})`,
                    categoria: element.categoria,
                    imagem:
                        element.imagemPerfil && element.imagemPerfil !== ""
                            ? element.imagemPerfil
                            : element.imagemMarketplace,
                })),
            );
        });
    }, []);

    return (
        <div style={{background: "var(--color-branco)"}}>
            <ModalAdicionarFornecedor
                categoriaSelecionada={categoriaSelecionada}
                idUsuario={idUsuario}
                fornecedores={profissionais}
                open={isProcurandoPorFornecedor}
                onCancel={() => setIsProcurandoPorFornecedor(false)}
                contratoSelecionado={contratoSelecionado}
                contratoRef={contratoRef}
            />

            <PainelGestaoOrcamento
                setContratoRef={setContratoRef}
                setTabLocation={props.tabLocation}
                adicionarNovoFornecedor={() => setIsProcurandoPorFornecedor(true)}
                setCategoriaSelecionada={setCategoriaSelecionada}
                dadosCasamento={dadosCasamento}
                fornecedores={[]}
                handleContratoSelecionado={setContratoSelecionado}
            />
        </div>
    );
}

FormMeusFornecedores.propTypes = {
    tabLocation: PropTypes.any,
    dadosResumoPerfil: PropTypes.object,
};
