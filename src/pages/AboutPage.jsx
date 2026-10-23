import React from "react";
import Action from "../components/institutional/Action.jsx";
import Intro from "../components/institutional/Intro.jsx";
import Frame from "../components/institutional/Frame.jsx";
import CTA from "../components/institutional/CTA.jsx";
import Journey from "../components/institutional/Journey.jsx";
import { values } from "../data/institutional.js";

export default function Company({}) {
  return (
    <Frame
      title="Quem somos"
      subtitle="Uma nova direção para escolher seu próximo carro."
    >
      <section className="inst-split">
        <div className="inst-photo">
          <img
            src="/images/institucional/sobre-historia.jpg"
            alt="Vista do showroom fictício Vértice Motors"
          />
          <span>Escolhas que acompanham a vida.</span>
        </div>
        <div>
          <Intro
            tag="A ESSÊNCIA DA VÉRTICE"
            title="Cada pessoa tem um caminho. Cada escolha merece atenção."
          />
          <p>
            A Vértice Motors nasce, neste projeto de apresentação, da ideia de
            uma concessionária que aproxima pessoas e possibilidades. Uma
            escolha importante merece tempo, informação e uma equipe disposta a
            ouvir.
          </p>
          <p>
            Nossa proposta combina uma experiência digital organizada com uma
            jornada de atendimento acolhedora. O objetivo é ajudar você a
            entender o que procura, comparar alternativas e se preparar para a
            compra.
          </p>
        </div>
      </section>
      <section className="purpose-grid">
        <article>
          <span className="inst-tag">NOSSA MISSÃO</span>
          <h2>Facilitar escolhas conscientes.</h2>
          <p>
            Apresentar veículos e orientar cada etapa com clareza, considerando
            as necessidades e o momento de cada pessoa.
          </p>
        </article>
        <article>
          <span className="inst-tag">NOSSA VISÃO</span>
          <h2>Ser lembrada pela confiança.</h2>
          <p>
            Construir relações em que a qualidade da orientação e o respeito ao
            cliente sejam tão importantes quanto o veículo escolhido.
          </p>
        </article>
      </section>
      <section className="inst-section">
        <Intro
          tag="O QUE GUIA A NOSSA PROPOSTA"
          title="Valores presentes em cada conversa."
        />
        <div className="inst-values">
          {values.map(([t, p], i) => (
            <article key={t}>
              <span>0{i + 1}</span>
              <h3>{t}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="inst-section">
        <Intro
          tag="DA PESQUISA À ENTREGA"
          title="Um jeito próximo de acompanhar você."
          text="Mais do que apresentar opções, queremos tornar o processo compreensível. Veja como as etapas se conectam."
        />
        <Journey />
      </section>
      <div className="inst-related">
        <Action to="/equipe" outline>
          Conheça a equipe
        </Action>
        <Action to="/estrutura" outline>
          Conheça a estrutura
        </Action>
        <Action to="/servicos" outline>
          Serviços e suporte
        </Action>
      </div>
      <CTA />
    </Frame>
  );
}
