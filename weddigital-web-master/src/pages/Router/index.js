import React from "react";
import {Route, Routes} from "react-router-dom";

import PrivateRouter from "./privateRouter";

import SolicitarNovaSenha from "../Login/SolicitarNovaSenha";
import RedefinicaoSenha from "../Login/RedefinicaoSenha";

import HomepageEmpresa from "../Empresas/Homepage";
import CadastroEmpresa from "../Empresas/CadastroEmpresa";
import ConfirmacaoCadastroEmpresas from "../../components/ConfirmacaoCadastroEmpresas";
import PerfilEmpresa from "../Empresas/Perfil";

import HomepageNoivos from "../Casamentos/Homepage";
import CadastroNoivos from "../Casamentos/CadastroNoivos";
import CadastroNoivosEbook from "../Casamentos/CadastroNoivos/cadastroEbook";
import ConfirmacaoCadastroNoivas from "../../components/ConfirmacaoCadastroNoivas";
import PerfilNoivos from "../Casamentos/Perfil";

import Marketplace from "../Marketplace";
import Vitrine from "../Marketplace/Vitrine/Vitrine";

import TermoDeUsoEmpresas from "../CondicoesLegais/TermoDeUsoEmpresas";
import TermoDeUsoNoivas from "../CondicoesLegais/TermoDeUsoNoivas";
import RegrasSorteio from "../CondicoesLegais/RegrasSorteio";
import PoliticaPrivacidade from "../CondicoesLegais/PoliticaPrivacidade";
import Sorteio from "../Sorteio/Login";

import PlanosProfissional from "../Vendas/PlanosProfissional";

import EmailValidation from "../ResultPage/emailValidation";
import Error404Page from "../ResultPage/error404";

import Avaliacao from "../Avaliacao";
import Blog from "../Blog";
import Artigo from "../Blog/Artigo";

import Artigo_1 from "../Blog/Artigo/artigo_1";
import Artigo_1_2 from "../Blog/Artigo/artigo_1_2";
import Artigo_2 from "../Blog/Artigo/artigo_2";
import Artigo_3 from "../Blog/Artigo/artigo_3";
import Artigo_4 from "../Blog/Artigo/artigo_4";
import Artigo_5 from "../Blog/Artigo/artigo_5";
import Artigo_6 from "../Blog/Artigo/artigo_6";
import Artigo_7 from "../Blog/Artigo/artigo_7";
import Artigo_8 from "../Blog/Artigo/artigo_8";
import Artigo_9 from "../Blog/Artigo/artigo_9";
import UserLogin from "../Login";

