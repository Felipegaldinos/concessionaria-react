import { useEffect } from "react";
import { useLocation, matchRoutes } from "react-router-dom";
import { routeDefinitions } from "../../routes/definitions";
export default function RouteEffects() {
  const location = useLocation();
  useEffect(() => {
    const matches = matchRoutes(routeDefinitions, location);
    const title = matches?.at(-1)?.route.title || "Página não encontrada";
    document.title = title + " | Vértice Motors";
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);
  return null;
}
