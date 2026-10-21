import React from "react";
import Page from "../components/common/Page.jsx";
import DemoForm from "../components/forms/DemoForm.jsx";
import { photo } from "../data.js";

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
            src={photo("photo-1492144534655-ae79c964c9d7")}
            alt="Automóvel ilustrativo"
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
