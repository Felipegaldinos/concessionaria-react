import Logo from "./Logo";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer({}) {
  const columns = [
    [
      ["Financiamento", "/financiamento"],
      ["Carro na troca", "/troca"],
      ["Estoque de seminovos", "/carros"],
      ["Encontre meu carro", "/encontre-meu-carro"],
      ["Agendar visita", "/agendar"],
      ["Favoritos", "/favoritos"],
    ],
    [
      ["Início", "/"],
      ["Quem somos", "/quem-somos"],
      ["Nossa equipe", "/equipe"],
      ["Nossa estrutura", "/estrutura"],
      ["Serviços e suporte", "/servicos"],
      ["Nossas lojas", "/lojas"],
      ["Dúvidas frequentes", "/ajuda"],
      ["Contato", "/contato"],
    ],
  ];
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p>
              Vértice Motors
              <br />
              Seu próximo caminho começa aqui.
            </p>
            <small>Marca fictícia · Site demonstrativo</small>
          </div>
          {columns.map((col, i) => (
            <div className="footer-links" key={i}>
              <h3 className="footer-mobile-title">
                {i === 0 ? "Seu próximo carro" : "Conheça a Vértice"}
              </h3>
              {col.map(([t, url]) => (
                <Link key={url} to={url}>
                  <span className="footer-link-icon" aria-hidden="true">
                    ⊙　
                  </span>
                  {t}
                </Link>
              ))}
            </div>
          ))}
          <div className="footer-support">
            <h3>CENTRAL DE ATENDIMENTO</h3>
            <p>Segunda a sexta, 8h às 18h</p>
            <Link className="footer-contact" to="/contato">
              Fale com nossa equipe →
            </Link>
            <small>Canais em demonstração</small>
          </div>
        </div>
        <div className="footer-services">
          <span>
            VÉRTICE <b>Seminovos</b>
          </span>
          <span>Compra de veículos</span>
          <span>Seu usado na troca</span>
          <span>Financiamento</span>
          <span>Atendimento próximo</span>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Vértice Motors. Projeto demonstrativo.
          </span>
          <Link to="/privacidade">Privacidade e dados</Link>
          <span>Imagens ilustrativas geradas por IA</span>
        </div>
      </div>
    </footer>
  );
}
