# API de Pets (Fastify + TypeScript)

## Sobre o projeto

API para gerenciamento de pets (CRUD e filtros), construída com Fastify e TypeScript, persistindo dados via Prisma + SQLite, com validação de entrada usando Zod e documentação interativa via Swagger UI.

## Stack

- **Runtime**: Node.js (ESM)
- **Framework**: Fastify 5
- **Linguagem**: TypeScript
- **ORM**: Prisma + SQLite
- **Validação**: Zod
- **Docs**: Swagger + Swagger UI em `/docs`
- **Testes**: Vitest
- **Lint/Format**: ESLint + Prettier

## Requisitos

- Node.js 20+ recomendado
- npm 9+

## Instalação

```bash
git clone https://github.com/Guisandroni/desafioCadastro.git
cd desafioCadastro
npm install
```

## Banco de dados (Prisma + SQLite)

O projeto usa SQLite com arquivo em `prisma/dev.db` (já versionado). Se precisar recriar o banco do zero:

```bash
npx prisma migrate dev --name init
# ou simplesmente sincronizar o schema
npx prisma db push
npx prisma generate
```

## Executando

- **Desenvolvimento** (watch):

```bash
npm run dev
```

- **Produção**:

```bash
npm run start
# (equivale a: npm run build && node dist/src/server.js)
```

Servidor inicia em `http://localhost:3333`.

## Documentação (Swagger UI)

Com o servidor rodando, acesse:

- `http://localhost:3333/docs`

## Scripts úteis

- `npm run dev`: executa `tsx --watch src/server.ts`
- `npm run build`: compila TypeScript para `dist/`
- `npm run start`: build + inicia o servidor a partir de `dist/`
- `npm run lint`: checagem ESLint em `src` e `test`
- `npm run lint:fix`: corrige problemas auto-fixáveis
- `npm run test`: executa testes com Vitest
- `npm run test:watch`: modo watch
- `npm run test:coverage`: cobertura de testes

## Aliases de importação

Configurados em `tsconfig.json` e `vitest.config.ts`:

- `@src/*` → `./src/*`
- `@test/*` → `./test/*`

## Estrutura de pastas (resumo)

- `src/server.ts`: bootstrap do Fastify, Swagger e rotas
- `src/routes/appRoutes.ts`: declaração das rotas HTTP
- `src/routes/services/pet.ts`: handlers das rotas (CRUD e filtros)
- `src/lib/repository.ts`: instancia do `PrismaClient`
- `prisma/schema.prisma`: schema do banco (SQLite)
- `api.http`: exemplos de requisições (VS Code REST Client)
- `test/unit/example.test.ts`: teste de exemplo (Vitest)

## Rotas da API

- `GET /animals/pet`: lista todos os pets
- `POST /animals/pet/register`: cadastra um novo pet
- `PUT /animals/pet/:id`: atualiza um pet por `id`
- `POST /animals/pet/update/:id`: alias para atualizar (mesmo handler do PUT)
- `DELETE /animals/pet/:id`: remove um pet por `id`
- `GET /animals/pet/name/:nome`: filtra por nome exato
- `GET /animals/pet/idade/:idade`: filtra por idade (inteiro)
- `GET /animals/pet/raca/:raca`: filtra por raça

## Exemplo de cadastro (POST /animals/pet/register)

```json
{
  "nome": "Linguica",
  "sobrenome": "Vieira",
  "idade": 8,
  "raca": "Poodle",
  "sexo": "Macho",
  "endereco": "Rua Vista Linda, Esperança, 52",
  "peso": 16.1
}
```

Respostas comuns:

- `201 Created` em caso de sucesso
- `501` quando validações falham (peso fora do intervalo permitido ou endereço inválido)

## Validações (resumo implementado)

- `sexo`: `Macho` | `Femea`
- `peso`: esperado entre 0.5 e 60 (validação retorna erro ao sair do intervalo)
- `endereco`: tamanho mínimo de 10 caracteres

## Testes

```bash
npm run test
```

## Lint / Format

```bash
npm run lint
npm run lint:fix
```

## Exemplos rápidos (VS Code REST Client)

Arquivo `api.http` inclui exemplos de `GET`, `POST`, `PUT` e `DELETE`. Instale a extensão REST Client e execute as requisições diretamente do arquivo.


