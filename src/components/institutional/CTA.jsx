import React from "react";
import Action from "./Action.jsx";

export default function CTA({}) {
  return (
    <section className="inst-cta">
      <div>
        <span className="inst-tag">SEU PRÓXIMO PASSO</span>
        <h2>Vamos conhecer o seu próximo caminho?</h2>
        <p>Explore o estoque ou converse sobre o que você procura.</p>
      </div>
      <div className="inst-actions">
        <Action to="/carros">Ver seminovos</Action>
        <Action to="/contato" outline>
          Fale com a gente
        </Action>
      </div>
    </section>
  );
}
