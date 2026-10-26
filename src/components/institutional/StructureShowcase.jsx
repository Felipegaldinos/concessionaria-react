import React from "react";
import Action from "./Action.jsx";
import AutoIcon from "../common/AutoIcon.jsx";

const highlights = [
  ["car", "Showroom completo"],
  ["key", "Atendimento e suporte"],
  ["wheel", "Avaliação do seu usado"],
  ["gauge", "Financiamento"],
];

export default function StructureShowcase() {
  return (
    <section
      className="structure-showcase"
      aria-labelledby="structure-showcase-title"
    >
      <img
        className="structure-showcase-photo"
        src="/images/estrutura/showroom.png"
        alt="Showroom ilustrativo da Vértice Motors com veículos e espaço de atendimento"
        loading="lazy"
      />
      <div className="structure-showcase-copy">
        <span className="inst-tag">ESPAÇOS PENSADOS PARA RECEBER VOCÊ.</span>
        <h2 id="structure-showcase-title">
          Tudo o que você precisa,
          <br />
          em um só lugar.
        </h2>
      </div>
      <div className="structure-showcase-details">
        <ul>
          {highlights.map(([icon, label]) => (
            <li key={label}>
              <AutoIcon type={icon} />
              <span>{label}</span>
            </li>
          ))}
        </ul>
        <Action to="/estrutura" outline>
          Conheça nossa estrutura
        </Action>
      </div>
    </section>
  );
}
