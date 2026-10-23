import CompareBar from "../catalog/CompareBar";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import RouteEffects from "./RouteEffects";
export default function SiteLayout() {
  return (
    <>
      <RouteEffects />
      <Header />
      <main>
        <Outlet />
      </main>
      <CompareBar />
      <Footer />
    </>
  );
}
