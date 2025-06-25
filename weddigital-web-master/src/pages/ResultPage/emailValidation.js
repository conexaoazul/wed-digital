import React, { useContext, useEffect, useState } from "react";
import { Result } from "antd";
import api from "../../api";
import UserContext from "../../api/userContext-api/userContext";
import { useNavigate, useParams } from "react-router-dom";

export default function EmailValidation() {
  const { setToken } = useContext(UserContext);
  const history = useNavigate();

  const [IsCarregando, setIsCarregando] = useState(true);
  const [ButtonDisable, setButtonDisable] = useState(true);
  const [ErroValidacao, setErroValidacao] = useState(false);
  const { dados } = useParams();
  let urlDados = dados.split("+");
  let idUsuario = urlDados[1];
  let tokenUsuario = urlDados[2];

  useEffect(() => {
    api
      .get(`email/validacao?usr=${idUsuario}&kt=${tokenUsuario}`)
      .then(({ data }) => {
        setErroValidacao(false);
        setButtonDisable(false);
        setIsCarregando(false);
      })
      .catch(({ error }) => {
        setIsCarregando(false);
        setErroValidacao(true);
        console.error("Validation Error");
      });
  }, []);

  return (
    <>
      {IsCarregando ? (
        <div className=".container p-4 d-flex justify-content-center">
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Validando Email...
          </button>
        </div>
      ) : (
        <>
          {ErroValidacao ? (
            <Result
              status="error"
              title="Ooops, parece que houve algum erro com a validação de seu email!"
              subTitle={`Tente novamente ou entre em contato com nosso suporte: suporte@weddigital.com`}
            />
          ) : (
            <Result
              status="success"
              title="Seu email foi validado com sucesso!"
              //                            extra={[
              //                                <Button type="primary" key="console" disabled={ButtonDisable}>
              //                                    Perfil
              //                                </Button>,
              //                            ]}
            />
          )}
        </>
      )}
    </>
  );
}
