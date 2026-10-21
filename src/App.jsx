import React from "react";
import { VehicleProvider } from "./context/VehicleContext";
import AppRoutes from "./routes/AppRoutes";
export default function App() {
  return (
    <VehicleProvider>
      <AppRoutes />
    </VehicleProvider>
  );
}
