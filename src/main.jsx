import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { vehicles as originals, photo, money, installment } from "./data";
import "./styles.css";
const cars = Array.from({ length: 36 }, (_, i) => ({
  ...originals[i % 6],
  id: i + 1,
  km: originals[i % 6].km + i * 237,
  price: originals[i % 6].price + Math.floor(i / 6) * 1000,
  offer: i % 5 === 0,
}));
function App() {
  const [path, setPath] = useState(location.pathname);
  const [query, setQuery] = useState("");
  const [favs, setFavs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("vertice-favorites") || "[]");
    } catch {
      return [];
    }
  });
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const change = () => {
      setPath(location.pathname);
      setMenu(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", change);
    return () => window.removeEventListener("popstate", change);
  }, []);
  useEffect(() => {
    localStorage.setItem("vertice-favorites", JSON.stringify(favs));
  }, [favs]);
  const go = (url) => {
    history.pushState({}, "", url);
    setPath(url.split("?")[0]);
    setMenu(false);
    window.scrollTo(0, 0);
  };
  const link = (url) => (e) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
      e.preventDefault();
      go(url);
    }
  };
  const toggle = (id) =>
    setFavs(favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id]);
  const nav = [
    ["Comprar", "/carros"],
    ["Financiamento", "/financiamento"],
    ["Carro na troca", "/troca"],
    ["Quem somos", "/quem-somos"],
    ["Nossas lojas", "/lojas"],
    ["Ajuda", "/ajuda"],
  ];
  return (
    <>
      <header className="header">
        <div className="header-inner">
          <a className="logo" href="/" onClick={link("/")}>
            <span className="brand-symbol">
              v<span>↗</span>
            </span>
            <span>
              vértice<b>motors</b>
            </span>
          </a>
          <form
            className="header-search"
            onSubmit={(e) => {
              e.preventDefault();
              go("/carros");
            }}
          >
            <input
              aria-label="Pesquise por marca ou modelo"
              placeholder="Pesquise por marca ou modelo"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="city">⌖ NATAL - RN</span>
            <button aria-label="Buscar veículos">⌕</button>
          </form>
          <button
            className="hamburger"
            onClick={() => setMenu(!menu)}
            aria-expanded={menu}
            aria-label="Abrir menu"
          >
            ☰
          </button>
          <nav className={menu ? "open" : ""}>
            {nav.map(([label, url]) => (
              <a
                key={url}
                className={path === url ? "current" : ""}
                href={url}
                onClick={link(url)}
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            className="favorites-link"
            aria-label={`Favoritos: ${favs.length}`}
            href="/favoritos"
            onClick={link("/favoritos")}
          >
            ♡{favs.length > 0 && <sup>{favs.length}</sup>}
          </a>
        </div>
      </header>
      <main>
        {path === "/" || path === "/carros" || path === "/favoritos" ? (
          <Catalog
            key={path}
            {...{ query, setQuery, favs, toggle, link, go }}
            favoritesOnly={path === "/favoritos"}
          />
        ) : path.startsWith("/carros/") ? (
          <Detail
            car={cars.find((c) => c.id === Number(path.split("/")[2]))}
            {...{ link, toggle, favs }}
          />
        ) : path === "/financiamento" ? (
          <Finance />
        ) : path === "/troca" ? (
          <Trade />
        ) : path === "/quem-somos" ? (
          <About link={link} />
        ) : path === "/lojas" ? (
          <Stores />
        ) : path === "/ajuda" ? (
          <Help />
        ) : path === "/contato" ? (
          <Contact />
        ) : path === "/privacidade" ? (
          <Page title="Privacidade e dados">
            <p>
              Este é um site demonstrativo. Os formulários não transmitem dados.
              Seus favoritos são guardados somente neste navegador e podem ser
              removidos individualmente na página de favoritos.
            </p>
            <p>
              Imagens e fontes externas podem receber dados técnicos da conexão.
              Antes de uma operação real, esta política deverá ser adaptada ao
              tratamento efetivo de dados.
            </p>
          </Page>
        ) : (
          <Page title="Página não encontrada">
            <a className="btn" href="/carros" onClick={link("/carros")}>
              Voltar ao estoque
            </a>
          </Page>
        )}
      </main>
      <Footer link={link} />
    </>
  );
}
function Catalog({ query, setQuery, favs, toggle, link, go, favoritesOnly }) {
  const [brand, setBrand] = useState(""),
    [type, setType] = useState(""),
    [max, setMax] = useState(""),
    [year, setYear] = useState(""),
    [km, setKm] = useState(""),
    [gear, setGear] = useState(""),
    [offer, setOffer] = useState(false),
    [sort, setSort] = useState("default"),
    [page, setPage] = useState(1),
    [filters, setFilters] = useState(false);
  useEffect(() => setPage(1), [query, brand, type, max, year, km, gear, offer]);
  const reset = () => {
    setQuery("");
    setBrand("");
    setType("");
    setMax("");
    setYear("");
    setKm("");
    setGear("");
    setOffer(false);
    setPage(1);
  };
  const found = cars
    .filter(
      (c) =>
        (!favoritesOnly || favs.includes(c.id)) &&
        `${c.brand} ${c.name}`.toLowerCase().includes(query.toLowerCase()) &&
        (!brand || brand === c.brand) &&
        (!type || type === c.type) &&
        (!max || c.price <= +max) &&
        (!year || c.year >= +year) &&
        (!km || c.km <= +km) &&
        (!gear || c.gear === gear) &&
        (!offer || c.offer),
    )
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : sort === "km"
            ? a.km - b.km
            : a.id - b.id,
    );
  const pages = Math.max(1, Math.ceil(found.length / 18));
  const activePage = Math.min(page, pages);
  const current = found.slice((activePage - 1) * 18, activePage * 18);
  return (
    <div className="container catalog">
      <Breadcrumb
        title={favoritesOnly ? "Favoritos" : "Carros usados / Natal"}
      />
      <h1>
        {favoritesOnly
          ? "Seus carros favoritos"
          : "Carros usados e seminovos para comprar em Natal e região"}
      </h1>
      <div className="catalog-layout">
        <aside className={"filters " + (filters ? "visible" : "")}>
          <div className="filters-title">
            <b>Filtros</b>
            <button onClick={reset}>Limpar</button>
          </div>
          <div className="location-filter">
            <b>Localização</b>
            <div>⌖ NATAL - RN</div>
            <p>
              Confira os carros disponíveis em nossa seleção demonstrativa de
              Natal.
            </p>
          </div>
          <label className="offer-toggle">
            <span>
              <b>✹ Carros em oferta</b>
              <small>Carros com desconto ilustrativo no preço final</small>
            </span>
            <input
              type="checkbox"
              checked={offer}
              onChange={(e) => setOffer(e.target.checked)}
            />
          </label>
          <Filter
            title="R$　Preço"
            value={max}
            set={setMax}
            options={[
              [80000, "Até R$ 80 mil"],
              [120000, "Até R$ 120 mil"],
              [150000, "Até R$ 150 mil"],
            ]}
          />
          <Filter
            title="▱　Carroceria"
            value={type}
            set={setType}
            options={["SUV", "Sedã", "Hatch"]}
          />
          <Filter
            title="▣　Marca e modelo"
            value={brand}
            set={setBrand}
            options={[...new Set(cars.map((c) => c.brand))]}
          />
          <Filter
            title="◉　Quilometragem"
            value={km}
            set={setKm}
            options={[
              [25000, "Até 25 mil km"],
              [40000, "Até 40 mil km"],
              [60000, "Até 60 mil km"],
            ]}
          />
          <Filter
            title="▦　Ano"
            value={year}
            set={setYear}
            options={[
              [2024, "A partir de 2024"],
              [2023, "A partir de 2023"],
              [2022, "A partir de 2022"],
            ]}
          />
          <Filter
            title="⚙　Câmbio"
            value={gear}
            set={setGear}
            options={["Manual", "Automático"]}
          />
          <a
            className="filter-contact"
            href="/contato"
            onClick={link("/contato")}
          >
            Precisa de ajuda? Fale com a gente →
          </a>
        </aside>
        <div className="inventory">
          <div className="inventory-toolbar">
            <span>
              <b>{found.length}</b> veículos
            </span>
            <button
              className="filter-mobile"
              onClick={() => setFilters(!filters)}
            >
              ☷ Filtros
            </button>
            <select
              aria-label="Ordenar veículos"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">☷ Mais relevantes</option>
              <option value="low">Menor preço</option>
              <option value="high">Maior preço</option>
              <option value="km">Menor quilometragem</option>
            </select>
          </div>
          <div className="car-grid">
            {current.map((c, i) => (
              <React.Fragment key={c.id}>
                <CarCard
                  car={c}
                  favorite={favs.includes(c.id)}
                  onFavorite={() => toggle(c.id)}
                  link={link}
                />
                {[3, 8, 13].includes(i) && (
                  <Promo
                    type={i === 8 ? "trade" : i === 13 ? "help" : "finance"}
                    link={link}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          {!found.length && (
            <div className="empty">
              <h2>Nenhum veículo encontrado</h2>
              <p>
                {favoritesOnly
                  ? "Toque no coração dos veículos para salvar suas escolhas."
                  : "Tente remover alguns filtros para ampliar sua busca."}
              </p>
              <button
                className="btn"
                onClick={favoritesOnly ? () => go("/carros") : reset}
              >
                {favoritesOnly ? "Explorar estoque" : "Limpar filtros"}
              </button>
            </div>
          )}
          <nav className="pagination" aria-label="Paginação do estoque">
            <button
              disabled={activePage === 1}
              onClick={() => {
                setPage(activePage - 1);
                window.scrollTo(0, 0);
              }}
              aria-label="Página anterior"
            >
              ‹
            </button>
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                aria-current={activePage === i + 1 ? "page" : undefined}
                className={activePage === i + 1 ? "active" : ""}
                onClick={() => {
                  setPage(i + 1);
                  window.scrollTo(0, 0);
                }}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={activePage === pages}
              onClick={() => {
                setPage(activePage + 1);
                window.scrollTo(0, 0);
              }}
              aria-label="Próxima página"
            >
              ›
            </button>
          </nav>
          <p className="result-count">
            Exibindo {found.length ? (activePage - 1) * 18 + 1 : 0}–
            {Math.min(activePage * 18, found.length)} de {found.length} veículos
          </p>
          <ContactBanner link={link} />
          <p className="demo-note">
            Estoque, preços e ofertas demonstrativos. Fotos ilustrativas não
            correspondem necessariamente aos modelos indicados.
          </p>
        </div>
      </div>
    </div>
  );
}
function Filter({ title, value, set, options }) {
  return (
    <details className="filter-group" open={value ? true : undefined}>
      <summary>
        {title}
        <span>{value ? "●" : "⌄"}</span>
      </summary>
      <select
        aria-label={title}
        value={value}
        onChange={(e) => set(e.target.value)}
      >
        <option value="">Todos</option>
        {options.map((o) => (
          <option
            key={Array.isArray(o) ? o[0] : o}
            value={Array.isArray(o) ? o[0] : o}
          >
            {Array.isArray(o) ? o[1] : o}
          </option>
        ))}
      </select>
    </details>
  );
}
function CarCard({ car: c, favorite, onFavorite, link }) {
  return (
    <article className="car-card">
      <div className="car-image">
        <a href={"/carros/" + c.id} onClick={link("/carros/" + c.id)}>
          <img
            src={photo(c.image, 650)}
            alt={`Imagem ilustrativa de ${c.brand} ${c.name}`}
            loading="lazy"
          />
        </a>
        {c.offer && <span className="offer-badge">Oferta</span>}
        <button
          className={"heart " + (favorite ? "saved" : "")}
          aria-label={`${favorite ? "Remover dos" : "Adicionar aos"} favoritos: ${c.name}`}
          aria-pressed={favorite}
          onClick={onFavorite}
        >
          {favorite ? "♥" : "♡"}
        </button>
      </div>
      <a
        className="car-info"
        href={"/carros/" + c.id}
        onClick={link("/carros/" + c.id)}
      >
        <h2>
          {c.brand} {c.name}
        </h2>
        <p className="version">{c.version}</p>
        <div className="specs">
          <span>{c.km.toLocaleString("pt-BR")} km</span>
          <span>
            {c.year}/{c.year + 1}
          </span>
          <span>{c.gear}</span>
        </div>
        {c.offer && <del>{money(c.price + 4000)}</del>}
        <strong className={c.offer ? "offer-price" : ""}>
          {money(c.price)} {c.offer && <small>✹</small>}
        </strong>
      </a>
      <div className="car-location">
        ⌖ NATAL/RN <span>Foto ilustrativa</span>
      </div>
    </article>
  );
}
function Promo({ type, link }) {
  const content =
    type === "trade"
      ? [
          "↔",
          "Seu usado pode fazer parte da sua próxima conquista",
          "Conheça nossa avaliação de veículos.",
          "Solicitar avaliação",
          "/troca",
        ]
      : type === "help"
        ? [
            "☏",
            "Precisa de ajuda para encontrar seu carro?",
            "Nossa equipe ajuda você a escolher.",
            "Quero ajuda",
            "/ajuda",
          ]
        : [
            "72×",
            "Planeje seu financiamento online",
            "Simule as parcelas e conheça os próximos passos.",
            "Simular financiamento",
            "/financiamento",
          ];
  return (
    <article className={"promo " + type}>
      <div className="promo-art">
        <span>{content[0]}</span>
        <img
          loading="lazy"
          src={photo("photo-1503376780353-7e6692767b70", 500)}
          alt="Automóvel ilustrativo"
        />
      </div>
      <h2>{content[1]}</h2>
      <p>{content[2]}</p>
      <a className="btn" href={content[4]} onClick={link(content[4])}>
        {content[3]}
      </a>
    </article>
  );
}
function Breadcrumb({ title }) {
  return <div className="breadcrumb">Home / {title}</div>;
}
function Page({ title, children, subtitle }) {
  return (
    <div className="container inner-page">
      <Breadcrumb title={title} />
      <h1>{title}</h1>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
      {children}
    </div>
  );
}
function Detail({ car: c, link, toggle, favs }) {
  if (!c)
    return (
      <Page title="Veículo não encontrado">
        <a href="/carros" onClick={link("/carros")}>
          Voltar ao estoque
        </a>
      </Page>
    );
  return (
    <Page title={`${c.brand} ${c.name}`} subtitle={c.version}>
      <div className="detail-layout">
        <div>
          <img
            className="detail-image"
            src={photo(c.image, 1400)}
            alt="Foto ilustrativa do veículo"
          />
          <p className="demo-note">
            Foto ilustrativa. O veículo e sua disponibilidade são
            demonstrativos.
          </p>
          <h2>Conheça este veículo</h2>
          <div className="detail-specs">
            {[
              ["Ano", c.year],
              ["Quilometragem", c.km.toLocaleString("pt-BR") + " km"],
              ["Câmbio", c.gear],
              ["Carroceria", c.type],
              ["Localização", "Natal / RN"],
            ].map(([k, v]) => (
              <div key={k}>
                <small>{k}</small>
                <b>{v}</b>
              </div>
            ))}
          </div>
          <h2>Uma escolha com mais tranquilidade</h2>
          <p>
            Solicite informações sobre histórico, revisão e documentação antes
            da compra. Agende uma visita para conhecer as características do
            veículo.
          </p>
        </div>
        <aside className="detail-panel">
          <span>Valor demonstrativo</span>
          <h2>{money(c.price)}</h2>
          <a
            className="btn"
            href={"/contato?veiculo=" + c.id}
            onClick={link("/contato?veiculo=" + c.id)}
          >
            Tenho interesse
          </a>
          <a
            className="btn outline"
            href="/financiamento"
            onClick={link("/financiamento")}
          >
            Simular financiamento
          </a>
          <button className="text-button" onClick={() => toggle(c.id)}>
            {favs.includes(c.id)
              ? "♥ Salvo nos favoritos"
              : "♡ Salvar nos favoritos"}
          </button>
          <p>⌖ Natal / RN</p>
          <small>Valores e condições ilustrativos, sem oferta comercial.</small>
        </aside>
      </div>
    </Page>
  );
}
function Finance() {
  const [price, P] = useState(100000),
    [down, D] = useState(30000),
    [months, M] = useState(48);
  return (
    <Page
      title="Financiamento de veículos"
      subtitle="Simule uma possibilidade para o seu próximo carro."
    >
      <div className="institution-grid">
        <div className="green-panel">
          <span className="eyebrow">DO SEU JEITO</span>
          <h2>
            Seu próximo carro,
            <br />
            com planejamento.
          </h2>
          <p>
            Compare entrada e prazo para entender o impacto no valor das
            parcelas.
          </p>
          <ol>
            <li>Escolha o valor do veículo.</li>
            <li>Informe a entrada e o prazo.</li>
            <li>Converse com nossa equipe.</li>
          </ol>
        </div>
        <div className="panel">
          <h2>Faça sua simulação</h2>
          <label>
            Valor do veículo (R$)
            <input
              type="number"
              min="10000"
              max="1000000"
              value={price}
              onChange={(e) => {
                P(+e.target.value);
                if (down > +e.target.value) D(+e.target.value);
              }}
            />
          </label>
          <label>
            Entrada (R$)
            <input
              type="number"
              min="0"
              max={price}
              value={down}
              onChange={(e) => D(Math.max(0, Math.min(price, +e.target.value)))}
            />
          </label>
          <label>
            Prazo
            <select value={months} onChange={(e) => M(+e.target.value)}>
              {[12, 24, 36, 48, 60, 72].map((n) => (
                <option key={n} value={n}>
                  {n} meses
                </option>
              ))}
            </select>
          </label>
          <div className="simulation">
            <span>{months} parcelas estimadas de</span>
            <strong>{money(installment(price, down, months))}</strong>
          </div>
          <p className="demo-note">
            Simulação Price a 1,79% ao mês. Não inclui IOF, tarifas, seguros ou
            CET. Não é oferta nem aprovação de crédito.
          </p>
        </div>
      </div>
    </Page>
  );
}
function DemoForm({ trade = false, initial = "" }) {
  const [sent, S] = useState(false);
  return (
    <form
      className="panel demo-form"
      onSubmit={(e) => {
        e.preventDefault();
        S(true);
      }}
    >
      <h2>{trade ? "Solicite uma avaliação" : "Fale com a Vértice"}</h2>
      <label>
        Nome completo
        <input
          required
          autoComplete="name"
          name="name"
          placeholder="Seu nome"
        />
      </label>
      <div className="form-row">
        <label>
          E-mail
          <input
            required
            type="email"
            autoComplete="email"
            placeholder="voce@exemplo.com"
          />
        </label>
        <label>
          Telefone
          <input
            required
            type="tel"
            autoComplete="tel"
            minLength="10"
            placeholder="(84) 99999-9999"
          />
        </label>
      </div>
      {trade && (
        <>
          <label>
            Marca e modelo
            <input required placeholder="Ex.: Volkswagen Polo" />
          </label>
          <div className="form-row">
            <label>
              Ano
              <input required type="number" min="1980" max="2027" />
            </label>
            <label>
              Quilometragem
              <input required type="number" min="0" />
            </label>
          </div>
        </>
      )}
      <label>
        Mensagem
        <textarea
          required
          rows="4"
          defaultValue={initial}
          placeholder="Como podemos ajudar?"
        />
      </label>
      <label className="check">
        <input type="checkbox" required /> Entendo que este formulário é
        demonstrativo e não envia dados.
      </label>
      <button className="btn">
        {trade ? "Testar solicitação de avaliação" : "Testar envio de mensagem"}
      </button>
      {sent && (
        <p role="status" className="success">
          Demonstração concluída. Nenhum dado foi enviado ou armazenado.
        </p>
      )}
    </form>
  );
}
function Trade() {
  return (
    <Page
      title="Seu carro na troca"
      subtitle="Sua próxima conquista pode começar com o carro que já é seu."
    >
      <div className="institution-grid">
        <div>
          <img
            className="feature-image"
            src={photo("photo-1492144534655-ae79c964c9d7")}
            alt="Automóvel ilustrativo"
          />
          <h2>Uma troca com transparência</h2>
          <p>
            Informe os dados do seu carro e prepare o histórico de manutenção.
            Em uma operação real, a avaliação considera conservação,
            documentação e condições de mercado.
          </p>
          <ul className="steps">
            <li>Conte sobre seu veículo</li>
            <li>Agende uma avaliação presencial</li>
            <li>Conheça as opções do estoque</li>
          </ul>
        </div>
        <DemoForm trade />
      </div>
    </Page>
  );
}
function About({ link }) {
  return (
    <Page
      title="Quem somos"
      subtitle="Vértice Motors. Uma nova direção para escolher seu carro."
    >
      <div className="about-banner">
        <img
          src={photo("photo-1449965408869-eaa3f722e40d", 1400)}
          alt="Experiência de dirigir"
        />
        <div>
          <h2>Mais confiança em cada escolha.</h2>
          <p>
            Uma concessionária pensada para conectar você ao próximo capítulo da
            sua história.
          </p>
        </div>
      </div>
      <div className="copy">
        <h2>Próximos de você, do começo ao próximo caminho.</h2>
        <p>
          A Vértice Motors é uma marca fictícia criada para demonstrar uma
          experiência completa de concessionária. Nossa proposta é reunir um
          estoque organizado, informações claras e atendimento próximo.
        </p>
        <div className="value-grid">
          {[
            ["Transparência", "Informações para comparar e decidir com calma."],
            ["Cuidado", "Atenção às necessidades de cada cliente."],
            ["Praticidade", "Da busca online à conversa com a equipe."],
          ].map(([t, p]) => (
            <article className="panel" key={t}>
              <h3>{t}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
        <a className="btn" href="/lojas" onClick={link("/lojas")}>
          Conheça nossa loja
        </a>
      </div>
    </Page>
  );
}
function Stores() {
  return (
    <Page
      title="Nossas lojas"
      subtitle="Encontre o atendimento Vértice mais perto de você."
    >
      <div className="institution-grid">
        <div className="store-illustration">
          <span>⌖</span>
          <h2>Natal / RN</h2>
          <p>Unidade demonstrativa</p>
        </div>
        <div className="panel">
          <h2>Vértice Motors Natal</h2>
          <p>
            Unidade de apresentação do projeto. Endereço e canais reais deverão
            ser cadastrados antes da publicação comercial.
          </p>
          <h3>Horários ilustrativos</h3>
          <p>
            Segunda a sexta: 8h às 18h
            <br />
            Sábado: 8h às 13h
          </p>
          <p className="demo-note">
            Não há loja física vinculada a esta demonstração.
          </p>
        </div>
      </div>
    </Page>
  );
}
function Help() {
  return (
    <Page
      title="Como podemos ajudar?"
      subtitle="Respostas para acompanhar sua escolha."
    >
      <div className="faq">
        {[
          [
            "Como encontro um carro?",
            "Use a busca no cabeçalho ou os filtros do estoque para selecionar marca, carroceria, ano, câmbio, preço e quilometragem.",
          ],
          [
            "Posso usar meu carro na troca?",
            "A página Carro na troca demonstra uma solicitação de avaliação. Uma operação real depende da análise presencial do veículo.",
          ],
          [
            "Como funciona o financiamento?",
            "O simulador permite comparar entrada e prazo. As condições são ilustrativas e uma contratação real depende da instituição financeira e da análise de crédito.",
          ],
          [
            "Como salvo meus favoritos?",
            "Clique no coração de um veículo. Os favoritos ficam salvos apenas neste navegador.",
          ],
          [
            "Os veículos estão disponíveis para compra?",
            "Não. Esta é uma demonstração de site. Todos os dados, preços e condições são fictícios.",
          ],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </Page>
  );
}
function Contact() {
  const id = new URLSearchParams(location.search).get("veiculo");
  const car = cars.find((c) => c.id === +id);
  return (
    <Page
      title="Contato"
      subtitle="Conte com a gente para encontrar sua próxima direção."
    >
      <div className="institution-grid">
        <div>
          <h2>Vamos conversar?</h2>
          <p>
            Conte o que você procura ou envie suas dúvidas usando nosso
            formulário de demonstração.
          </p>
          <div className="contact-box">
            <b>⌖ Natal, Rio Grande do Norte</b>
            <p>
              Atendimento e canais demonstrativos.
              <br />
              Nenhuma mensagem será transmitida.
            </p>
          </div>
        </div>
        <DemoForm
          initial={
            car
              ? `Tenho interesse no ${car.brand} ${car.name}, código ${car.id}.`
              : ""
          }
        />
      </div>
    </Page>
  );
}
function ContactBanner({ link }) {
  return (
    <div className="contact-banner">
      <span className="phone-art">☏</span>
      <div>
        <b>Não encontrou o que procurava?</b>
        <p>Conte qual é seu carro ideal. A gente ajuda na sua busca.</p>
      </div>
      <a href="/contato" onClick={link("/contato")} className="btn lime">
        Fale com a Vértice　↗
      </a>
    </div>
  );
}
function Footer({ link }) {
  const columns = [
    [
      ["Financiamento", "/financiamento"],
      ["Carro na troca", "/troca"],
      ["Estoque de seminovos", "/carros"],
      ["Favoritos", "/favoritos"],
    ],
    [
      ["Quem somos", "/quem-somos"],
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
            <a className="logo" href="/" onClick={link("/")}>
              <span className="brand-symbol">
                v<span>↗</span>
              </span>
              <span>
                vértice<b>motors</b>
              </span>
            </a>
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
                <a key={url} href={url} onClick={link(url)}>
                  ⊙　{t}
                </a>
              ))}
            </div>
          ))}
          <div>
            <h3>CENTRAL DE ATENDIMENTO</h3>
            <p>Segunda a sexta, 8h às 18h</p>
            <a
              className="footer-contact"
              href="/contato"
              onClick={link("/contato")}
            >
              Fale com nossa equipe →
            </a>
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
          <a href="/privacidade" onClick={link("/privacidade")}>
            Privacidade e dados
          </a>
          <span>Fotografias ilustrativas: Unsplash</span>
        </div>
      </div>
    </footer>
  );
}
createRoot(document.getElementById("root")).render(<App />);
