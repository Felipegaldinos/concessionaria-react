import assert from "node:assert/strict";
import { test } from "node:test";
import { recommendVehicles } from "../src/utils/recommendations.js";
import {
  bookingSlots,
  bookingDateLimit,
  siteToday,
  bookingMessage,
  bookingCalendar,
} from "../src/utils/booking.js";
const cars = [
  {
    id: 1,
    brand: "A",
    name: "Hatch",
    color: "Branco",
    price: 70000,
    type: "Hatch",
    gear: "Manual",
  },
  { id: 2, price: 90000, type: "SUV", gear: "Automático" },
  { id: 3, price: 110000, type: "Sedã", gear: "Automático" },
  { id: 4, price: 95000, type: "Hatch", gear: "Automático" },
];
test("Assistente respeita orçamento e câmbio, limita a três e explica os resultados", () => {
  const results = recommendVehicles(cars, {
    budget: 100000,
    gear: "Automático",
    use: "city",
    space: "compact",
  });
  assert.equal(results[0].car.id, 4);
  assert.ok(results.length <= 3);
  assert.ok(
    results.every(
      (r) =>
        r.car.price <= 100000 &&
        r.car.gear === "Automático" &&
        r.reasons.length >= 2,
    ),
  );
  assert.equal(new Set(results.map((r) => r.car.id)).size, results.length);
});
test("Assistente não inventa sugestões quando nenhum veículo atende", () => {
  assert.deepEqual(
    recommendVehicles(cars, {
      budget: 50000,
      gear: "any",
      use: "family",
      space: "spacious",
    }),
    [],
  );
});
test("Preferência familiar favorece SUV dentro do orçamento", () => {
  assert.equal(
    recommendVehicles(cars, {
      budget: 120000,
      gear: "any",
      use: "family",
      space: "spacious",
    })[0].car.type,
    "SUV",
  );
});
const now = new Date("2026-10-23T12:00:00Z");
test("Agenda usa Natal e permite antecedência mínima de uma hora", () => {
  assert.deepEqual(siteToday(now), { date: "2026-10-23", minutes: 540 });
  const slots = bookingSlots("2026-10-23", now);
  assert.ok(!slots.includes("09:00"));
  assert.ok(slots.includes("10:00"));
});
test("Agenda recusa passado, domingos, datas inválidas e além de 30 dias", () => {
  for (const day of [
    "2026-10-22",
    "2026-10-25",
    "2026-02-30",
    "invalid",
    "2026-11-23",
  ])
    assert.deepEqual(bookingSlots(day, now), []);
  assert.equal(bookingDateLimit(now), "2026-11-22");
});
test("Sábado oferece somente horários da manhã", () => {
  assert.deepEqual(bookingSlots("2026-10-24", now), [
    "09:00",
    "10:00",
    "11:00",
  ]);
});
test("Virada de dia UTC não muda o dia local antes da meia-noite em Natal", () => {
  assert.equal(siteToday(new Date("2026-10-24T01:00:00Z")).date, "2026-10-23");
});
const booking = {
  car: cars[0],
  kind: "test-drive",
  date: "2026-10-24",
  time: "10:00",
  unit: "Unidade demonstrativa",
  name: "Pessoa de Teste",
  phone: "84999999999",
  email: "teste@example.com",
  notes: "Dúvidas sobre espaço.",
};
test("Mensagem identifica carro, unidade, horário e contato sem confirmar disponibilidade", () => {
  const text = bookingMessage(booking);
  for (const expected of [
    "test-drive",
    "A Hatch",
    "24/10/2026",
    "10:00",
    "Unidade demonstrativa",
    "Pessoa de Teste",
    "84999999999",
    "Aguardo confirmação",
  ])
    assert.ok(text.includes(expected));
});
test("Lembrete de calendário é provisório e converte horário local para UTC", () => {
  const text = bookingCalendar(booking);
  assert.match(text, /DTSTART:20261024T130000Z/);
  assert.match(text, /DTEND:20261024T140000Z/);
  assert.match(text, /STATUS:TENTATIVE/);
  assert.ok(!text.includes(booking.phone));
  assert.ok(text.includes("\r\n"));
});
