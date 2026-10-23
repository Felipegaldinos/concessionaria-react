const teamNumber = (import.meta.env.VITE_TEAM_WHATSAPP || "").replace(
  /\D/g,
  "",
);
export const dealership = {
  unit: "Vértice Motors Natal — unidade demonstrativa",
  whatsappDisplay: hasWhatsApp(teamNumber)
    ? `+55 (${teamNumber.slice(2, 4)}) ${teamNumber.slice(4, -4)}-${teamNumber.slice(-4)}`
    : "(84) 00000-0000",
  whatsapp: (import.meta.env.VITE_TEAM_WHATSAPP || "").replace(/\D/g, ""),
};
export function hasWhatsApp(phone) {
  return /^55[1-9]\d{9,10}$/.test(phone) && !/0{8}/.test(phone);
}
