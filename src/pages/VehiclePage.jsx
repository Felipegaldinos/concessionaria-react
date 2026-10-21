import React from "react";
import { Link, useParams } from "react-router-dom";
import Page from "../components/common/Page.jsx";
import { photo, money } from "../data.js";
import { cars } from "../data/vehicles.js";
import { useVehicleContext } from "../context/VehicleContext.jsx";

export default function Detail() {
  const { id } = useParams();
  const c = cars.find((car) => car.id === Number(id));
  const { favorites: favs, toggleFavorite: toggle } = useVehicleContext();
  if (!c)
    return (
      <Page title="Veículo não encontrado">
        <Link to="/carros">Voltar ao estoque</Link>
      </Page>
    );
  return (
    <Page title={`${c.brand} ${c.name}`} subtitle={c.version}>
      <div className="detail-layout">
        <div>
          <img
            className="detail-image"
            src={photo(c.image, 1400)}
            alt="Foto ilustrativa do veículo"
          />
          <p className="demo-note">
            Foto ilustrativa. O veículo e sua disponibilidade são
            demonstrativos.
          </p>
          <h2>Conheça este veículo</h2>
          <div className="detail-specs">
            {[
              ["Ano", c.year],
              ["Quilometragem", c.km.toLocaleString("pt-BR") + " km"],
              ["Câmbio", c.gear],
              ["Carroceria", c.type],
              ["Localização", "Natal / RN"],
            ].map(([k, v]) => (
              <div key={k}>
                <small>{k}</small>
                <b>{v}</b>
              </div>
            ))}
          </div>
          <h2>Uma escolha com mais tranquilidade</h2>
          <p>
            Solicite informações sobre histórico, revisão e documentação antes
            da compra. Agende uma visita para conhecer as características do
            veículo.
          </p>
        </div>
        <aside className="detail-panel">
          <span>Valor demonstrativo</span>
          <h2>{money(c.price)}</h2>
          <Link className="btn" to={"/contato?veiculo=" + c.id}>
            Tenho interesse
          </Link>
          <Link className="btn outline" to="/financiamento">
            Simular financiamento
          </Link>
          <button className="text-button" onClick={() => toggle(c.id)}>
            {favs.includes(c.id)
              ? "♥ Salvo nos favoritos"
              : "♡ Salvar nos favoritos"}
          </button>
          <p>⌖ Natal / RN</p>
          <small>Valores e condições ilustrativos, sem oferta comercial.</small>
        </aside>
      </div>
    </Page>
  );
}
