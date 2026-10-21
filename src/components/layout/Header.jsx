import Logo from "./Logo";
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useVehicleContext } from "../../context/VehicleContext";
export default function Header() {
  const { query, setQuery, favorites: favs } = useVehicleContext();
  const [menu, setMenu] = useState(false);
  const go = useNavigate();
  const location = useLocation();
  useEffect(() => setMenu(false), [location]);
  const nav = [
    ["Início", "/"],
    ["Comprar", "/carros"],
    ["Equipe", "/equipe"],
    ["Estrutura", "/estrutura"],
    ["Serviços", "/servicos"],
    ["Financiamento", "/financiamento"],
    ["Carro na troca", "/troca"],
    ["Quem somos", "/quem-somos"],
    ["Nossas lojas", "/lojas"],
    ["Ajuda", "/ajuda"],
  ];

  return (
    <header className="header">
      <div className="header-inner">
        <Logo />
        <form
          className="header-search"
          onSubmit={(e) => {
            e.preventDefault();
            go("/carros");
          }}
        >
          <input
            aria-label="Pesquise por marca ou modelo"
            placeholder="Pesquise por marca ou modelo"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="city">⌖ NATAL - RN</span>
          <button aria-label="Buscar veículos">⌕</button>
        </form>
        <button
          className="hamburger"
          onClick={() => setMenu(!menu)}
          aria-expanded={menu}
          aria-label="Abrir menu"
        >
          ☰
        </button>
        <nav className={menu ? "open" : ""} aria-label="Navegação principal">
          {nav.map(([label, url]) => (
            <NavLink
              key={url}
              to={url}
              end={url === "/"}
              className={({ isActive }) => (isActive ? "current" : "")}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <Link
          className="favorites-link"
          aria-label={`Favoritos: ${favs.length}`}
          to="/favoritos"
        >
          ♡{favs.length > 0 && <sup>{favs.length}</sup>}
        </Link>
      </div>
    </header>
  );
}
