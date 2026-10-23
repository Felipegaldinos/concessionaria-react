import React from "react";
import InstitutionalPhoto from "../components/institutional/InstitutionalPhoto.jsx";
import Action from "../components/institutional/Action.jsx";
import Intro from "../components/institutional/Intro.jsx";
import Frame from "../components/institutional/Frame.jsx";
import { teamPhotos } from "../data/institutional.js";

export default function Team({}) {
  const roles = [
    [
      "AC",
      "Atendimento e consultoria",
      "A primeira conversa começa aqui. Esta área ajuda a entender seu perfil de uso e apresenta opções para comparar com calma.",
      [
        "Busca por modelo e categoria",
        "Dúvidas sobre características",
        "Organização da visita",
      ],
    ],
    [
      "AV",
      "Avaliação de veículos",
      "A área responsável por conhecer o usado oferecido na troca e orientar a preparação para uma avaliação.",
      [
        "Dados e histórico do usado",
        "Agendamento da avaliação",
        "Explicação das etapas",
      ],
    ],
    [
      "FN",
      "Orientação financeira",
      "Apoio para compreender simulações e organizar as informações necessárias a uma análise de proposta.",
      [
        "Entrada e prazo",
        "Documentos necessários",
        "Esclarecimento de condições",
      ],
    ],
    [
      "SP",
      "Relacionamento e suporte",
      "Um ponto de contato para organizar demandas, acompanhar dúvidas e orientar os próximos passos após a escolha.",
      [
        "Orientações de entrega",
        "Dúvidas após a compra",
        "Encaminhamento do atendimento",
      ],
    ],
  ];
  return (
    <Frame
      title="Nossa equipe"
      subtitle="Pessoas e responsabilidades que se conectam para acompanhar você."
    >
      <div className="team-intro">
        <InstitutionalPhoto
          image="/images/institucional/equipe-grupo.jpg"
          alt="Profissionais reunidos em equipe, imagem ilustrativa"
          className="team-intro-photo"
          eager
        />
        <div>
          <h2>Ouvir primeiro. Orientar em cada etapa.</h2>
          <p>
            Um atendimento completo depende de diferentes especialidades
            trabalhando juntas. Conheça as funções previstas para a equipe
            Vértice e saiba a quem recorrer.
          </p>
          <small>
            Áreas ilustrativas da operação. A apresentação dos profissionais
            reais poderá ser incluída com nomes, funções e fotografias
            autorizadas.
          </small>
        </div>
      </div>
      <div className="team-grid">
        {roles.map(([initial, t, p, list]) => (
          <article key={initial}>
            <InstitutionalPhoto
              image={teamPhotos[initial][0]}
              alt={teamPhotos[initial][1]}
              className="team-role-photo"
            />
            <h2>{t}</h2>
            <p>{p}</p>
            <ul>
              {list.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <section className="team-culture">
        <Intro
          tag="NOSSO JEITO DE ATENDER"
          title="Respeito ao seu tempo e à sua escolha."
        />
        <p>
          Escuta atenta, explicações acessíveis e espaço para perguntar. Essa é
          a cultura de atendimento que queremos representar: cada profissional
          contribui com sua área, mantendo o cliente informado sobre o próximo
          passo.
        </p>
        <Action to="/contato">Converse com a equipe</Action>
      </section>
    </Frame>
  );
}
