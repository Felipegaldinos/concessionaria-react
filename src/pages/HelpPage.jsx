import React from "react";
import Page from "../components/common/Page.jsx";

export default function Help() {
  return (
    <Page
      title="Como podemos ajudar?"
      subtitle="Respostas para acompanhar sua escolha."
    >
      <div className="faq">
        {[
          [
            "Como encontro um carro?",
            "Use a busca no cabeçalho ou os filtros do estoque para selecionar marca, carroceria, ano, câmbio, preço e quilometragem.",
          ],
          [
            "Posso usar meu carro na troca?",
            "A página Carro na troca demonstra uma solicitação de avaliação. Uma operação real depende da análise presencial do veículo.",
          ],
          [
            "Como funciona o financiamento?",
            "O simulador permite comparar entrada e prazo. As condições são ilustrativas e uma contratação real depende da instituição financeira e da análise de crédito.",
          ],
          [
            "Como salvo meus favoritos?",
            "Clique no coração de um veículo. Os favoritos ficam salvos apenas neste navegador.",
          ],
          [
            "Os veículos estão disponíveis para compra?",
            "Não. Esta é uma demonstração de site. Todos os dados, preços e condições são fictícios.",
          ],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </Page>
  );
}
