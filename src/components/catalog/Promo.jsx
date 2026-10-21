import React from "react";
import { Link } from "react-router-dom";
import { photo } from "../../data.js";

export default function Promo({ type }) {
  const content =
    type === "trade"
      ? [
          "↔",
          "Seu usado pode fazer parte da sua próxima conquista",
          "Conheça nossa avaliação de veículos.",
          "Solicitar avaliação",
          "/troca",
        ]
      : type === "help"
        ? [
            "☏",
            "Precisa de ajuda para encontrar seu carro?",
            "Nossa equipe ajuda você a escolher.",
            "Quero ajuda",
            "/ajuda",
          ]
        : [
            "72×",
            "Planeje seu financiamento online",
            "Simule as parcelas e conheça os próximos passos.",
            "Simular financiamento",
            "/financiamento",
          ];
  return (
    <article className={"promo " + type}>
      <div className="promo-art">
        <span>{content[0]}</span>
        <img
          loading="lazy"
          src={photo("photo-1503376780353-7e6692767b70", 500)}
          alt="Automóvel ilustrativo"
        />
      </div>
      <h2>{content[1]}</h2>
      <p>{content[2]}</p>
      <Link className="btn" to={content[4]}>
        {content[3]}
      </Link>
    </article>
  );
}
