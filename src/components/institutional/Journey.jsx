import React from "react";

export default function Journey() {
  return (
    <div className="journey">
      {[
        [
          "Entender",
          "Conte o que você precisa e conheça as opções do estoque.",
        ],
        [
          "Comparar",
          "Tire dúvidas sobre características, valores e possibilidades de troca.",
        ],
        [
          "Planejar",
          "Organize orçamento, documentos e condições antes de decidir.",
        ],
        [
          "Acompanhar",
          "Use o atendimento para esclarecer dúvidas sobre entrega e próximos cuidados.",
        ],
      ].map(([t, p], i) => (
        <article key={t}>
          <span>0{i + 1}</span>
          <h3>{t}</h3>
          <p>{p}</p>
        </article>
      ))}
    </div>
  );
}
