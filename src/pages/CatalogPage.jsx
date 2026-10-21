import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CatalogFilters from "../components/catalog/CatalogFilters.jsx";
import CarCard from "../components/catalog/CarCard.jsx";
import Promo from "../components/catalog/Promo.jsx";
import Breadcrumb from "../components/common/Breadcrumb.jsx";
import ContactBanner from "../components/common/ContactBanner.jsx";
import { cars } from "../data/vehicles.js";
import { useVehicleContext } from "../context/VehicleContext.jsx";

export default function Catalog({ favoritesOnly = false }) {
  const {
    query,
    setQuery,
    favorites: favs,
    toggleFavorite: toggle,
  } = useVehicleContext();
  const go = useNavigate();
  const [brand, setBrand] = useState(""),
    [type, setType] = useState(""),
    [max, setMax] = useState(""),
    [year, setYear] = useState(""),
    [km, setKm] = useState(""),
    [gear, setGear] = useState(""),
    [offer, setOffer] = useState(false),
    [sort, setSort] = useState("default"),
    [page, setPage] = useState(1),
    [filters, setFilters] = useState(false);
  useEffect(() => setPage(1), [query, brand, type, max, year, km, gear, offer]);
  const reset = () => {
    setQuery("");
    setBrand("");
    setType("");
    setMax("");
    setYear("");
    setKm("");
    setGear("");
    setOffer(false);
    setPage(1);
  };
  const found = cars
    .filter(
      (c) =>
        (!favoritesOnly || favs.includes(c.id)) &&
        `${c.brand} ${c.name}`.toLowerCase().includes(query.toLowerCase()) &&
        (!brand || brand === c.brand) &&
        (!type || type === c.type) &&
        (!max || c.price <= +max) &&
        (!year || c.year >= +year) &&
        (!km || c.km <= +km) &&
        (!gear || c.gear === gear) &&
        (!offer || c.offer),
    )
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : sort === "km"
            ? a.km - b.km
            : a.id - b.id,
    );
  const pages = Math.max(1, Math.ceil(found.length / 18));
  const activePage = Math.min(page, pages);
  const current = found.slice((activePage - 1) * 18, activePage * 18);
  return (
    <div className="container catalog">
      <Breadcrumb
        title={favoritesOnly ? "Favoritos" : "Carros usados / Natal"}
      />
      <h1>
        {favoritesOnly
          ? "Seus carros favoritos"
          : "Carros usados e seminovos para comprar em Natal e região"}
      </h1>
      <div className="catalog-layout">
        <CatalogFilters
          {...{
            filters,
            reset,
            offer,
            setOffer,
            max,
            setMax,
            type,
            setType,
            brand,
            setBrand,
            km,
            setKm,
            year,
            setYear,
            gear,
            setGear,
          }}
        />
        <div className="inventory">
          <div className="inventory-toolbar">
            <span>
              <b>{found.length}</b> veículos
            </span>
            <button
              className="filter-mobile"
              onClick={() => setFilters(!filters)}
            >
              ☷ Filtros
            </button>
            <select
              aria-label="Ordenar veículos"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">☷ Mais relevantes</option>
              <option value="low">Menor preço</option>
              <option value="high">Maior preço</option>
              <option value="km">Menor quilometragem</option>
            </select>
          </div>
          <div className="car-grid">
            {current.map((c, i) => (
              <React.Fragment key={c.id}>
                <CarCard
                  car={c}
                  favorite={favs.includes(c.id)}
                  onFavorite={() => toggle(c.id)}
                />
                {[3, 8, 13].includes(i) && (
                  <Promo
                    type={i === 8 ? "trade" : i === 13 ? "help" : "finance"}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          {!found.length && (
            <div className="empty">
              <h2>Nenhum veículo encontrado</h2>
              <p>
                {favoritesOnly
                  ? "Toque no coração dos veículos para salvar suas escolhas."
                  : "Tente remover alguns filtros para ampliar sua busca."}
              </p>
              <button
                className="btn"
                onClick={favoritesOnly ? () => go("/carros") : reset}
              >
                {favoritesOnly ? "Explorar estoque" : "Limpar filtros"}
              </button>
            </div>
          )}
          <nav className="pagination" aria-label="Paginação do estoque">
            <button
              disabled={activePage === 1}
              onClick={() => {
                setPage(activePage - 1);
                window.scrollTo(0, 0);
              }}
              aria-label="Página anterior"
            >
              ‹
            </button>
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                aria-current={activePage === i + 1 ? "page" : undefined}
                className={activePage === i + 1 ? "active" : ""}
                onClick={() => {
                  setPage(i + 1);
                  window.scrollTo(0, 0);
                }}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={activePage === pages}
              onClick={() => {
                setPage(activePage + 1);
                window.scrollTo(0, 0);
              }}
              aria-label="Próxima página"
            >
              ›
            </button>
          </nav>
          <p className="result-count">
            Exibindo {found.length ? (activePage - 1) * 18 + 1 : 0}–
            {Math.min(activePage * 18, found.length)} de {found.length} veículos
          </p>
          <ContactBanner />
          <p className="demo-note">
            Estoque, preços e ofertas demonstrativos. Fotos ilustrativas não
            correspondem necessariamente aos modelos indicados.
          </p>
        </div>
      </div>
    </div>
  );
}
