
# Atlas – Desafio Técnico

Este repositório é parte do **desafio técnico da Atlas** e contém uma aplicação completa para **gestão de frotas**, composta por dois serviços principais:

- **Backend:** API RESTful para gerenciamento de **motoristas**, **veículos** e **viagens**
- **Frontend:** Interface web para interação com a API

A arquitetura do projeto utiliza **Docker**, **MongoDB**, **Redis** e **RabbitMQ**, simulando um cenário real de microsserviços com troca de mensagens assíncronas e armazenamento em banco NoSQL.

> 🔍 Este repositório é o ponto de entrada geral, mas **cada serviço possui seu próprio README detalhado**:
> - [/backend](./backend/README.md): instruções, scripts e endpoints da API
> - [/frontend](./frontend/README.md): detalhes da aplicação web em Next.js

---

## Funcionalidades

### Backend

- Cadastro, edição, listagem e exclusão de **motoristas** e **veículos**
- Criação e listagem de **viagens**
- Publicação de eventos em **RabbitMQ** ao criar viagens
- Uso de **Redis** para cache e dados temporários
- Armazenamento dos dados em **MongoDB**
- **Documentação da API** disponível via Postman (coleção incluída) e Swagger (em progresso)
- Implementação de **padrões de design** como separação por camadas (controllers, services, models) e uso de eventos
- **A autenticação JWT ainda não foi implementada**

### Frontend

- Interface amigável para o CRUD de motoristas e veículos
- Criação e visualização de viagens com filtros por motorista e placa
- Formulários com validação usando **Zod**
- Comunicação com o backend via **Axios**

---

## Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/Victorhtf/atlas-tech-challenge.git
cd atlas-tech-challenge
```

### 2. Crie os arquivos `.env`

```bash
cp .env.example .env                  
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local
```

### 3. Suba os containers

```bash
docker compose up -d
```

Esse comando sobe:

- MongoDB  
- Redis  
- RabbitMQ  
- Mongo Express (interface do Mongo em http://localhost:8081)

### 4. Instale as dependências

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd ../frontend
npm install --force
```

### 5. Popule o banco de dados

```bash
cd ../backend
npm run seed
```

### 6. Inicie os servidores

**Backend:**

```bash
npm run dev
```

**Frontend:**

```bash
cd ../frontend
npm run dev
```

A aplicação estará disponível em http://localhost:3000.

---

## Documentação da API

A documentação dos endpoints da API pode ser acessada de duas formas:

Coleção do Postman incluída no repositório (`postman_collection.json`)  
 Swagger em desenvolvimento (em breve disponível via rota `/api-docs`)

---

## Tecnologias

- Node.js, Express  
- MongoDB com Mongoose  
- Redis  
- RabbitMQ  
- React, Next.js, Tailwind CSS  
- Zod, Axios  
- Docker + Docker Compose

---

## Estrutura

```bash
atlas/
├── backend/          # API e lógica de negócio
├── frontend/         # Interface em React/Next.js
├── .env.example
├── docker-compose.yml
└── postman_collection.json
```
