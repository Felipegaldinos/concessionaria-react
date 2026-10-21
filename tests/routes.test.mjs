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
