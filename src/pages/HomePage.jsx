import React from "react";
import Action from "../components/institutional/Action.jsx";
import Intro from "../components/institutional/Intro.jsx";
import DemoNote from "../components/institutional/DemoNote.jsx";
import CTA from "../components/institutional/CTA.jsx";
import ServicesGrid from "../components/institutional/ServicesGrid.jsx";
import Journey from "../components/institutional/Journey.jsx";
import { photo } from "../data.js";
import { spaces } from "../data/institutional.js";

export default function Home({}) {
  return (
    <>
      <section className="welcome">
        <img
          src={photo("photo-1492144534655-ae79c964c9d7", 1600)}
          alt="Automóvel esportivo em imagem ilustrativa"
        />
        <div className="container welcome-content">
          <span className="inst-tag">VÉRTICE MOTORS · NATAL, RN</span>
          <h1>
            Mais do que um carro.
            <br />O começo de uma
            <br />
            nova história.
          </h1>
          <p>
            Conheça uma proposta de concessionária que coloca sua escolha no
            centro: informação clara, atenção à sua rotina e uma conversa
            próxima em cada etapa.
          </p>
          <div className="inst-actions">
            <Action to="/carros">Encontre seu seminovo</Action>
            <Action to="/quem-somos" outline>
              Conheça a Vértice
            </Action>
          </div>
        </div>
        <span className="welcome-caption">Imagem ilustrativa</span>
      </section>
      <div className="inst-principles container">
        <span>
          01 <b>Escolha com informação</b>
        </span>
        <span>
          02 <b>Atendimento próximo</b>
        </span>
        <span>
          03 <b>Planejamento da compra</b>
        </span>
        <span>
          04 <b>Apoio em cada etapa</b>
        </span>
      </div>
      <div className="container institutional">
        <section className="inst-split">
          <div>
            <Intro
              tag="PRAZER, SOMOS A VÉRTICE"
              title="Uma boa escolha começa com uma boa conversa."
              text="O carro ideal precisa fazer sentido para a sua vida. Antes de falar de modelos, queremos entender seus trajetos, sua família e os planos que acompanham essa decisão."
            />
            <p>
              Da pesquisa ao planejamento da compra, nossa proposta é tornar as
              informações mais acessíveis. Você encontra caminhos para conhecer
              o estoque, avaliar a troca do seu usado e organizar o próximo
              passo.
            </p>
            <Action to="/quem-somos" outline>
              Conheça nossa proposta
            </Action>
          </div>
          <div className="inst-photo">
            <img
              loading="lazy"
              src={photo("photo-1449965408869-eaa3f722e40d", 900)}
              alt="Interior de automóvel com vista para a estrada"
            />
            <span>Seu caminho inspira a nossa proposta.</span>
          </div>
        </section>
        <section className="inst-section">
          <Intro
            tag="NOSSA ESTRUTURA"
            title="Espaços pensados para receber você."
            text="Conheça o conceito dos ambientes que compõem a experiência Vértice, da primeira visita à entrega."
          />
          <div className="space-preview">
            {spaces.slice(0, 3).map(([n, t, p]) => (
              <article key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
          <Action to="/estrutura" outline>
            Explore nossa estrutura
          </Action>
        </section>
        <section className="inst-section">
          <Intro tag="SOLUÇÕES PARA SUA ESCOLHA" title="Como podemos ajudar?" />
          <ServicesGrid />
        </section>
        <section className="inst-team-banner">
          <div className="team-graphic" aria-hidden="true">
            <span>VM</span>
            <span>↗</span>
            <span>♡</span>
          </div>
          <div>
            <Intro
              tag="PESSOAS QUE FAZEM A DIFERENÇA"
              title="Uma equipe para ouvir, orientar e acompanhar."
              text="Conheça as áreas que participam da sua jornada e entenda com quem contar em cada momento."
            />
            <Action to="/equipe">Conheça a equipe</Action>
          </div>
        </section>
        <section className="inst-section">
          <Intro
            tag="ANTES, DURANTE E DEPOIS"
            title="Sua jornada, com os próximos passos claros."
          />
          <Journey />
        </section>
        <CTA />
        <DemoNote />
      </div>
    </>
  );
}
