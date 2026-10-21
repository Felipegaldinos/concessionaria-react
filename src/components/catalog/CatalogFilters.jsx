import React from "react";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import { cars } from "../../data/vehicles";
export default function CatalogFilters({
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
}) {
  return (
    <aside className={"filters " + (filters ? "visible" : "")}>
      <div className="filters-title">
        <b>Filtros</b>
        <button onClick={reset}>Limpar</button>
      </div>
      <div className="location-filter">
        <b>Localização</b>
        <div>⌖ NATAL - RN</div>
        <p>
          Confira os carros disponíveis em nossa seleção demonstrativa de Natal.
        </p>
      </div>
      <label className="offer-toggle">
        <span>
          <b>✹ Carros em oferta</b>
          <small>Carros com desconto ilustrativo no preço final</small>
        </span>
        <input
          type="checkbox"
          checked={offer}
          onChange={(e) => setOffer(e.target.checked)}
        />
      </label>
      <Filter
        title="R$　Preço"
        value={max}
        set={setMax}
        options={[
          [80000, "Até R$ 80 mil"],
          [120000, "Até R$ 120 mil"],
          [150000, "Até R$ 150 mil"],
        ]}
      />
      <Filter
        title="▱　Carroceria"
        value={type}
        set={setType}
        options={["SUV", "Sedã", "Hatch"]}
      />
      <Filter
        title="▣　Marca e modelo"
        value={brand}
        set={setBrand}
        options={[...new Set(cars.map((c) => c.brand))]}
      />
      <Filter
        title="◉　Quilometragem"
        value={km}
        set={setKm}
        options={[
          [25000, "Até 25 mil km"],
          [40000, "Até 40 mil km"],
          [60000, "Até 60 mil km"],
        ]}
      />
      <Filter
        title="▦　Ano"
        value={year}
        set={setYear}
        options={[
          [2024, "A partir de 2024"],
          [2023, "A partir de 2023"],
          [2022, "A partir de 2022"],
        ]}
      />
      <Filter
        title="⚙　Câmbio"
        value={gear}
        set={setGear}
        options={["Manual", "Automático"]}
      />
      <Link className="filter-contact" to="/contato">
        Precisa de ajuda? Fale com a gente →
      </Link>
    </aside>
  );
}
