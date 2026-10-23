import { vehicles } from "../data";
export const cars = Array.from({ length: 36 }, (_, i) => ({
  ...vehicles[i % vehicles.length],
  id: i + 1,
  color: [
    "Branco pérola",
    "Prata metálico",
    "Cinza grafite",
    "Azul profundo",
    "Preto",
    "Vermelho vinho",
  ][Math.floor(i / vehicles.length)],
  image: `/images/estoque/veiculo-${String(i + 1).padStart(2, "0")}.jpg`,
  km: vehicles[i % vehicles.length].km + i * 237,
  price:
    vehicles[i % vehicles.length].price +
    Math.floor(i / vehicles.length) * 1000,
  offer: i % 5 === 0,
}));

for (const car of cars) {
  const code = String(car.id).padStart(2, "0");
  car.gallery = [
    {
      src: car.image,
      label: "Exterior dianteiro",
      alt: `Vista dianteira ilustrativa do ${car.brand} ${car.name}, ${car.color}`,
    },
    {
      src: `/images/galeria/veiculo-${code}-rear.jpg`,
      label: "Exterior traseiro",
      alt: `Vista traseira ilustrativa do ${car.brand} ${car.name}, ${car.color}`,
    },
    {
      src: `/images/galeria/veiculo-${code}-interior.jpg`,
      label: "Interior",
      alt: `Interior ilustrativo do ${car.brand} ${car.name}`,
    },
  ];
  car.condition = [
    {
      area: "Carroceria e pintura",
      note:
        car.id % 3 === 0
          ? "Exemplo: pequenas marcas superficiais de uso, a confirmar em inspeção."
          : "Exemplo de avaliação: conferir pintura, alinhamento e eventuais reparos.",
    },
    {
      area: "Bancos e acabamento",
      note:
        car.id % 2 === 0
          ? "Exemplo: leves sinais de uso no revestimento, a confirmar presencialmente."
          : "Exemplo de avaliação: conferir revestimentos, costuras e acabamento.",
    },
    {
      area: "Histórico e documentação",
      note: "Informações reais de manutenção, revisões e documentação devem ser apresentadas pela equipe.",
    },
  ];
}
