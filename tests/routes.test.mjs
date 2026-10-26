import assert from "node:assert/strict";
import { before, after, test } from "node:test";
import { createServer } from "vite";
import React from "react";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
let server, App, MemoryRouter;
before(async () => {
  server = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    resolve: {
      alias: [
        {
          find: /^react-router-dom$/,
          replacement: fileURLToPath(
            new URL(
              "../node_modules/react-router-dom/dist/index.mjs",
              import.meta.url,
            ),
          ),
        },
        {
          find: /^react-router$/,
          replacement: fileURLToPath(
            new URL(
              "../node_modules/react-router/dist/development/index.mjs",
              import.meta.url,
            ),
          ),
        },
        {
          find: /^react-router\/dom$/,
          replacement: fileURLToPath(
            new URL(
              "../node_modules/react-router/dist/development/dom-export.mjs",
              import.meta.url,
            ),
          ),
        },
      ],
    },
    ssr: { noExternal: ["react-router", "react-router-dom"] },
    optimizeDeps: { noDiscovery: true, include: [] },
  });
  App = (await server.ssrLoadModule("/src/App.jsx")).default;
  ({ MemoryRouter } = await server.ssrLoadModule("react-router-dom"));
});
after(async () => {
  await server?.close();
});
function render(url) {
  return renderToStaticMarkup(
    React.createElement(
      MemoryRouter,
      { initialEntries: [url] },
      React.createElement(App),
    ),
  );
}
const scenarios = [
  ["/", "nova história"],
  ["/carros", "36</b> veículos"],
  ["/carros?tipo=SUV", "12</b> veículos"],
  ["/comparar", "Suas opções, lado a lado."],
  ["/encontre-meu-carro", "Quanto você pretende investir?"],
  ["/agendar", "Como podemos receber você?"],
  ["/favoritos", "Seus carros favoritos"],
  ["/carros/1", "Volkswagen T-Cross"],
  ["/carros/36", "Fiat Argo"],
  ["/carros/invalido", "Veículo não encontrado"],
  ["/carros/999", "Veículo não encontrado"],
  ["/equipe", "Nossa equipe"],
  ["/estrutura", "/images/estrutura/showroom.png"],
  ["/servicos", "Serviços e suporte"],
  ["/quem-somos", "Quem somos"],
  ["/financiamento", "Faça sua simulação"],
  ["/troca", "Solicite uma avaliação"],
  ["/lojas", "Nossas lojas"],
  ["/ajuda", "Como podemos ajudar?"],
  ["/contato", "Fale com a Vértice"],
  ["/privacidade", "Privacidade e dados"],
  ["/rota-inexistente", "Página não encontrada"],
];
for (const [url, expected] of scenarios) {
  test(`Rota ${url} apresenta o conteúdo correto e o layout compartilhado`, () => {
    const html = render(url);
    assert.ok(html.includes(expected), `Conteúdo ausente: ${expected}`);
    assert.equal((html.match(/<header\b/g) || []).length, 1);
    assert.equal((html.match(/<main\b/g) || []).length, 1);
    assert.ok(html.includes('class="site-footer"'));
  });
}
test("Parâmetro do veículo preenche o contato correspondente", () => {
  assert.match(
    render("/contato?veiculo=1"),
    /Tenho interesse no Volkswagen T-Cross, código 1/,
  );
  assert.match(
    render("/contato?veiculo=2"),
    /Tenho interesse no Honda Civic, código 2/,
  );
  assert.doesNotMatch(render("/contato?veiculo=999"), /Tenho interesse no/);
});
test("Navegação marca Comprar como ativo também no detalhe", () => {
  assert.match(render("/carros/1"), /aria-current="page"[^>]*href="\/carros"/);
  assert.match(render("/"), /aria-current="page"[^>]*href="\/"/);
});
test("Página de estrutura mantém as quatro imagens locais", () => {
  const html = render("/estrutura");
  for (const name of ["showroom", "recepcao", "avaliacao", "entrega"])
    assert.ok(html.includes(`/images/estrutura/${name}.png`));
});

test("Home apresenta veículo em destaque e cada carro tem uma imagem própria", async () => {
  const html = render("/");
  assert.ok(html.includes("Destaque da semana"));
  assert.ok(html.includes("Ver todos os veículos"));
  assert.ok(html.includes('href="/carros/1"'));
  const { cars } = await server.ssrLoadModule("/src/data/vehicles.js");
  assert.equal(new Set(cars.map((car) => car.image)).size, cars.length);
  assert.ok(cars.every((car) => car.image.startsWith("/images/estoque/")));
});
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";

test("Todas as novas imagens estão no projeto e o estoque não repete arquivos", async () => {
  const manifest = JSON.parse(
    readFileSync(
      new URL("../docs/image-manifest.json", import.meta.url),
      "utf8",
    ),
  );
  assert.equal(manifest.length, 50);
  const hashes = [];
  for (const asset of manifest) {
    const file = new URL("../public" + asset.url, import.meta.url);
    assert.ok(existsSync(file), "Imagem ausente: " + asset.url);
    const bytes = readFileSync(file);
    assert.ok(bytes.length > 10000, "Imagem vazia: " + asset.url);
    hashes.push(createHash("sha256").update(bytes).digest("hex"));
  }
  assert.equal(
    new Set(hashes).size,
    manifest.length,
    "Existem imagens duplicadas",
  );
});

test("As páginas usam apenas imagens locais da concessionária fictícia", () => {
  for (const url of [
    "/",
    "/carros",
    "/equipe",
    "/quem-somos",
    "/troca",
    "/lojas",
  ]) {
    const html = render(url);
    for (const [, src] of html.matchAll(/<img[^>]+src="([^"]+)"/g))
      assert.ok(src.startsWith("/images/"), "Imagem externa: " + src);
  }
});

test("Detalhes incluem as três imagens e o agendamento identifica o veículo", () => {
  const html = render("/carros/1");
  assert.ok(html.includes("/images/galeria/veiculo-01-rear.jpg"));
  assert.ok(html.includes("/images/galeria/veiculo-01-interior.jpg"));
  assert.ok(html.includes("/agendar?veiculo=1&amp;tipo=test-drive"));
  assert.ok(html.includes("Conservação e pontos de atenção"));
  const booking = render("/agendar?veiculo=1&amp;tipo=test-drive");
  assert.ok(booking.includes("Volkswagen T-Cross"));
  assert.ok(booking.includes("Nenhum horário é reservado automaticamente"));
});

test("Os 36 veículos têm galeria com três vistas e 72 imagens novas distintas", async () => {
  const manifest = JSON.parse(
    readFileSync(
      new URL("../docs/gallery-manifest.json", import.meta.url),
      "utf8",
    ),
  );
  assert.equal(manifest.length, 72);
  const hashes = [];
  for (const asset of manifest) {
    const path = new URL("../public" + asset.url, import.meta.url);
    assert.ok(existsSync(path), asset.url);
    hashes.push(createHash("sha256").update(readFileSync(path)).digest("hex"));
  }
  assert.equal(new Set(hashes).size, 72);
  const { cars } = await server.ssrLoadModule("/src/data/vehicles.js");
  for (const car of cars) {
    assert.equal(car.gallery.length, 3);
    assert.equal(new Set(car.gallery.map((p) => p.src)).size, 3);
    for (const p of car.gallery)
      assert.ok(existsSync(new URL("../public" + p.src, import.meta.url)));
  }
});
