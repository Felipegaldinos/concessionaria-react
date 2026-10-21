import React, { useState } from "react";
import Page from "../components/common/Page.jsx";
import { money, installment } from "../data.js";

export default function Finance() {
  const [price, setPrice] = useState(100000),
    [down, setDown] = useState(30000),
    [months, setMonths] = useState(48);
  return (
    <Page
      title="Financiamento de veículos"
      subtitle="Simule uma possibilidade para o seu próximo carro."
    >
      <div className="institution-grid">
        <div className="green-panel">
          <span className="eyebrow">DO SEU JEITO</span>
          <h2>
            Seu próximo carro,
            <br />
            com planejamento.
          </h2>
          <p>
            Compare entrada e prazo para entender o impacto no valor das
            parcelas.
          </p>
          <ol>
            <li>Escolha o valor do veículo.</li>
            <li>Informe a entrada e o prazo.</li>
            <li>Converse com nossa equipe.</li>
          </ol>
        </div>
        <div className="panel">
          <h2>Faça sua simulação</h2>
          <label>
            Valor do veículo (R$)
            <input
              type="number"
              min="10000"
              max="1000000"
              value={price}
              onChange={(e) => {
                setPrice(+e.target.value);
                if (down > +e.target.value) setDown(+e.target.value);
              }}
            />
          </label>
          <label>
            Entrada (R$)
            <input
              type="number"
              min="0"
              max={price}
              value={down}
              onChange={(e) =>
                setDown(Math.max(0, Math.min(price, +e.target.value)))
              }
            />
          </label>
          <label>
            Prazo
            <select value={months} onChange={(e) => setMonths(+e.target.value)}>
              {[12, 24, 36, 48, 60, 72].map((n) => (
                <option key={n} value={n}>
                  {n} meses
                </option>
              ))}
            </select>
          </label>
          <div className="simulation">
            <span>{months} parcelas estimadas de</span>
            <strong>{money(installment(price, down, months))}</strong>
          </div>
          <p className="demo-note">
            Simulação Price a 1,79% ao mês. Não inclui IOF, tarifas, seguros ou
            CET. Não é oferta nem aprovação de crédito.
          </p>
        </div>
      </div>
    </Page>
  );
}
