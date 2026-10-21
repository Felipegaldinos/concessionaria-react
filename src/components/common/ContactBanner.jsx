import React from "react";
import { Link } from "react-router-dom";

export default function ContactBanner({}) {
  return (
    <div className="contact-banner">
      <span className="phone-art">☏</span>
      <div>
        <b>Não encontrou o que procurava?</b>
        <p>Conte qual é seu carro ideal. A gente ajuda na sua busca.</p>
      </div>
      <Link to="/contato" className="btn lime">
        Fale com a Vértice　↗
      </Link>
    </div>
  );
}
