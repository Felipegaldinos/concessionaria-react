# Vértice Motors

Site institucional e catálogo de seminovos em React, com navegação pelo React Router. Mantém a identidade Vértice Motors, filtros, favoritos, simulação de financiamento e imagens ilustrativas da estrutura.

## Executar

Requisitos: Node.js 20.19+ ou 22.12+ e npm.

```sh
npm install
npm run dev
```

Abra o endereço exibido no terminal.

## Comandos

```sh
npm run build        # Compilar para produção
npm run preview      # Visualizar a compilação
npm test             # Validar rotas e renderização
npm run format       # Formatar os arquivos
npm run format:check # Conferir a formatação
```

## Organização

```text
src/
  main.jsx               # Inicialização: React e BrowserRouter
  App.jsx                # Composição dos providers e rotas
  routes/
    definitions.js       # Caminhos e títulos das páginas
    AppRoutes.jsx        # Routes, Route e layout compartilhado
  pages/                 # Uma página por arquivo
  components/
    layout/              # Cabeçalho, logo, rodapé, Outlet e efeitos de navegação
    common/              # Página base, breadcrumb e chamada de contato
    catalog/             # Filtros, cartão de veículo e promoções
    forms/               # Formulário demonstrativo reutilizável
    institutional/       # Fotos, introduções, CTAs e seções institucionais
  context/
    VehicleContext.jsx   # Busca e favoritos, com proteção do armazenamento local
  data/
    vehicles.js          # Estoque demonstrativo
    institutional.js     # Textos e referências de fotos institucionais
  data.js                # Modelos-base e utilitários de valores, fotos e parcelas
  styles.css             # Estilos gerais e do catálogo
  institutional.css      # Estilos institucionais e responsivos
public/images/estrutura/ # Imagens locais da concessionária
 tests/routes.test.mjs   # Testes de integração das rotas e conteúdo
```

O layout usa `Outlet`. Links internos usam `Link` e `NavLink`; redirecionamentos de interação usam `useNavigate`. Os detalhes do veículo leem `useParams`, e o contato usa `useSearchParams`. Busca e favoritos são compartilhados pelo contexto, sem repassar callbacks de navegação entre páginas.

## Rotas

| URL                  | Página                           |
| -------------------- | -------------------------------- |
| `/`                  | Início                           |
| `/carros`            | Estoque com filtros e paginação  |
| `/carros/:id`        | Detalhes do veículo              |
| `/favoritos`         | Favoritos salvos no navegador    |
| `/quem-somos`        | Apresentação, missão e valores   |
| `/equipe`            | Equipe e funções                 |
| `/estrutura`         | Ambientes da concessionária      |
| `/servicos`          | Serviços e suporte               |
| `/financiamento`     | Simulador                        |
| `/troca`             | Avaliação demonstrativa          |
| `/lojas`             | Unidade demonstrativa            |
| `/ajuda`             | Perguntas frequentes             |
| `/contato?veiculo=1` | Contato com interesse preenchido |
| `/privacidade`       | Informações sobre dados          |
| Outras URLs          | Página não encontrada            |

## Publicação

`npm run build` gera `dist/`. Como o projeto usa `BrowserRouter`, configure a hospedagem para servir `index.html` em URLs que não correspondem a arquivos. O arquivo `public/_redirects` já inclui a regra para Netlify e provedores compatíveis. Não redirecione arquivos de imagens ou assets existentes.

## Limites da demonstração

A marca, os veículos, os valores e os serviços são demonstrativos. O catálogo contém 36 registros derivados de seis modelos-base. Fotografias externas são ilustrativas e podem não corresponder aos modelos. As imagens locais da estrutura foram geradas por IA e não representam instalações reais.

Formulários validam os campos e exibem uma confirmação local, sem transmitir dados. Favoritos usam armazenamento local; caso o navegador bloqueie esse armazenamento, continuam funcionando em memória. O financiamento usa sistema Price a 1,79% ao mês, sem IOF, tarifas, seguros ou CET; não é oferta de crédito.

Antes de uma publicação comercial, substitua os dados por informações reais, integre o atendimento e atualize as condições e a política de privacidade.

## Testes

Os testes renderizam a aplicação com `MemoryRouter`, verificando páginas, veículo inexistente, URL desconhecida, menu ativo, parâmetros do contato e imagens da estrutura. São testes de integração de renderização; não substituem uma conferência visual no navegador.
