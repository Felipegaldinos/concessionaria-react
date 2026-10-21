import React from "react";
import { Link } from "react-router-dom";
import { photo, money } from "../../data.js";

export default function CarCard({ car: c, favorite, onFavorite }) {
  return (
    <article className="car-card">
      <div className="car-image">
        <Link to={"/carros/" + c.id}>
          <img
            src={photo(c.image, 650)}
            alt={`Imagem ilustrativa de ${c.brand} ${c.name}`}
            loading="lazy"
          />
        </Link>
        {c.offer && <span className="offer-badge">Oferta</span>}
        <button
          className={"heart " + (favorite ? "saved" : "")}
          aria-label={`${favorite ? "Remover dos" : "Adicionar aos"} favoritos: ${c.name}`}
          aria-pressed={favorite}
          onClick={onFavorite}
        >
          {favorite ? "♥" : "♡"}
        </button>
      </div>
      <Link className="car-info" to={"/carros/" + c.id}>
        <h2>
          {c.brand} {c.name}
        </h2>
        <p className="version">{c.version}</p>
        <div className="specs">
          <span>{c.km.toLocaleString("pt-BR")} km</span>
          <span>
            {c.year}/{c.year + 1}
          </span>
          <span>{c.gear}</span>
        </div>
        {c.offer && <del>{money(c.price + 4000)}</del>}
        <strong className={c.offer ? "offer-price" : ""}>
          {money(c.price)} {c.offer && <small>✹</small>}
        </strong>
      </Link>
      <div className="car-location">
        ⌖ NATAL/RN <span>Foto ilustrativa</span>
      </div>
    </article>
  );
}
