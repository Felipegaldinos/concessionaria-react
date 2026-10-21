import React from "react";
import { Routes, Route } from "react-router-dom";
import SiteLayout from "../components/layout/SiteLayout";
import { routeDefinitions } from "./definitions";
import Home from "../pages/HomePage";
import Catalog from "../pages/CatalogPage";
import Vehicle from "../pages/VehiclePage";
import Finance from "../pages/FinancePage";
import Trade from "../pages/TradePage";
import About from "../pages/AboutPage";
import Team from "../pages/TeamPage";
import Structure from "../pages/StructurePage";
import Services from "../pages/ServicesPage";
import Stores from "../pages/StoresPage";
import Help from "../pages/HelpPage";
import Contact from "../pages/ContactPage";
import Privacy from "../pages/PrivacyPage";
import NotFound from "../pages/NotFoundPage";
const pages = {
  Home,
  Catalog,
  Vehicle,
  Finance,
  Trade,
  About,
  Team,
  Structure,
  Services,
  Stores,
  Help,
  Contact,
  Privacy,
  NotFound,
};
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        {routeDefinitions.map(({ path, page }) => {
          const Component = pages[page];
          return (
            <Route
              key={path}
              path={path}
              element={
                <Component
                  key={path}
                  {...(path === "/favoritos" ? { favoritesOnly: true } : {})}
                />
              }
            />
          );
        })}
      </Route>
    </Routes>
  );
}
