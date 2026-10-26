import React from "react";
import Action from "../components/institutional/Action.jsx";
import Intro from "../components/institutional/Intro.jsx";
import Frame from "../components/institutional/Frame.jsx";
import CTA from "../components/institutional/CTA.jsx";
import ServicesGrid from "../components/institutional/ServicesGrid.jsx";

export default function Services({}) {
  return (
    <Frame
      title="Serviços e suporte"
      subtitle="Informação e orientação para cada momento da sua escolha."
    >
      <section className="interior-services">
        <ServicesGrid />
      </section>
      <section className="inst-section support-section">
        <Intro
          tag="SUPORTE AO CLIENTE"
          title="Conte com orientação além da escolha do modelo."
          text="A proposta de relacionamento Vértice acompanha a jornada com um canal para organizar dúvidas e indicar os próximos passos."
        />
        <div className="support-grid">
          {[
            [
              "Antes da compra",
              "Apoio na busca, esclarecimento sobre características dos veículos e preparação para a visita.",
            ],
            [
              "Durante a negociação",
              "Orientações sobre os dados a apresentar, as etapas da avaliação e a leitura das condições da proposta.",
            ],
            [
              "Na entrega",
              "Conferência dos itens combinados e orientação inicial sobre o veículo e seus documentos.",
            ],
            [
              "Depois da entrega",
              "Recebimento de dúvidas e encaminhamento das solicitações para a área responsável.",
            ],
          ].map(([t, p]) => (
            <article key={t}>
              <h3>{t}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="support-notes">
        <h2>Informação clara sobre o atendimento</h2>
        <p>
          Manutenção, garantia, assistência e prazos dependem das condições
          contratadas e da operação efetiva da empresa. Confirme a cobertura e
          os canais disponíveis antes de concluir qualquer negociação.
        </p>
        <p>
          Este projeto não oferece oficina própria, assistência 24 horas ou
          garantia adicional. O conteúdo demonstra a organização do suporte e
          deve ser adaptado aos serviços reais da concessionária.
        </p>
      </section>
      <div className="inst-related">
        <Action to="/ajuda" outline>
          Perguntas frequentes
        </Action>
        <Action to="/equipe" outline>
          Quem pode ajudar
        </Action>
      </div>
      <CTA />
    </Frame>
  );
}
