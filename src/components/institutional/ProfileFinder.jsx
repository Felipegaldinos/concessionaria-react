import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useVehicleContext } from "../../context/VehicleContext";
const profiles = [
  {
    name: "Cidade",
    type: "Hatch",
    icon: "↗",
    title: "Prático para todos os dias.",
    text: "Compactos para encarar os trajetos da semana com mais leveza.",
  },
  {
    name: "Família",
    type: "SUV",
    icon: "◈",
    title: "Espaço para os seus planos.",
    text: "Explore SUVs para levar a família e tudo que acompanha vocês.",
  },
  {
    name: "Conforto",
    type: "Sedã",
    icon: "≈",
    title: "Uma nova forma de viajar.",
    text: "Sedãs para quem valoriza conforto na rotina e na estrada.",
  },
];
export default function ProfileFinder() {
  const { setQuery } = useVehicleContext();
  const [selected, setSelected] = useState(0);
  const profile = profiles[selected];
  return (
    <section className="profile-finder">
      <div className="profile-intro">
        <span className="inst-tag">UM CARRO COM O SEU JEITO</span>
        <h2>
          Qual é a sua
          <br />
          próxima direção?
        </h2>
        <p>Comece pela sua rotina. A gente ajuda a encontrar o caminho.</p>
      </div>
      <div className="profile-interactive">
        <div role="tablist" aria-label="Seu perfil de uso">
          {profiles.map((p, i) => (
            <button
              key={p.name}
              role="tab"
              id={"profile-tab-" + i}
              aria-selected={selected === i}
              aria-controls="profile-panel"
              onClick={() => setSelected(i)}
              tabIndex={selected === i ? 0 : -1}
              onKeyDown={(e) => {
                if (
                  ["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)
                ) {
                  e.preventDefault();
                  const next =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? 2
                        : (selected + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                  setSelected(next);
                  document.getElementById("profile-tab-" + next)?.focus();
                }
              }}
            >
              {p.name}
            </button>
          ))}
        </div>
        <div
          id="profile-panel"
          role="tabpanel"
          aria-labelledby={"profile-tab-" + selected}
        >
          <span className="profile-icon" aria-hidden="true">
            {profile.icon}
          </span>
          <h3>{profile.title}</h3>
          <p>{profile.text}</p>
          <Link
            onClick={() => setQuery("")}
            to={"/carros?tipo=" + encodeURIComponent(profile.type)}
            className="btn"
          >
            Explorar{" "}
            {profile.type === "SUV"
              ? "SUVs"
              : profile.type === "Sedã"
                ? "sedãs"
                : "hatches"}{" "}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
