import React from "react";
import { Link } from "react-router-dom";
import Page from "../components/common/Page";
import { useVehicleContext } from "../context/VehicleContext";
import { cars } from "../data/vehicles";
import { money, photo } from "../data";
export default function ComparePage() {
  const { comparison, toggleComparison } = useVehicleContext();
  const selected = cars.filter((c) => comparison.includes(c.id));
  return (
    <Page
      title="Compare seus próximos caminhos"
      subtitle="Até três veículos, lado a lado. Escolha com informação."
    >
      {selected.length ? (
        <div className="comparison-grid">
          {selected.map((car) => (
            <article key={car.id}>
              <img
                src={photo(car.image)}
                alt={"Imagem gerada por IA de " + car.brand + " " + car.name}
              />
              <div className="comparison-body">
                <button
                  className="remove-comparison"
                  onClick={() => toggleComparison(car.id)}
                  aria-label={"Remover " + car.name + " da comparação"}
                >
                  Remover ×
                </button>
                <h2>
                  {car.brand} {car.name}
                </h2>
                <strong>{money(car.price)}</strong>
                <dl>
                  {[
                    ["Versão", car.version],
                    ["Carroceria", car.type],
                    ["Cor", car.color],
                    ["Ano", car.year],
                    ["Quilometragem", car.km.toLocaleString("pt-BR") + " km"],
                    ["Câmbio", car.gear],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                <Link className="btn" to={"/carros/" + car.id}>
                  Conhecer veículo ↗
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Suas opções, lado a lado.</h2>
          <p>Selecione “Comparar” nos veículos do estoque para começar.</p>
          <Link className="btn" to="/carros">
            Explorar estoque ↗
          </Link>
        </div>
      )}
    </Page>
  );
}
