import React, {useContext, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './LoginEmpresa.css';

import api from '../../api';
import UsuarioModel from "../../utils/models/UsuarioModel";
import UserContext from '../../api/userContext-api/userContext';
import CarregandoPlaceholder from '../../components/Modal/CarregandoPlaceholder';
import ModalMensagemSucesso from '../../components/Modal/ModalMensagemSucesso'
import ModalMensagemErro from '../../components/Modal/ModalMensagemErro'
import Logo from '../../assets/icon.ico'
import Navbar from '../../components/Navbar'

export default function UserLogin({isEmpresa}) {
    const [IsDadosInvalido, setIsDadosInvalido] = useState(false)
    const [IsCarregandoDados, setIsCarregandoDados] = useState(false)

    const [IsSucessoNovaSenha, setIsSucessoNovaSenha] = useState(false)
    const [IsErroNovaSenha, setIsErroNovaSenha] = useState('')
    const [DadosUser, setDadosUSer] = useState(UsuarioModel.login)
    const {setToken} = useContext(UserContext)
    const history = useNavigate()
    const form = useRef();

    let urlUTM = window.location.href.split('?')
    let utmData = urlUTM[1] ? `?${urlUTM[1]}` : ''

    function onChange(ev) {
        const {value, name} = ev.target

        setDadosUSer({
            ...DadosUser,
            [name]: value,
        })
    }

    function pushPerfil(respondeData) {
        let dadosToken = respondeData.split('_')
        let tipoUsuario = dadosToken[0]

        if (tipoUsuario == "P") {
            history('/empresas/perfil')
        } else {
            if (tipoUsuario == "N") {
                history('/perfil')
            }
        }
    }

    function onSubmit(ev) {
        ev.preventDefault();
        setIsCarregandoDados(true)
        setIsDadosInvalido(false)

        api.get(`usuario/validarAcesso?login=${DadosUser.user}&senha=${DadosUser.password}`)
            .then((response) => {
                setToken(response.data)
                setIsCarregandoDados(false)
                pushPerfil(response.data)
            }).catch((error) => {
            setIsCarregandoDados(false)
            setIsDadosInvalido(true)
        })

        setDadosUSer({
            ...DadosUser,
            password: "",
        })
    }

    return (
        <div>

            <Navbar utmCadastro={utmData}/>

            <div className='container-page-login'>
                <div className="login-usuario-container">
                    {!IsDadosInvalido ? '' : <ModalMensagemErro texto='Login ou senha inválidos!'/>}
                    {!IsSucessoNovaSenha ? '' : <ModalMensagemSucesso
                        texto='Uma nova senha foi enviada para seu email. Caso não encontre na caixa de mensagem, procure a caixa de span'/>}
                    {!IsErroNovaSenha ? '' : <ModalMensagemErro texto={IsErroNovaSenha}/>}
                    <img src={Logo} className='login-logo-img'/>
                    {IsCarregandoDados
                        ? <CarregandoPlaceholder/>
                        : (
                            <>
                                <h3>Bem-Vindo!</h3>
                                <p>Insira seus dados e acesse a<br/>Wed Digital</p>
                                <form>
                                    <div className="form-floating mb-4">
                                        <input type="email" className="form-control" id="exampleInputEmail1"
                                               aria-describedby="emailHelp" required
                                               name="user" value={DadosUser.user} onChange={onChange}/>
                                        <label for="exampleInputEmail1" className="floatingInput">Email</label>
                                    </div>
                                    <div className="form-floating mb-4">
                                        <input type="password" className="form-control" id="exampleInputPassword1"
                                               required
                                               name="password" value={DadosUser.password} onChange={onChange}/>
                                        <label for="exampleInputPassword1" className="floatingInput">Senha</label>
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button className="btn btn-primary" onClick={onSubmit}>Acessar</button>
                                    </div>
                                </form>

                                <button className="btn btn-link">
                                    <a href='/solicitar-senha'>
                                        Esqueceu a senha?
                                    </a>
                                </button>
                            </>
                        )
                    }
                </div>

                <div className="form-envio-email-redefinicao-senha">
                    <form ref={form}>
                        <label>Email</label>
                        <input type="text" name="email" id="inputHiddenEmail"/>
                        <label>Link Redefinição</label>
                        <input type="text" name="urlRedefinicaoSenha" id="inputHiddenLink"/>
                    </form>
                </div>
            </div>
        </div>
    );
};
