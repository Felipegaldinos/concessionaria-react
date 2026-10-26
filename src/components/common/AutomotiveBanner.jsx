import React from "react";
import { useLocation } from "react-router-dom";
import AutoIcon from "./AutoIcon.jsx";

const scenes = {
  "/estrutura": "/images/estrutura/showroom.png",
  "/equipe": "/images/institucional/equipe-grupo.jpg",
  "/quem-somos": "/images/institucional/sobre-historia.jpg",
  "/servicos": "/images/estrutura/avaliacao.png",
  "/lojas": "/images/institucional/loja-fachada.jpg",
  "/troca": "/images/institucional/troca-atendimento.jpg",
  "/agendar": "/images/estrutura/entrega.png",
  "/contato": "/images/estrutura/recepcao.png",
  "/financiamento": "/images/institucional/servicos-roda.jpg",
  "/ajuda": "/images/institucional/home-consultoria.jpg",
  "/encontre-meu-carro": "/images/estoque/veiculo-19.jpg",
  "/comparar": "/images/estrutura/showroom.png",
  "/carros": "/images/estrutura/showroom.png",
  "/favoritos": "/images/estrutura/entrega.png",
};
export default function AutomotiveBanner({
  title,
  subtitle,
  institutional = false,
}) {
  const { pathname } = useLocation();
  const image = scenes[pathname] || "/images/institucional/home-hero.jpg";
  return (
    <div
      className="inst-page-heading automotive-banner"
      style={{ "--automotive-image": `url("${image}")` }}
    >
      <div className="automotive-banner-copy">
        <span className="inst-tag">
          <AutoIcon type="gauge" />
          {institutional
            ? "CONHEÇA A VÉRTICE"
            : "VÉRTICE MOTORS · SEU PRÓXIMO CAMINHO"}
        </span>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
}