export default function Router() {
    return (
        <Routes>
            {/* LOGIN */}
            <Route exact path="/login" element={<UserLogin/>}/>
            <Route exact path="/solicitar-senha" element={<SolicitarNovaSenha/>}/>
            <Route
                exact
                path="/redefinirSenha:tokenSenha"
                element={RedefinicaoSenha}
            />

            {/* EMPRESAS */}
            <Route exact path="/empresas" element={<HomepageEmpresa/>}/>
            <Route exact path="/empresas/cadastro" element={<CadastroEmpresa/>}/>
            <Route
                exact
                path="/empresas/cadastro:tokenConvite"
                element={<CadastroEmpresa/>}
            />

            {/* NOIVOS */}
            <Route exact path="/" element={<HomepageNoivos/>}/>
            <Route exact path="/cadastro" element={<CadastroNoivos/>}/>
            <Route exact path="/cadastro-ebook" element={<CadastroNoivosEbook/>}/>

            {/* <PrivateRouter exact path='/meus-fornecedores' element={}/> */}

            {/* Marketplace */}
            <Route exact path="/buscar-profissional" element={<Marketplace/>}/>
            <Route exact path="/buscar-profissional/detalhes" element={<Vitrine/>}/>
            <Route
                exact
                path="/buscar-profissional/detalhes/:idProfissional"
                element={<Vitrine/>}
            />

            {/* Condições legais */}
            <Route
                exact
                path="/empresas/termos-de-uso"
                element={<TermoDeUsoEmpresas/>}
            />
            <Route exact path="/noivas/termos-de-uso" element={<TermoDeUsoNoivas/>}/>
            <Route
                exact
                path="/politicas-de-privacidade"
                element={<PoliticaPrivacidade/>}
            />
            <Route exact path="/regras-sorteio" element={<RegrasSorteio/>}/>

            {/* Vendas */}
            <Route exact path="/planos-profissional" element={<PlanosProfissional/>}/>
            <Route exact path="/admin/gerar-ganhador" element={<Sorteio/>}/>
            {/*<Route exact path="/teste" element={Teste} />*/}

            {/* Blog */}
            <Route exact path="/blog" element={<Blog/>}/>
            <Route exact path="/artigo" element={<Artigo/>}/>
            <Route
                exact
                path="/blog/artigo/conheca-os-principais-estilos-de-decoracoes-para-sua-festa-de-casamento/03-06-2023"
                element={<Artigo_1/>}
            />
            <Route
                exact
                path="/blog/artigo/entenda-sobre-como-a-decoracao-do-seu-casamento-pode-mudar-tudo/03-06-2023"
                element={<Artigo_1_2/>}
            />
            <Route
                exact
                path="/blog/artigo/3-passos-para-escolher-as-musicas-da-cerimonia-do-seu-casamento/03-06-2023"
                element={<Artigo_2/>}
            />
            <Route
                exact
                path="/blog/artigo/contratar-ou-nao-uma-cerimonialista-para-seu-casamento/03-06-2023"
                element={<Artigo_3/>}
            />
            <Route
                exact
                path="/blog/artigo/qual-buque-de-noiva-ideal-para-o-seu-casamento/03-06-2023"
                element={<Artigo_4/>}
            />
            <Route
                exact
                path="/blog/artigo/com-quanto-tempo-devo-escolher-a-fotografia-do-meu-casamento/03-06-2023"
                element={<Artigo_5/>}
            />
            <Route
                exact
                path="/blog/artigo/tendencias-2023-de-vestidos-de-noivas/03-06-2023"
                element={<Artigo_6/>}
            />
            <Route
                exact
                path="/blog/artigo/quais-documentos-necessarios-para-um-casamento-catolico/03-06-2023"
                element={<Artigo_7/>}
            />
            <Route
                exact
                path="/blog/artigo/baixe-gratuitamente-o-plano-perfeito-para-a-festa-do-seu-casamento/02-09-2023"
                element={<Artigo_8/>}
            />
            <Route
                exact
                path="/blog/artigo/descubra-detalhes-que-tornam-um-casamento-classico-inesquecivel/02-09-2023"
                element={<Artigo_9/>}
            />

            <Route exact path="/avaliacao" element={<Avaliacao/>}/>

            {/* Validação de email */}
            <Route exact path="/email/validacao" element={<EmailValidation/>}/>
            <Route exact path="/email/validacao:dados" element={<EmailValidation/>}/>

            {/* 404 Error Page  */}
            <Route path="/404" element={<Error404Page/>}/>
            {/*<Redirect to="/404"/>*/}
            {/*Rotas Privadas*/}
            <Route element={<PrivateRouter/>}>
                <Route exact path="/perfil" element={<PerfilNoivos/>}/>
                <Route
                    exact
                    path="/confirmacaoCadastro-noivos"
                    element={<ConfirmacaoCadastroNoivas/>}
                />
                <Route exact path="/empresas/perfil" element={<PerfilEmpresa/>}/>
                <Route
                    exact
                    path="/empresas/confirmacaoCadastro-empresas"
                    element={<ConfirmacaoCadastroEmpresas/>}
                />
            </Route>
        </Routes>
    );
}
