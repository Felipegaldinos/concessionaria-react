export function recommendVehicles(cars, answers) {
  return cars
    .filter(
      (car) =>
        car.price <= Number(answers.budget) &&
        (answers.gear === "any" || car.gear === answers.gear),
    )
    .map((car) => {
      let score = 0;
      const reasons = [
        `Dentro do orçamento máximo informado: R$ ${Number(answers.budget).toLocaleString("pt-BR")}.`,
      ];
      if (answers.use === "city" && car.type === "Hatch") {
        score += 45;
        reasons.push("Carroceria compacta para a rotina na cidade.");
      }
      if (answers.use === "family" && car.type === "SUV") {
        score += 45;
        reasons.push("Perfil SUV alinhado ao uso em família.");
      }
      if (answers.use === "road" && car.type === "Sedã") {
        score += 45;
        reasons.push("Perfil sedã alinhado à preferência por viagens.");
      }
      if (answers.space === "spacious" && ["SUV", "Sedã"].includes(car.type)) {
        score += 25;
        reasons.push("Categoria alinhada à sua preferência por mais espaço.");
      }
      if (answers.space === "compact" && car.type === "Hatch") {
        score += 25;
        reasons.push("Uma opção compacta, como você prefere.");
      }
      if (answers.gear !== "any") {
        score += 15;
        reasons.push(`Câmbio ${car.gear.toLowerCase()}, conforme sua escolha.`);
      }
      score += Math.max(0, 10 * (1 - car.price / Number(answers.budget)));
      return { car, score, reasons };
    })
    .sort(
      (a, b) =>
        b.score - a.score || a.car.price - b.car.price || a.car.id - b.car.id,
    )
    .slice(0, 3);
}
