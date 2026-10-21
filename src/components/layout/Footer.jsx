import Logo from "./Logo";
import React from "react";
import { Link } from "react-router-dom";
import { services } from "../../data/institutional.js";

export default function Footer({}) {
  const columns = [
    [
      ["Financiamento", "/financiamento"],
      ["Carro na troca", "/troca"],
      ["Estoque de seminovos", "/carros"],
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
          <div>
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
              {col.map(([t, url]) => (
                <Link key={url} to={url}>
                  ⊙　{t}
                </Link>
              ))}
            </div>
          ))}
          <div>
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
          <span>Fotografias ilustrativas: Unsplash</span>
        </div>
      </div>
    </footer>
  );
}
