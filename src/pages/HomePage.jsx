import React from "react";
import ProfileFinder from "../components/institutional/ProfileFinder";
import Action from "../components/institutional/Action.jsx";
import Intro from "../components/institutional/Intro.jsx";
import DemoNote from "../components/institutional/DemoNote.jsx";
import CTA from "../components/institutional/CTA.jsx";
import ServicesGrid from "../components/institutional/ServicesGrid.jsx";
import Journey from "../components/institutional/Journey.jsx";
import BenefitsCarousel from "../components/institutional/BenefitsCarousel.jsx";
import BrandStrip from "../components/institutional/BrandStrip.jsx";
import StructureShowcase from "../components/institutional/StructureShowcase.jsx";

export default function Home() {
  return (
    <>
      <section className="welcome">
        <img
          src="/images/institucional/home-hero.jpg"
          alt="Fachada da concessionária fictícia Vértice Motors com veículos em exposição"
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
        <span className="welcome-caption">
          Concessionária fictícia · Imagem gerada por IA
        </span>
      </section>
      <BenefitsCarousel />
      <div className="container institutional home-institutional">
        <ProfileFinder />
        <div className="new-experiences">
          <div>
            <span className="inst-tag">UMA ESCOLHA MAIS PESSOAL</span>
            <h2>Seu próximo carro, com os motivos certos.</h2>
            <p>
              Responda quatro perguntas e conheça até três opções do estoque que
              combinam com você.
            </p>
          </div>
          <div>
            <Action to="/encontre-meu-carro">Encontrar meu carro ↗</Action>
            <Action to="/agendar" outline>
              Agendar visita ou test-drive
            </Action>
          </div>
        </div>
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
              src="/images/institucional/home-consultoria.jpg"
              alt="Atendimento a clientes no showroom fictício Vértice Motors"
            />
            <span>Seu caminho inspira a nossa proposta.</span>
          </div>
        </section>
        <BrandStrip />
        <StructureShowcase />
        <section className="inst-section home-services">
          <Intro tag="SOLUÇÕES PARA SUA ESCOLHA" title="Como podemos ajudar?" />
          <ServicesGrid />
        </section>
        <section className="inst-team-banner">
          <div className="home-team-photo">
            <img
              loading="lazy"
              src="/images/institucional/home-equipe.jpg"
              alt="Equipe fictícia da Vértice Motors no showroom"
            />
          </div>
          <div className="home-team-copy">
            <Intro
              tag="PESSOAS QUE FAZEM A DIFERENÇA"
              title="Uma equipe para ouvir, orientar e acompanhar."
              text="Conheça as áreas que participam da sua jornada e entenda com quem contar em cada momento."
            />
            <Action to="/equipe">Conheça a equipe</Action>
          </div>
        </section>
        <section className="inst-section home-journey">
          <div className="journey-wheel-decoration" aria-hidden="true" />
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
