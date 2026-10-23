import React from "react";
import { Link } from "react-router-dom";
import { useVehicleContext } from "../../context/VehicleContext";
export default function CompareBar() {
  const { comparison, clearComparison } = useVehicleContext();
  if (!comparison.length) return null;
  return (
    <aside className="compare-bar" aria-label="Comparação de veículos">
      <div>
        <b>{comparison.length} de 3 veículos</b>
        <span>Compare sua próxima escolha.</span>
      </div>
      <button onClick={clearComparison}>Limpar</button>
      <Link className="btn" to="/comparar">
        Comparar agora ↗
      </Link>
    </aside>
  );
}
