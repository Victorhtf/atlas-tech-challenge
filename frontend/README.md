# Frota Atlas - Frontend

Este projeto é o frontend da aplicação **Frota Atlas**, desenvolvido em React/Next.js.

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo-frontend.git
cd seu-repo-frontend
```

### 2. Criar o arquivo `.env.local`

Crie um arquivo `.env.local` na raiz do projeto e copie o conteúdo do `.env.local.example`. Atualize as variáveis conforme o endereço e porta do seu backend.

```bash
cp .env.local.example .env.local
```

### 3. Instalar as dependências

Recomenda-se instalar as dependências com a flag `--force` ou `--legacy-peer-deps` para evitar problemas de compatibilidade:

```bash
npm install --force
# ou
npm install --legacy-peer-deps
```

### 4. Rodar a aplicação

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

---

## Tecnologias

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Zod](https://zod.dev/)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## Estrutura

- `pages/` - Rotas e páginas principais
- `components/` - Componentes reutilizáveis
- `services/` - Configurações de requisições
- `lib/` - Funções auxiliares

---

