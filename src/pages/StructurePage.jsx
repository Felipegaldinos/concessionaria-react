import React from "react";
import InstitutionalPhoto from "../components/institutional/InstitutionalPhoto.jsx";
import Action from "../components/institutional/Action.jsx";
import Intro from "../components/institutional/Intro.jsx";
import Frame from "../components/institutional/Frame.jsx";
import { photo } from "../data.js";
import { spaces, structurePhotos } from "../data/institutional.js";

export default function Structure({}) {
  return (
    <Frame
      title="Nossa estrutura"
      subtitle="Conheça o conceito dos ambientes da Vértice Motors."
    >
      <div className="structure-intro">
        <Intro
          tag="UMA EXPERIÊNCIA ACOLHEDORA"
          title="Da primeira visita à entrega das chaves."
          text="Nossa proposta organiza a experiência em ambientes com finalidades claras: conhecer, conversar, avaliar e receber. Os espaços abaixo são conceituais e não representam instalações reais."
        />
      </div>
      <div className="structure-grid">
        {spaces.map(([n, t, p]) => (
          <article key={n}>
            <InstitutionalPhoto
              image={structurePhotos[n][0]}
              alt={structurePhotos[n][1]}
              className="structure-photo"
            />
            <div>
              <h2>{t}</h2>
              <p>{p}</p>
            </div>
          </article>
        ))}
      </div>
      <section className="visit-plan">
        <div>
          <span className="inst-tag">PREPARE SUA VISITA</span>
          <h2>Uma conversa que começa antes de chegar.</h2>
          <p>
            Escolha os veículos de interesse no catálogo e use o contato para
            contar suas prioridades. Para uma visita real, confirme endereço,
            horários e disponibilidade diretamente com a concessionária.
          </p>
        </div>
        <div>
          <Action to="/lojas" outline>
            Informações da unidade
          </Action>
          <Action to="/contato">Organizar uma visita</Action>
        </div>
      </section>
    </Frame>
  );
}
