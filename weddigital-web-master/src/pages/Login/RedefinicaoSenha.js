import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './LoginEmpresa.css';

import api from '../../api';
import Navbar from '../../components/Navbar';
import UsuarioModel from "../../utils/models/UsuarioModel";
import CarregandoPlaceholder from '../../components/Modal/CarregandoPlaceholder';
import ModalMensagemErro from '../../components/Modal/ModalMensagemErro'
import {verificarIgualdadeSenha, verificarIntegridadeSenha} from "../../utils/Utils";
import UserContext from "../../api/userContext-api/userContext";
import {tratarErroRequestApi} from "../../utils/TratamentoErros";

export default function RedefinicaoSenha({isEmpresa}) {
    const [IsCarregandoDados, setIsCarregandoDados] = useState(false)
    const [erroInfo, setErroInfo] = useState('')

    const [IsSenhaValida, setIsSenhaValida] = useState(true)
    const [IsSenhaIgual, setIsSenhaIgual] = useState(true)

    const {setToken} = useContext(UserContext)
    const [DadosUser, setDadosUSer] = useState(UsuarioModel.login)
    const history = useNavigate()

    let urlDados = window.location.href.split('=')
    let dadosSplit = urlDados[1].split("+")
    let email = dadosSplit[0]
    let tokenDados = dadosSplit[1].split('_')
    let tokenUsuario = tokenDados[2]

    function onSenhaValida(ev) {
        ev.preventDefault()
        setIsSenhaValida(false)
        const {value, name} = ev.target

        let isSenhaIntegra = verificarIntegridadeSenha(value)
        if (isSenhaIntegra) {
            setIsSenhaValida(true)
        } else {
            setIsSenhaValida(false)
        }

        setDadosUSer({
            ...DadosUser,
            [name]: value,
        })

        setErroInfo('')
    }

    function onSenhaIgual(ev) {
        ev.preventDefault()
        setIsSenhaIgual(false)
        const {value, name} = ev.target
        let isSenhaIgual = verificarIgualdadeSenha(DadosUser.password, value)

        if (isSenhaIgual) {
            setIsSenhaIgual(true)
        } else {
            setIsSenhaIgual(false)
        }

        setErroInfo('')
    }

    function pushPerfil(respondeData) {
        let dadosToken = respondeData.split('_')
        let tipoUsuario = dadosToken[0]

        if (tipoUsuario === "P") {
            history('/empresas/perfil')
        } else if (tipoUsuario === "N") {
            history('/perfil')
        }
    }

    function onSubmit(ev) {
        ev.preventDefault();
        setIsCarregandoDados(true)

        if (IsSenhaIgual == false || IsSenhaValida == false) {
            return
        }

        api.get(`usuario/redefinirSenha?email=${email}&novaSenha=${DadosUser.password}&tokenUsuario=${tokenUsuario}`)
            .then((response) => {
                setToken(response.data)
                setIsCarregandoDados(false)
                pushPerfil(response.data)
            }).catch((error) => {
            setErroInfo(tratarErroRequestApi(error))
            setIsCarregandoDados(false)
        })
    }


    return (
        <>
            <Navbar isAreaEmpresa={isEmpresa}/>
            <div className="container-sm login-usuario-container" style={{marginTop: '12rem'}}>
                {!erroInfo ? '' : <ModalMensagemErro texto={erroInfo}/>}

                {IsCarregandoDados
                    ? <CarregandoPlaceholder/>
                    : <>
                        <p className="text-center texto-label-acesso">Insira sua nova senha</p>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="validationCustom05" className="form-label">Senha</label>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                       aria-describedby="emailHelp" required
                                       name="password" value={DadosUser.password} onChange={onSenhaValida}/>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="validationCustom05" className="form-label">Confirmar senha</label>
                                <input type="password" className="form-control" id="validationSenha2" required
                                       onChange={onSenhaIgual}/>
                            </div>
                            <div className="col-md-6">
                                {IsSenhaValida
                                    ? ""
                                    : <div className=".text-danger">
                                        <p className="text-danger">*Sua senha deve ter entre 8 e 36 caracteres e
                                            incluir, <br></br>
                                            pelo menos, uma letra maiúscula e um número!</p>
                                    </div>
                                }
                            </div>

                            <div className="col-md-6">
                                {IsSenhaIgual
                                    ? ""
                                    : <div className=".text-danger">
                                        <p className="text-danger">*As senhas não são iguais!</p>
                                    </div>
                                }
                            </div>

                            <button className="btn btn-primary" onClick={onSubmit}
                                    disabled={IsSenhaIgual == true && IsSenhaValida == true ? false : true}>Atualizar
                                senha
                            </button>
                        </form>
                    </>
                }
            </div>
        </>
    );
};
