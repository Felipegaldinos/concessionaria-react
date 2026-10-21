import React, { useState } from "react";

export default function DemoForm({ trade = false, initial = "" }) {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="panel demo-form"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <h2>{trade ? "Solicite uma avaliação" : "Fale com a Vértice"}</h2>
      <label>
        Nome completo
        <input
          required
          autoComplete="name"
          name="name"
          placeholder="Seu nome"
        />
      </label>
      <div className="form-row">
        <label>
          E-mail
          <input
            required
            type="email"
            autoComplete="email"
            placeholder="voce@exemplo.com"
          />
        </label>
        <label>
          Telefone
          <input
            required
            type="tel"
            autoComplete="tel"
            minLength="10"
            placeholder="(84) 99999-9999"
          />
        </label>
      </div>
      {trade && (
        <>
          <label>
            Marca e modelo
            <input required placeholder="Ex.: Volkswagen Polo" />
          </label>
          <div className="form-row">
            <label>
              Ano
              <input
                required
                type="number"
                min="1980"
                max={new Date().getFullYear() + 1}
              />
            </label>
            <label>
              Quilometragem
              <input required type="number" min="0" />
            </label>
          </div>
        </>
      )}
      <label>
        Mensagem
        <textarea
          required
          rows="4"
          defaultValue={initial}
          placeholder="Como podemos ajudar?"
        />
      </label>
      <label className="check">
        <input type="checkbox" required /> Entendo que este formulário é
        demonstrativo e não envia dados.
      </label>
      <button className="btn">
        {trade ? "Testar solicitação de avaliação" : "Testar envio de mensagem"}
      </button>
      {sent && (
        <p role="status" className="success">
          Demonstração concluída. Nenhum dado foi enviado ou armazenado.
        </p>
      )}
    </form>
  );
}
