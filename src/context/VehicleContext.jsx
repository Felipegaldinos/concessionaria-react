import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
const VehicleContext = createContext(null);
const STORAGE_KEY = "vertice-favorites";
function readFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved)
      ? [...new Set(saved.filter(Number.isInteger))]
      : [];
  } catch {
    return [];
  }
}
export function VehicleProvider({ children }) {
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState(readFavorites);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      /* Browsers may block storage; favorites still work in memory. */
    }
  }, [favorites]);
  const toggleFavorite = useCallback(
    (id) =>
      setFavorites((previous) =>
        previous.includes(id)
          ? previous.filter((value) => value !== id)
          : [...previous, id],
      ),
    [],
  );
  return (
    <VehicleContext.Provider
      value={{ query, setQuery, favorites, toggleFavorite }}
    >
      {children}
    </VehicleContext.Provider>
  );
}
export function useVehicleContext() {
  const context = useContext(VehicleContext);
  if (!context)
    throw new Error("useVehicleContext must be used within VehicleProvider");
  return context;
}
