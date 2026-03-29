Atue como um Desenvolvedor Full-Stack Sênior especialista em Next.js, TypeScript, arquitetura escalável e boas práticas de desenvolvimento moderno.

Desenvolva um sistema web full stack chamado Mercado Fácil, com interface Single Page Application (SPA), para gerenciamento de listas de compras de supermercado. O objetivo é substituir o envio de listas pelo WhatsApp por uma plataforma centralizada, simples e eficiente, onde minha esposa possa cadastrar os produtos em casa (via desktop ou celular) e eu possa visualizar a lista e marcar os itens como comprados pelo celular enquanto estou no supermercado.

A aplicação deve ser moderna, responsiva, extremamente intuitiva, com foco total em experiência mobile, performance, simplicidade e manutenibilidade.

## Stack Tecnológico Obrigatório

- Framework: Next.js com App Router
- Linguagem: TypeScript com strict mode ativado
- Estilização: Tailwind CSS
- Componentes UI: shadcn/ui
- Formulários: React Hook Form
- Validação: Zod
- Banco de Dados: PostgreSQL
- ORM: Prisma

## Objetivo do Sistema

Criar uma lista de compras compartilhada entre duas pessoas:

- Minha esposa acessa a plataforma e cadastra os produtos que deseja que eu compre
- Eu acesso a mesma plataforma no supermercado pelo celular
- Conforme pego os produtos e coloco no carrinho, marco os itens como comprados
- O sistema deve evitar esquecimentos e tornar o processo rápido, visual e confiável

## Requisitos Funcionais

A aplicação deve possuir uma única página principal, mas com estrutura interna modular, organizada e profissional.

### Funcionalidades obrigatórias

1. Cadastro de produtos
- Um formulário simples no topo da página
- Campo obrigatório para nome do produto
- Campo opcional para quantidade
- Botão para adicionar item à lista
- Validação completa com Zod + React Hook Form

2. Listagem de produtos pendentes
- Exibir todos os produtos ainda não comprados
- Ordenar com foco em usabilidade, priorizando itens pendentes no topo
- Interface clara, de fácil leitura e interação no celular

3. Marcar item como comprado
- Cada item deve ter checkbox ou ação equivalente
- Ao marcar, o item deve mudar imediatamente de estado na interface
- O item deve ser movido para uma seção separada, como “Itens no Carrinho” ou “Comprados”, ou receber outro tratamento visual melhor para UX

4. Desmarcar item
- Permitir reverter o item para pendente caso necessário

5. Excluir item
- Permitir remoção de produtos da lista

## Requisitos de UX/UI

- Design minimalista, limpo, moderno e profissional
- Sem excesso de cores, elementos decorativos ou fundos poluídos
- Layout mobile-first
- Totalmente responsivo para celular, tablet e desktop
- A experiência principal deve ser pensada para uso com uma mão no celular dentro do supermercado
- Utilizar componentes do shadcn/ui para inputs, botões, checkboxes, cards e feedbacks
- Diferenciar visualmente itens pendentes e comprados
- Interface rápida, objetiva e com excelente legibilidade
- Crie uma logo para o projeto, com o nome Mercado Fácil

## Requisitos Técnicos

- Utilizar Next.js App Router
- Utilizar Server Actions para operações de criação, atualização e exclusão
- Aplicar Optimistic UI ao marcar itens como comprados, para garantir fluidez mesmo com internet instável
- Persistir os dados no PostgreSQL usando Prisma
- Garantir tipagem forte em toda a aplicação
- Organizar o código com separação clara entre:
  - página principal
  - componentes reutilizáveis
  - validações
  - actions
  - camada de acesso a dados
- Código limpo, modular, reutilizável e com padrão profissional de projeto pequeno, mas escalável

## Estrutura de Dados Sugerida

Crie um model `Product` no Prisma com os seguintes campos:

- id: UUID
- name: String
- quantity: String opcional
- isPurchased: Boolean com default false
- createdAt: DateTime
- updatedAt: DateTime

## Comportamentos Desejáveis

- Atualização otimista ao marcar e desmarcar itens
- Feedback visual ao adicionar, concluir ou excluir item
- Estado de loading nas ações assíncronas
- Empty state amigável quando não houver produtos cadastrados
- Contador de itens pendentes e comprados
- Ordenação inteligente, deixando pendentes primeiro
- Boa experiência de uso tanto para quem cadastra quanto para quem executa a compra

## Entregáveis Esperados

Quero que você gere:

- O schema completo do Prisma
- A estrutura de pastas do projeto
- O código da página principal
- Os componentes necessários da interface
- O formulário com React Hook Form + Zod
- As Server Actions para:
  - criar produto
  - marcar como comprado
  - desmarcar
  - excluir produto
- A integração com PostgreSQL via Prisma
- Um exemplo de configuração inicial do banco
- Código completo, funcional, modular e devidamente tipado

## Diretriz Final

Entregue um projeto com padrão de desenvolvimento sênior, focado em simplicidade, clareza, performance, responsividade, excelente experiência mobile e facilidade de manutenção.

Evite soluções improvisadas. Estruture a aplicação como um projeto profissional real, mesmo sendo simples. Use boas práticas de arquitetura, organização de código, tipagem e experiência do usuário.