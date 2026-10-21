import React from "react";
import { Link } from "react-router-dom";
import Page from "../components/common/Page";
export default function NotFoundPage() {
  return (
    <Page title="Página não encontrada">
      <Link className="btn" to="/carros">
        Voltar ao estoque
      </Link>
    </Page>
  );
}
