import React, { useState, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Page from "../components/common/Page";
import { cars } from "../data/vehicles";
import { dealership, hasWhatsApp } from "../config/dealership";
import {
  siteToday,
  bookingDateLimit,
  bookingSlots,
  bookingMessage,
  bookingCalendar,
} from "../utils/booking";
import { money } from "../data";
export default function BookingPage() {
  const [params] = useSearchParams();
  const initialId = params.get("veiculo");
  const [form, setForm] = useState(() => ({
    vehicle: cars.some((c) => c.id === Number(initialId)) ? initialId : "",
    unit: dealership.unit,
    kind: params.get("tipo") === "test-drive" ? "test-drive" : "visita",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
    consent: false,
  }));
  const [request, setRequest] = useState(null),
    [error, setError] = useState(""),
    [copyStatus, setCopyStatus] = useState("");
  const heading = useRef(null),
    mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) heading.current?.focus();
    mounted.current = true;
  }, [request]);
  const car = cars.find((c) => c.id === Number(form.vehicle));
  const slots = bookingSlots(form.date);
  const update = (field, value) =>
    setForm((previous) =>
      previous[field] === value
        ? previous
        : {
            ...previous,
            [field]: value,
            ...(field === "date" ? { time: "" } : {}),
          },
    );
  function submit(event) {
    event.preventDefault();
    setError("");
    if (!car) {
      setError("Selecione um veículo do estoque.");
      return;
    }
    if (!bookingSlots(form.date).includes(form.time)) {
      setError(
        "Escolha uma data e um horário válidos. A agenda considera o horário de Natal/RN e antecedência mínima de uma hora.",
      );
      return;
    }
    const phone = form.phone.replace(/\D/g, "");
    if (phone.length < 10 || phone.length > 13) {
      setError("Informe um telefone com DDD.");
      return;
    }
    if (form.name.trim().length < 3) {
      setError("Informe seu nome completo.");
      return;
    }
    setRequest({
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      car,
    });
  }
  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(bookingMessage(request));
      setCopyStatus(
        "Mensagem copiada. Cole na conversa com a equipe quando o canal real estiver disponível.",
      );
    } catch {
      setCopyStatus(
        "Não foi possível copiar automaticamente. Selecione e copie a mensagem abaixo.",
      );
    }
  }
  function downloadCalendar() {
    const blob = new Blob([bookingCalendar(request)], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "preferencia-visita-vertice.ics";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <Page
      title="Agende sua próxima experiência"
      subtitle="Escolha uma visita ou test-drive e prepare seu pedido para a equipe."
    >
      <div className="booking-notice">
        Agenda demonstrativa · Horários de referência, sujeitos à confirmação de
        disponibilidade. Nenhum horário é reservado automaticamente.
      </div>
      {request ? (
        <section className="booking-confirmation">
          <span className="inst-tag">PRÓXIMO PASSO PREPARADO</span>
          <h2 ref={heading} tabIndex="-1">
            Sua solicitação está organizada.
          </h2>
          <p>
            Revise os dados e prepare a mensagem. O horário só será confirmado
            pela equipe.
          </p>
          <dl className="booking-summary">
            {[
              [
                "Experiência",
                request.kind === "test-drive" ? "Test-drive" : "Visita à loja",
              ],
              [
                "Veículo",
                `${request.car.brand} ${request.car.name} · ${request.car.color}`,
              ],
              ["Unidade", request.unit],
              [
                "Preferência",
                `${request.date.split("-").reverse().join("/")} às ${request.time} · Natal/RN`,
              ],
              ["Contato", `${request.name} · ${request.phone}`],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="whatsapp-note">
            <b>WhatsApp da equipe: {dealership.whatsappDisplay}</b>
            <p>
              {hasWhatsApp(dealership.whatsapp)
                ? "Você finaliza o envio no WhatsApp e aguarda a confirmação da equipe."
                : "Número fictício. O envio pelo WhatsApp ainda não está ativo; nenhuma mensagem foi transmitida."}
            </p>
          </div>
          <label>
            Mensagem preparada
            <textarea
              className="prepared-message"
              value={bookingMessage(request)}
              readOnly
              rows="10"
            />
          </label>
          <div className="booking-actions">
            {hasWhatsApp(dealership.whatsapp) && (
              <a
                className="btn"
                href={`https://wa.me/${dealership.whatsapp}?text=${encodeURIComponent(bookingMessage(request))}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enviar pelo WhatsApp ↗
              </a>
            )}
            <button className="btn" onClick={copyMessage}>
              Copiar mensagem
            </button>
            <button className="btn outline" onClick={downloadCalendar}>
              Salvar preferência no calendário
            </button>
            <button
              className="btn outline"
              onClick={() => {
                setRequest(null);
                setCopyStatus("");
              }}
            >
              Alterar dados
            </button>
          </div>
          <p role="status">{copyStatus}</p>
          <p className="demo-note">
            Seus dados permanecem apenas nesta página enquanto ela está aberta.
            O arquivo de calendário é um lembrete de preferência, não uma
            confirmação de agendamento.
          </p>
        </section>
      ) : (
        <div className="booking-layout">
          <form className="panel booking-form" onSubmit={submit}>
            <h2 ref={heading} tabIndex="-1">
              Como podemos receber você?
            </h2>
            <label>
              Veículo
              <select
                required
                value={form.vehicle}
                onChange={(e) => update("vehicle", e.target.value)}
              >
                <option value="">Selecione um veículo</option>
                {cars.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.brand} {c.name} · {c.color} · #{c.id}
                  </option>
                ))}
              </select>
            </label>
            <div className="form-row">
              <label>
                Experiência
                <select
                  value={form.kind}
                  onChange={(e) => update("kind", e.target.value)}
                >
                  <option value="visita">Visita à loja</option>
                  <option value="test-drive">Test-drive</option>
                </select>
              </label>
              <label>
                Unidade
                <select
                  value={form.unit}
                  onChange={(e) => update("unit", e.target.value)}
                >
                  <option>{dealership.unit}</option>
                </select>
              </label>
            </div>
            <div className="form-row">
              <label>
                Dia da visita
                <input
                  type="date"
                  required
                  min={siteToday().date}
                  max={bookingDateLimit()}
                  value={form.date}
                  onInput={(e) => update("date", e.currentTarget.value)}
                  onChange={(e) => update("date", e.target.value)}
                  aria-describedby="booking-hours"
                />
              </label>
              <label>
                Horário de preferência
                <select
                  required
                  value={form.time}
                  disabled={!slots.length}
                  onChange={(e) => update("time", e.target.value)}
                >
                  <option value="">Selecione um horário</option>
                  {slots.map((time) => (
                    <option key={time}>{time}</option>
                  ))}
                </select>
              </label>
            </div>
            <p id="booking-hours" className="demo-note">
              Horário local de Natal/RN. Segunda a sexta e sábado pela manhã.
              Escolha uma data nos próximos 30 dias.{" "}
              {form.date && !slots.length
                ? "Não há horários de referência para este dia. Escolha outra data."
                : ""}
            </p>
            <label>
              Nome completo
              <input
                required
                minLength="3"
                maxLength="80"
                autoComplete="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </label>
            <div className="form-row">
              <label>
                Telefone com DDD
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  maxLength="20"
                  placeholder="(84) 99999-9999"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </label>
              <label>
                E-mail
                <input
                  required
                  type="email"
                  autoComplete="email"
                  maxLength="120"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </label>
            </div>
            <label>
              Observações (opcional)
              <textarea
                rows="3"
                maxLength="500"
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Conte algo que devemos considerar na visita."
              />
            </label>
            <label className="check">
              <input
                type="checkbox"
                required
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
              />{" "}
              Entendo que este pedido é demonstrativo e depende de confirmação
              da equipe.
            </label>
            {error && (
              <p className="booking-error" role="alert">
                {error}
              </p>
            )}
            <button className="btn">Revisar solicitação ↗</button>
            <p className="demo-note">
              Para test-drive, confirme com a equipe os documentos necessários e
              as condições de realização. Unidade e disponibilidade são
              demonstrativas.
            </p>
          </form>
          <aside className="booking-preview">
            {car ? (
              <>
                <img
                  src={car.image}
                  alt={"Imagem ilustrativa de " + car.brand + " " + car.name}
                />
                <div>
                  <span className="inst-tag">SUA PRÓXIMA ESCOLHA</span>
                  <h2>
                    {car.brand} {car.name}
                  </h2>
                  <p>
                    {car.version} · {car.color}
                  </p>
                  <strong>{money(car.price)}</strong>
                  <Link to={"/carros/" + car.id}>Ver galeria e detalhes →</Link>
                </div>
              </>
            ) : (
              <div>
                <span className="inst-tag">DO ONLINE AO PRESENCIAL</span>
                <h2>Conheça seu próximo carro de perto.</h2>
                <p>
                  Selecione um veículo para organizar uma visita com todas as
                  informações à mão.
                </p>
              </div>
            )}
            <ol>
              <li>Escolha carro e experiência.</li>
              <li>Informe sua preferência de horário.</li>
              <li>Revise e prepare a mensagem.</li>
              <li>Aguarde confirmação da equipe.</li>
            </ol>
          </aside>
        </div>
      )}
    </Page>
  );
}
