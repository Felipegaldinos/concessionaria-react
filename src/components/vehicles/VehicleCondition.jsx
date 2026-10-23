import React from "react";
export default function VehicleCondition({ car }) {
  return (
    <section className="condition-panel">
      <span className="inst-tag">CONHEÇA OS DETALHES</span>
      <h2>Conservação e pontos de atenção</h2>
      <p>
        Ficha ilustrativa deste veículo. As observações abaixo demonstram como a
        concessionária pode apresentar informações de conservação.
      </p>
      <dl>
        {car.condition.map(({ area, note }) => (
          <div key={area}>
            <dt>{area}</dt>
            <dd>{note}</dd>
          </div>
        ))}
      </dl>
      <small>
        Não é laudo, inspeção ou certificação. Confirme o estado real, a
        documentação e eventuais reparos com a equipe.
      </small>
    </section>
  );
}
