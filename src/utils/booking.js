export function siteToday(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Fortaleza",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  );
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
  };
}
export function bookingDateLimit(now = new Date()) {
  const { date } = siteToday(now);
  return new Date(Date.parse(date + "T12:00:00Z") + 30 * 86400000)
    .toISOString()
    .slice(0, 10);
}
export function bookingSlots(date, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];
  const day = new Date(date + "T12:00:00Z");
  if (Number.isNaN(day.getTime()) || day.toISOString().slice(0, 10) !== date)
    return [];
  const today = siteToday(now);
  if (
    date < today.date ||
    date > bookingDateLimit(now) ||
    day.getUTCDay() === 0
  )
    return [];
  const slots =
    day.getUTCDay() === 6
      ? ["09:00", "10:00", "11:00"]
      : ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
  return slots.filter(
    (time) =>
      date !== today.date ||
      Number(time.slice(0, 2)) * 60 + Number(time.slice(3)) >=
        today.minutes + 60,
  );
}
export function bookingMessage(b) {
  return `Olá, equipe Vértice Motors!\nGostaria de solicitar ${b.kind === "test-drive" ? "um test-drive" : "uma visita"}.\nVeículo: ${b.car.brand} ${b.car.name} (${b.car.color}), código ${b.car.id}.\nUnidade: ${b.unit}.\nPreferência: ${b.date.split("-").reverse().join("/")} às ${b.time} (Natal/RN).\nNome: ${b.name}\nContato: ${b.phone}\nE-mail: ${b.email}\nObservações: ${b.notes || "Sem observações."}\nAguardo confirmação da equipe sobre horário e disponibilidade.`;
}
const escapeICS = (text) =>
  String(text)
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
export function bookingCalendar(b) {
  const start = new Date(`${b.date}T${b.time}:00-03:00`);
  if (Number.isNaN(start.getTime())) throw Error("Data inválida");
  const format = (date) =>
    date
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Vertice Motors//Agendamento Demonstrativo//PT-BR",
    "BEGIN:VEVENT",
    `UID:vertice-${b.car.id}-${format(start)}@demo.invalid`,
    `DTSTAMP:${format(new Date())}`,
    `DTSTART:${format(start)}`,
    `DTEND:${format(new Date(start.getTime() + 3600000))}`,
    `SUMMARY:${escapeICS("Preferência de " + (b.kind === "test-drive" ? "test-drive" : "visita") + " - " + b.car.brand + " " + b.car.name)}`,
    `LOCATION:${escapeICS(b.unit)}`,
    "DESCRIPTION:Pedido demonstrativo. Horario e disponibilidade sujeitos a confirmacao da equipe.",
    "STATUS:TENTATIVE",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}
