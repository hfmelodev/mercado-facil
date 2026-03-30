# Mercado Facil

Aplicativo full stack em Next.js para gerenciar uma lista de compras compartilhada entre duas pessoas.

## Stack
- Next.js App Router
- TypeScript strict
- Tailwind CSS
- componentes no estilo shadcn/ui
- React Hook Form + Zod
- React Query para `useQuery` e `useMutation`
- Prisma + PostgreSQL
- Sonner para toasts
- Biome para lint e formatacao

## Comandos
- `pnpm install`
- `pnpm dev`
- `pnpm lint`
- `pnpm prisma:generate`
- `pnpm prisma:migrate:deploy`
- `pnpm prisma:push`
- `pnpm prisma:seed`

## Banco
1. Copie `.env.example` para `.env`
2. Ajuste `DATABASE_URL`
3. Rode `pnpm prisma:migrate:deploy`
4. Rode `pnpm prisma:seed`
5. Rode `pnpm dev`

## Funcionalidades
- cadastro de produtos com validacao
- marcar e desmarcar item comprado
- exclusao de item
- busca por nome ou quantidade
- toasts de feedback
- atualizacao otimista nas mutacoes principais
- manifesto PWA com icone instalavel na tela inicial
- service worker minimo para instalacao no celular

## Endpoints uteis
- `GET /api/products`
- `GET /api/health`

## Atalho no celular
- Android: abra no navegador, use o menu e toque em `Instalar app` ou `Adicionar a tela inicial`
- iPhone: abra no Safari, toque em `Compartilhar` e depois em `Adicionar a Tela de Inicio`
- Depois de instalado, o app abre em modo standalone, sem barra do navegador, como um aplicativo

## Deploy em producao
1. Configure `DATABASE_URL` no ambiente da Vercel apontando para o PostgreSQL de producao
2. Garanta que as migrations versionadas estejam em `prisma/migrations`
3. O `pnpm build` agora executa `prisma migrate deploy` antes do `next build`
4. Se o banco ja existe e a tabela `Product` ainda nao foi criada, rode manualmente `pnpm prisma:migrate:deploy`
5. Depois redeploye o projeto na Vercel

O projeto usa `output: "standalone"` no Next.js para facilitar a imagem de producao.
