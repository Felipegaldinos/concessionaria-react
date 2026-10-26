import React from "react";
import { Link } from "react-router-dom";
import { useVehicleContext } from "../../context/VehicleContext";
import { cars } from "../../data/vehicles";
import { money } from "../../data";

export default function ProfileFinder() {
  const { setQuery, favorites, toggleFavorite } = useVehicleContext();
  const car = cars[0];
  const saved = favorites.includes(car.id);
  return (
    <section className="next-direction" aria-labelledby="next-direction-title">
      <div className="direction-copy">
        <span className="inst-tag">SEU PRÓXIMO CARRO</span>
        <h2 id="next-direction-title">
          Qual é a sua
          <br />
          próxima direção?
        </h2>
        <p>
          Temos o carro ideal para cada estilo, seja para o dia a dia, para a
          família ou para o trabalho. Aproveite nossas ofertas especiais e
          encontre o modelo que combina com você.
        </p>
        <Link
          className="btn direction-stock"
          to="/carros"
          onClick={() => setQuery("")}
        >
          Ver todos os veículos <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <article className="direction-car">
        <div className="direction-photo">
          <img
            src={car.image}
            alt={`${car.brand} ${car.name} no showroom Vértice Motors, imagem ilustrativa`}
            loading="lazy"
          />
          <span className="direction-badge">Destaque da semana</span>
          <button
            className="direction-favorite"
            type="button"
            aria-label={`${saved ? "Remover dos" : "Salvar nos"} favoritos: ${car.brand} ${car.name}`}
            aria-pressed={saved}
            onClick={() => toggleFavorite(car.id)}
          >
            {saved ? "♥" : "♡"}
          </button>
        </div>
        <div className="direction-car-info">
          <h3>
            {car.brand} {car.name} {car.version}
          </h3>
          <p>
            {car.year} <span aria-hidden="true">|</span>{" "}
            {car.km.toLocaleString("pt-BR")} km{" "}
            <span aria-hidden="true">|</span> {car.gear}
          </p>
          <div className="direction-car-bottom">
            <strong>{money(car.price)}</strong>
            <Link className="btn" to={`/carros/${car.id}`}>
              Ver detalhes <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}
