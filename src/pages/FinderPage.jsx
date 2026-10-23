import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "../components/common/Page";
import CarCard from "../components/catalog/CarCard";
import { cars } from "../data/vehicles";
import { money } from "../data";
import { useVehicleContext } from "../context/VehicleContext";
import { recommendVehicles } from "../utils/recommendations";
const steps = ["Orçamento", "Sua rotina", "Espaço", "Preferências"];
const initial = { budget: 130000, use: "city", space: "compact", gear: "any" };
function Choice({ name, value, current, onChange, title, text }) {
  return (
    <label className={"finder-option " + (value === current ? "selected" : "")}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={current === value}
        onChange={() => onChange(value)}
      />
      <span>
        <b>{title}</b>
        <small>{text}</small>
      </span>
    </label>
  );
}
export default function FinderPage() {
  const [step, setStep] = useState(0),
    [answers, setAnswers] = useState(initial),
    [results, setResults] = useState(null);
  const { favorites, toggleFavorite } = useVehicleContext();
  const heading = useRef(null);
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) heading.current?.focus();
    mounted.current = true;
  }, [step, results]);
  const update = (field, value) =>
    setAnswers((previous) => ({ ...previous, [field]: value }));
  return (
    <Page
      title="Encontre meu carro"
      subtitle="Quatro perguntas. Até três sugestões do estoque, com os motivos de cada escolha."
    >
      <div className="finder-shell">
        {results === null ? (
          <>
            <ol className="finder-steps" aria-label="Etapas do assistente">
              {steps.map((label, i) => (
                <li key={label} aria-current={step === i ? "step" : undefined}>
                  <span>{i + 1}</span>
                  {label}
                </li>
              ))}
            </ol>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (step < 3) setStep(step + 1);
                else setResults(recommendVehicles(cars, answers));
              }}
            >
              <h2 ref={heading} tabIndex="-1">
                {
                  [
                    "Quanto você pretende investir?",
                    "Como o carro vai fazer parte da sua rotina?",
                    "Quanto espaço combina com você?",
                    "Qual câmbio você prefere?",
                  ][step]
                }
              </h2>
              {step === 0 ? (
                <fieldset>
                  <legend>Defina o valor máximo do veículo</legend>
                  <div className="budget-value">{money(answers.budget)}</div>
                  <label>
                    Orçamento máximo
                    <input
                      type="range"
                      min="50000"
                      max="180000"
                      step="1000"
                      value={answers.budget}
                      onChange={(e) => update("budget", Number(e.target.value))}
                    />
                  </label>
                  <div className="budget-extremes">
                    <span>R$ 50 mil</span>
                    <span>R$ 180 mil</span>
                  </div>
                  <p>
                    Vamos respeitar esse limite. Se não houver opções, você
                    poderá ajustar as respostas.
                  </p>
                </fieldset>
              ) : step === 1 ? (
                <fieldset>
                  <legend>Escolha seu uso principal</legend>
                  <Choice
                    name="use"
                    value="city"
                    current={answers.use}
                    onChange={(v) => update("use", v)}
                    title="Cidade e rotina"
                    text="Trabalho, estudos e compromissos do dia a dia."
                  />
                  <Choice
                    name="use"
                    value="family"
                    current={answers.use}
                    onChange={(v) => update("use", v)}
                    title="Família e versatilidade"
                    text="Pessoas, bagagens e diferentes planos."
                  />
                  <Choice
                    name="use"
                    value="road"
                    current={answers.use}
                    onChange={(v) => update("use", v)}
                    title="Estrada e viagens"
                    text="Conforto como prioridade para viajar."
                  />
                </fieldset>
              ) : step === 2 ? (
                <fieldset>
                  <legend>Selecione a sua preferência de espaço</legend>
                  <Choice
                    name="space"
                    value="compact"
                    current={answers.space}
                    onChange={(v) => update("space", v)}
                    title="Quero um carro compacto"
                    text="Prefiro dimensões menores na rotina."
                  />
                  <Choice
                    name="space"
                    value="spacious"
                    current={answers.space}
                    onChange={(v) => update("space", v)}
                    title="Quero mais espaço"
                    text="Priorizo categorias com proposta familiar."
                  />
                  <Choice
                    name="space"
                    value="any"
                    current={answers.space}
                    onChange={(v) => update("space", v)}
                    title="Estou aberto a opções"
                    text="Posso comparar diferentes categorias."
                  />
                </fieldset>
              ) : (
                <fieldset>
                  <legend>Preferência de transmissão</legend>
                  {[
                    [
                      "any",
                      "Sem preferência",
                      "Quero comparar todas as opções.",
                    ],
                    [
                      "Automático",
                      "Automático",
                      "Prefiro a praticidade do câmbio automático.",
                    ],
                    ["Manual", "Manual", "Quero uma opção com câmbio manual."],
                  ].map(([v, t, p]) => (
                    <Choice
                      key={v}
                      name="gear"
                      value={v}
                      current={answers.gear}
                      onChange={(value) => update("gear", value)}
                      title={t}
                      text={p}
                    />
                  ))}
                </fieldset>
              )}
              <div className="finder-controls">
                <button
                  type="button"
                  className="btn outline"
                  disabled={step === 0}
                  onClick={() => setStep(step - 1)}
                >
                  Voltar
                </button>
                <span>Etapa {step + 1} de 4</span>
                <button className="btn">
                  {step === 3 ? "Ver minhas sugestões ↗" : "Continuar →"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <span className="inst-tag">SUGESTÕES EXPLICADAS</span>
            <h2 ref={heading} tabIndex="-1">
              {results.length
                ? "Estes caminhos combinam com você."
                : "Não encontramos opções com essas preferências."}
            </h2>
            <p className="finder-summary">
              Até {money(answers.budget)} ·{" "}
              {answers.gear === "any" ? "Todos os câmbios" : answers.gear}
            </p>
            {results.length ? (
              <div className="finder-results">
                {results.map(({ car, reasons }) => (
                  <section key={car.id}>
                    <CarCard
                      car={car}
                      favorite={favorites.includes(car.id)}
                      onFavorite={() => toggleFavorite(car.id)}
                    />
                    <div className="recommendation-reasons">
                      <h3>Por que este carro?</h3>
                      <ul>
                        {reasons.map((reason) => (
                          <li key={reason}>{reason}</li>
                        ))}
                      </ul>
                      <Link to={"/agendar?veiculo=" + car.id}>
                        Conhecer de perto →
                      </Link>
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <p>
                Experimente ampliar o orçamento ou mudar a preferência de
                câmbio. Não indicaremos veículos acima do limite escolhido.
              </p>
            )}
            <div className="finder-controls">
              <button
                className="btn outline"
                onClick={() => {
                  setResults(null);
                  setStep(0);
                }}
              >
                Ajustar minhas respostas
              </button>
              <Link className="btn" to="/carros">
                Explorar estoque completo ↗
              </Link>
            </div>
            <p className="demo-note">
              Sugestões por regras de orçamento, uso, carroceria e câmbio; não
              são uma avaliação técnica de conforto, segurança ou capacidade.
              Veículos e dados demonstrativos.
            </p>
          </>
        )}
      </div>
    </Page>
  );
}
