import React from "react";
import Page from "../components/common/Page.jsx";

export default function Stores() {
  return (
    <Page
      title="Nossas lojas"
      subtitle="Encontre o atendimento Vértice mais perto de você."
    >
      <div className="institution-grid">
        <div className="store-illustration">
          <span>⌖</span>
          <h2>Natal / RN</h2>
          <p>Unidade demonstrativa</p>
        </div>
        <div className="panel">
          <h2>Vértice Motors Natal</h2>
          <p>
            Unidade de apresentação do projeto. Endereço e canais reais deverão
            ser cadastrados antes da publicação comercial.
          </p>
          <h3>Horários ilustrativos</h3>
          <p>
            Segunda a sexta: 8h às 18h
            <br />
            Sábado: 8h às 13h
          </p>
          <p className="demo-note">
            Não há loja física vinculada a esta demonstração.
          </p>
        </div>
      </div>
    </Page>
  );
}
