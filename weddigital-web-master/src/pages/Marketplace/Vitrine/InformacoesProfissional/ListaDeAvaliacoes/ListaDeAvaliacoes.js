import React, { useRef } from "react";
import CardAvaliacao from "./CardAvaliacao/CardAvaliacao";
import styles from "./ListaDeAvaliacoes.module.css";
import { Carousel } from "antd";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

export default function ListaDeAvaliacoes({ avaliacoes }) {
  const ref = useRef(null);
  const CarouselSettings = {
    arrow: {
      color: "#400072",
      size: 25,
      cursor: "pointer",
    },
  };
  avaliacoes = [];
  return (
    avaliacoes.length > 0 && (
      <div className={styles.box}>
        <h4 className={styles.title}>Avaliações</h4>
        <div className={styles.carousel}>
          <Carousel
            style={{
              maxWidth: "800px",
              height: "fit-content",
              maxHeight: "450px",
            }}
            ref={ref}
            draggable
            dots={false}
            useCSS
            waitForAnimate
            slidesToShow={1}
            initialSlide={1}
            accessibility
            className={styles.list}
            infinite
            verticalSwiping
            swipe
            arrows
            prevArrow={<AiFillCaretLeft {...CarouselSettings.arrow} />}
            nextArrow={<AiFillCaretRight {...CarouselSettings.arrow} />}
            responsive={[
              {
                breakpoint: 900,
                settings: {
                  style: { maxWidth: "700px" },
                },
              },
              {
                breakpoint: 750,
                settings: {
                  style: { maxWidth: "500px" },
                },
              },
              {
                breakpoint: 550,
                settings: {
                  style: { maxWidth: "300px" },
                },
              },
            ]}
          >
            {avaliacoes.map((avaliacao, index) => (
              <CardAvaliacao key={index} {...avaliacao} />
            ))}
          </Carousel>
        </div>
      </div>
    )
  );
}
