import React from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

export default function RegrasSorteio() {
  function voltar() {
    window.history.back();
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1 className="text-center">
          REGRAS DE PARTICIPAÇÃO DO PROGRAMA PONTOS WED
        </h1>

        <h3 className="text-center">1. Objeto</h3>
        <p>
          Com o objetivo de potencializar sua imagem de marca e incentivar os
          usuários, A Wed Digital pretende realizar sorteios mensais para
          noivas, sendo um voucher no valor de R$ R$3.000,00 (três mil reais),
          para compras e serviços para utilizar dentro da plataforma.
        </p>

        <br></br>
        <br></br>
        <h3 className="text-center">2. Âmbito do Sorteio</h3>
        <p>O âmbito da Sorteio abarca todo o território nacional brasileiro.</p>

        <br></br>
        <br></br>
        <h3 className="text-center">
          3. Requisitos para a participação e sorteio
        </h3>
        <p>Para poder ganhar o prêmio:</p>
        <ul>
          <li>
            - Noivos que planejam sua festa de casamento, sendo usuários da
            plataforma Wed Digital.
          </li>
          <li>
            - Os participantes deverão ser maiores de 18 anos e estar no
            processo de organização do casamento.
          </li>
          <li>
            - A cada 100 pontos, o casal ganhará 1 cupom para participar do
            sorteio.
          </li>
          <li>
            - Para participar deverão cumprir o requisito mínimo de aquisição de
            pontos por mês, que poderá ser adquirido da seguinte maneira:
            <ul style={{ marginLeft: "1rem" }}>
              <li>
                - Feedback de um profissional após a data oficial da festa de
                casamento - <b>50 pontos</b>
              </li>
              <li>
                - Contratação de um profissional -{" "}
                <b>
                  100 pontos (limite de 10 profissionais por mês para atingir a
                  pontuação)
                </b>
              </li>
              <li>
                - Feedback da plataforma após a data oficial da festa de
                casamento - <b>200 pontos</b>
              </li>
              <li>
                - Feedback em vídeo do prêmio - <b>250 pontos</b>
              </li>
              <li>
                - Completar o cadastro na plataforma - <b>25 pontos</b>
              </li>
              <li>
                - Solicitar um orçamento -{" "}
                <b>
                  5 pontos (limite de 20 orçamentos por mês para atingir a
                  pontuação)
                </b>
              </li>
            </ul>
          </li>
          <br />
          <li>
            - Os pontos levarão até 48 horas para serem creditados, assim que o
            usuário atingir a pontuação de 100 pontos, poderá preencher seus
            dados através de um botão disponibilizado na nossa plataforma.
          </li>
          <li>
            - Os que desejam participar, só precisam preencher os dados uma
            única vez.
          </li>
          <li>
            - As inscrições serão encerradas 48 horas antes da data do sorteio.
          </li>
          <li>
            - Caso os cupons/pontos não sejam validados no prazo de 48 horas
            antes do sorteio do mês, o participante poderá utilizá-los para
            concorrer ao sorteio do mês seguinte.
          </li>
          <li>- Os cupons não serão acumulados.</li>
          <li>
            - Os cupons ganhos darão direito ao participante, concorrer a 1 (um)
            sorteio.
          </li>
          <li>
            - Com o encerramento das inscrições, os pontos e cupons serão
            expirados para serem usados no sorteio vigente, mas o usuário poderá
            realizar novas atividades para conquistar pontos e concorrer ao
            próximo sorteio.
          </li>
          <li>- Os pontos adquiridos são intransferíveis.</li>
          {/*<li>- Para receber o prêmio não precisar estar ao vivo, mas seria ótimo torcer conosco.</li>*/}
          {/*<li>- O sorteio acontecerá todos os meses em uma data estabelecida pelo organizador e acontecerá AO VIVO no canal do Youtube da Wed Digital Noivos ( <a href='https://bit.ly/canal-youtube-noivos'>https://bit.ly/canal-youtube-noivos</a> ).</li>*/}
          <li>
            - Ao receber o cupom ou cupons, o participante deverá preencher
            todos os seus dados de forma legível e autêntica.
          </li>
        </ul>

        <br></br>
        <p>
          <b>
            No caso de participantes que já tenham realizado o casamento, os
            pontos adquiridos terão validade por 3 (três) meses, a contar da
            data do casamento, podendo participar de um(1) sorteio nesse
            período.
          </b>
        </p>
        <p>
          <b>
            O participante sorteado após o seu casamento, deverá ter contrato ao
            menos 1 (um) profissional através da nossa plataforma.
          </b>
        </p>
        <p>
          Para ser o ganhador, o participante deve ter cumprido o mínimo dos
          passos citados acima, podendo participar dos sorteios seguintes.
        </p>

        <br></br>
        <br></br>
        <h3 className="text-center">4. Eleição do ganhador</h3>
        <p>
          O ganhador deve cumprir e comprovar todos os requisitos antes
          mencionados e haverá um ganhador do prêmio.
        </p>
        <p>
          O vencedor será avisado por telefone, whatsapp ou e-mail que foi
          contemplado com o prêmio. Uma vez realizada a comunicação, o vencedor
          deverá comunicar por escrito, num prazo máximo de cinco dias úteis, se
          aceita ou recusa, no seu caso, o prêmio. No caso de que o vencedor não
          se manifeste se aceita ou renúncia o prêmio no prazo indicado, o valor
          será destinado ao próximo suplente.
        </p>
        <p>
          Não obstante, serão sorteados dois (2) suplentes, caso o primeiro
          ganhador renuncie a seu prêmio e a mesma regra do primeiro ganhador se
          aplica aos suplentes.
        </p>
        <p>Caso nenhum ganhador se pronuncie, o prêmio será cancelado.</p>

        <br></br>
        <br></br>
        <h3 className="text-center">5. Do recebimento do Prêmio</h3>
        <p>
          O prêmio será um voucher no valor de R$ 3.000,00 (três mil reais),
          para o usuário que estiver planejando ou já tenha realizado sua festa
          de casamento podendo usar no prazo de no máximo 3 meses contando a
          partir da data do seu casamento.
        </p>
        <p>
          O participante sorteado antes do casamento, deverá utilizar o prêmio
          na contratação de qualquer profissional ou profissionais que sejam
          assinantes de um dos planos da plataforma Wed Digital, tendo 25 dias
          para utilizar o voucher presente, ficando vedada a sua participação
          nos sorteios seguintes, até a utilização de seu prêmio.
        </p>
        <p>
          O voucher só poderá ser usado com a empresa que realizou seu cadastro
          na plataforma 48 horas antes do sorteio vigente. Caso a empresa se
          cadastre após esse prazo, poderá participar e ser selecionada pelo
          ganhador(a) na próxima edição do sorteio.
        </p>
        <p>
          Para receber o prêmio, é imprescindível que o vencedor apresente
          material gráfico e audiovisual do casal, bem como um depoimento
          escrito de como receberam a notícia do prêmio. Todo o material deve
          atender às características indicadas pela Empresa e poderá ser
          utilizado pela Empresa para divulgação do sorteio no próprio site e em
          outros canais. Caso o vencedor se recuse a cumprir este requisito, o
          prémio será atribuído a um novo vencedor de acordo com o disposto no
          ponto 4 deste Regulamento.
        </p>
        <p>
          Qualquer imposto, gasto, comissão, taxa ou retenção aplicável por
          qualquer motivo ao valor transferido será integralmente assumido pelo
          vencedor.
        </p>

        <br></br>
        <br></br>
        <h3 className="text-center">6. Outros</h3>
        <p>
          Se estabelece que as bases do presente concurso e a celebração do
          mesmo são regidas pela Lei Brasileira.
        </p>
        <p>
          Em caso de não aceitação do prêmio pelo premiado, será solicitado que
          este realize uma comunicação por escrito e se passará ao suplente. Se
          o aviso de renúncia não for recebido no escritório de Wed Digital, a
          empresa se reserva o direito de anular o prêmio nesta edição do
          sorteio.
        </p>
        <p>
          Wed Digital, em sua condição de organizador dessa promoção, se reserva
          o direito de modificar em qualquer momento as condições do presente
          sorteio, incluindo sua possível anulação, antes da data de fechamento
          da campanha, sempre que a causa seja justificada, comprometendo-se a
          comunicar com o suficiente tempo as novas bases, condições ou
          anulação.
        </p>

        <br></br>
        <br></br>
        <h3 className="text-center">Participar dessa promoção supõe:</h3>
        <p>
          Aceitar as presentes condições. Ademais, ante possíveis dúvidas de
          interpretação, sempre prevalecerá o critério do organizador.
        </p>
        <p>
          A concessão de autorização expressa a Wed Digital para publicar a
          imagem, nome, sobrenome e localidade do ganhador com fins
          publicitários de forma gratuita no Portal.
        </p>
      </div>
      <br></br>
      <br></br>
      <div className="button-voltar-geral">
        <Link onClick={voltar} style={{ color: "#FFBC44" }}>
          Voltar
        </Link>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </div>
  );
}
