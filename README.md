# Vértice Motors — React multipágina

Site de concessionária inspirado na composição do catálogo da referência Localiza Seminovos enviada pelo usuário. Cabeçalho compacto, busca e localização, filtros laterais, grade com três colunas no desktop, chamadas de serviços entre os veículos, paginação e rodapé institucional. Marca Vértice Motors.

## Executar

Requisitos: Node.js 20.19+ ou 22.12+ e npm.

```sh
npm install
npm run dev
```

## Produção

```sh
npm run build
npm run preview
```

O resultado fica em `dist/`. A hospedagem precisa redirecionar URLs que não são arquivos para `index.html` (fallback de SPA). Um arquivo `public/_redirects` já está incluído para provedores compatíveis com esse formato, como Netlify. Em outros servidores, configure a regra equivalente.

## Páginas

- `/` e `/carros`: catálogo principal com busca, filtros, ordenação e paginação.
- `/carros/1` até `/carros/36`: detalhes dos veículos.
- `/favoritos`: seleção persistida no navegador.
- `/financiamento`: simulador de parcelas.
- `/troca`: avaliação demonstrativa de usado.
- `/quem-somos`: apresentação institucional.
- `/lojas`: unidade demonstrativa.
- `/ajuda`: perguntas frequentes.
- `/contato`: formulário demonstrativo; aceita `?veiculo=1` para preencher o interesse.
- `/privacidade`: informações sobre dados da demonstração.

As páginas têm URLs próprias, navegação interna, suporte aos botões voltar/avançar e layout responsivo. A navegação é feita no cliente com History API, sem dependência adicional de roteamento.

## Arquivos

- `src/main.jsx`: páginas e componentes compartilhados.
- `src/data.js`: seis modelos-base, fotos, valores e cálculo de parcelas. O catálogo gera 36 registros ilustrativos a partir deles.
- `src/styles.css`: estilos, dimensões e responsividade.
- `index.html`: idioma, título e metadados.

## Demonstração

Não há estoque real, envio de contatos, análise de crédito ou loja física vinculada. Os dados são fictícios, as imagens do Unsplash são ilustrativas e podem não corresponder ao modelo. Fotos externas requerem internet. Substitua-as por fotos reais licenciadas antes do uso comercial.

Favoritos ficam no armazenamento local do navegador. Os formulários apenas validam e exibem uma confirmação local. O financiamento usa sistema Price a 1,79% ao mês, sem impostos, tarifas, seguros ou CET; não constitui oferta de crédito.

Antes de publicar comercialmente, conecte estoque e atendimento reais e atualize informações da empresa, condições e política de privacidade.

## Validação

Compilação de produção validada com `npm run build`.
