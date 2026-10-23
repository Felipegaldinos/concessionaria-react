import React from "react";
import Page from "../components/common/Page.jsx";
import DemoForm from "../components/forms/DemoForm.jsx";

export default function Trade() {
  return (
    <Page
      title="Seu carro na troca"
      subtitle="Sua próxima conquista pode começar com o carro que já é seu."
    >
      <div className="institution-grid">
        <div>
          <img
            className="feature-image"
            src="/images/institucional/troca-atendimento.jpg"
            alt="Avaliação ilustrativa de um veículo na concessionária fictícia Vértice Motors"
          />
          <h2>Uma troca com transparência</h2>
          <p>
            Informe os dados do seu carro e prepare o histórico de manutenção.
            Em uma operação real, a avaliação considera conservação,
            documentação e condições de mercado.
          </p>
          <ul className="steps">
            <li>Conte sobre seu veículo</li>
            <li>Agende uma avaliação presencial</li>
            <li>Conheça as opções do estoque</li>
          </ul>
        </div>
        <DemoForm trade />
      </div>
    </Page>
  );
}
