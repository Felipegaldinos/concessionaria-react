import { vehicles } from "../data";
export const cars = Array.from({ length: 36 }, (_, i) => ({
  ...vehicles[i % vehicles.length],
  id: i + 1,
  km: vehicles[i % vehicles.length].km + i * 237,
  price:
    vehicles[i % vehicles.length].price +
    Math.floor(i / vehicles.length) * 1000,
  offer: i % 5 === 0,
}));
