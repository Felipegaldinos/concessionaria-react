import React from "react";
import { useSearchParams } from "react-router-dom";
import Page from "../components/common/Page.jsx";
import DemoForm from "../components/forms/DemoForm.jsx";
import { cars } from "../data/vehicles.js";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("veiculo");
  const car = cars.find((c) => c.id === +id);
  return (
    <Page
      title="Contato"
      subtitle="Conte com a gente para encontrar sua próxima direção."
    >
      <div className="institution-grid">
        <div>
          <h2>Vamos conversar?</h2>
          <p>
            Conte o que você procura ou envie suas dúvidas usando nosso
            formulário de demonstração.
          </p>
          <div className="contact-box">
            <b>⌖ Natal, Rio Grande do Norte</b>
            <p>
              Atendimento e canais demonstrativos.
              <br />
              Nenhuma mensagem será transmitida.
            </p>
          </div>
        </div>
        <DemoForm
          key={id || "general"}
          initial={
            car
              ? `Tenho interesse no ${car.brand} ${car.name}, código ${car.id}.`
              : ""
          }
        />
      </div>
    </Page>
  );
}
