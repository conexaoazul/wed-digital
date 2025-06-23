import React, { useEffect, useState } from "react";
import styles from "./CardAvaliacao.module.css";

import emojiApaixonado from "../../../../../../assets/emoji-apaixonado.png";
import emojiCoracao from "../../../../../../assets/coracao2.png";
import emojiSorrindo from "../../../../../../assets/sorrindo.png";
import emojiNeutro from "../../../../../../assets/neutro.png";
import emojiTriste from "../../../../../../assets/emoji-triste.png";
import PhotoGrid from "../../../../../../components/PhotoGrid/PhotoGrid";

export default function CardAvaliacao({
  nomeDoCasal,
  descricao,
  avaliacao,
  dataDoCasamento,
  atendimento,
  servicoCombinado,
  Profissionalismo,
  dataDaAvaliacao,
  imagemDoCasal,
  cidadeDoCasamento,
  imagens,
}) {
  const icons = {
    PÉSSIMO: emojiTriste,
    REGULAR: emojiNeutro,
    BOM: emojiSorrindo,
    "MUITO BOM": emojiCoracao,
    EXCELENTE: emojiApaixonado,
  };

  const getIcon = (value, width = 30) => {
    const src = icons[value.toUpperCase()];
    return src ? (
      <img
        src={src}
        alt="Ícone que representa a nota da avaliação"
        width={width}
      />
    ) : null;
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.box}>
      <div className={styles.wedInfoBox}>
        <img
          className={styles.groomImage}
          src={imagemDoCasal}
          alt={`Imagem do casal ${nomeDoCasal}`}
        />
        <div className={styles.groomInfoBox}>
          <div className={styles.groomName}>{nomeDoCasal}</div>
          <div
            className={styles.groomWedDate}
          >{`Casaram-se em ${dataDoCasamento} em ${cidadeDoCasamento}`}</div>
          <div className={styles.groomScore}>
            {getIcon(avaliacao)}
            {avaliacao.toUpperCase()}
          </div>
        </div>
      </div>
      <div className={styles.description}>{descricao}</div>
      {imagens.length > 0 && (
        <PhotoGrid
          photos={imagens
            .slice(0, isMobile ? 3 : imagens.length)
            .map((imagem) => ({
              src: imagem.urlImagem,
              width: 30,
              height: 30,
            }))}
        />
      )}
      <div className={styles.scoreInfoBox}>
        <div className={styles.tagBox}>
          <div className={styles.tagLabel}>Atendimento</div>
          <div className={styles.tagValue}>
            {getIcon(atendimento, 20)} {atendimento}
          </div>
        </div>
        <div className={styles.tagBox}>
          <div className={styles.tagLabel}>Serviço combinado</div>
          <div className={styles.tagValue}>
            {getIcon(servicoCombinado, 20)} {servicoCombinado}
          </div>
        </div>
        <div className={styles.tagBox}>
          <div className={styles.tagLabel}>Profissionalismo</div>
          <div className={styles.tagValue}>
            {getIcon(Profissionalismo, 20)}
            {Profissionalismo}
          </div>
        </div>
      </div>
      <div className={styles.scoreDate}>{`Avaliado em ${dataDaAvaliacao}`}</div>
    </div>
  );
}
