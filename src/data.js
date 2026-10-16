export const vehicles = [
  {
    id: 1,
    brand: "Volkswagen",
    name: "T-Cross",
    version: "200 TSI Comfortline",
    year: 2024,
    km: 28400,
    price: 119900,
    type: "SUV",
    gear: "Automático",
    image: "photo-1533473359331-0135ef1b58bf",
    badge: "Destaque",
  },
  {
    id: 2,
    brand: "Honda",
    name: "Civic",
    version: "Touring 1.5 Turbo",
    year: 2022,
    km: 36200,
    price: 145900,
    type: "Sedã",
    gear: "Automático",
    image: "photo-1533106418989-88406c7cc8ca",
    badge: "Oportunidade",
  },
  {
    id: 3,
    brand: "Chevrolet",
    name: "Onix",
    version: "LT 1.0 Flex",
    year: 2024,
    km: 19800,
    price: 78900,
    type: "Hatch",
    gear: "Manual",
    image: "photo-1549317661-bd32c8ce0db2",
  },
  {
    id: 4,
    brand: "Toyota",
    name: "Corolla",
    version: "XEi 2.0 Flex",
    year: 2023,
    km: 31500,
    price: 137900,
    type: "Sedã",
    gear: "Automático",
    image: "photo-1621007947382-bb3c3994e3fb",
  },
  {
    id: 5,
    brand: "Jeep",
    name: "Compass",
    version: "Longitude T270",
    year: 2023,
    km: 42000,
    price: 149900,
    type: "SUV",
    gear: "Automático",
    image: "photo-1533558701576-23c65e0272fb",
    badge: "Selecionado",
  },
  {
    id: 6,
    brand: "Fiat",
    name: "Argo",
    version: "Drive 1.0 Flex",
    year: 2024,
    km: 22100,
    price: 72900,
    type: "Hatch",
    gear: "Manual",
    image: "photo-1503376780353-7e6692767b70",
  },
];
export const photo = (id, width = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
export const money = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
export function installment(price, down, months, rate = 0.0179) {
  const principal = Math.max(0, price - down);
  return (principal * rate) / (1 - Math.pow(1 + rate, -months));
}
